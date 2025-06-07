import { neon } from "@neondatabase/serverless"
import { auth } from "@clerk/nextjs/server"

const sql = neon(process.env.DATABASE_URL!)

export interface Permission {
  id: string
  name: string
  description: string
  resource: string
  action: string
}

export interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  is_system_role: boolean
}

export interface Organization {
  id: string
  name: string
  slug: string
  description?: string
  logo_url?: string
  settings: any
  subscription_tier: string
  max_users: number
  created_at: string
  updated_at: string
}

export interface UserOrganization {
  id: string
  user_id: string
  organization_id: string
  role_id: string
  status: string
  invited_by?: string
  invited_at?: string
  joined_at: string
  role?: Role
  organization?: Organization
}

export interface AuditLog {
  id: string
  user_id: string
  organization_id: string
  action: string
  resource: string
  resource_id?: string
  details: any
  ip_address?: string
  user_agent?: string
  created_at: string
}

export class RBAC {
  // Check if user has specific permission in organization
  static async hasPermission(userId: string, organizationId: string, permission: string): Promise<boolean> {
    try {
      const [userOrg] = await sql`
        SELECT r.permissions
        FROM user_organizations uo
        JOIN roles r ON uo.role_id = r.id
        WHERE uo.user_id = ${userId} 
        AND uo.organization_id = ${organizationId}
        AND uo.status = 'active'
      `

      if (!userOrg) return false

      const permissions = userOrg.permissions as string[]
      return permissions.includes(permission) || permissions.includes("admin.full")
    } catch (error) {
      console.error("Error checking permission:", error)
      return false
    }
  }

  // Get user's role in organization
  static async getUserRole(userId: string, organizationId: string): Promise<Role | null> {
    try {
      const [result] = await sql`
        SELECT r.*
        FROM user_organizations uo
        JOIN roles r ON uo.role_id = r.id
        WHERE uo.user_id = ${userId} 
        AND uo.organization_id = ${organizationId}
        AND uo.status = 'active'
      `

      return (result as Role) || null
    } catch (error) {
      console.error("Error getting user role:", error)
      return null
    }
  }

  // Get user's organizations
  static async getUserOrganizations(userId: string): Promise<UserOrganization[]> {
    try {
      const results = await sql`
        SELECT 
          uo.*,
          r.name as role_name,
          r.description as role_description,
          r.permissions as role_permissions,
          o.name as org_name,
          o.slug as org_slug,
          o.logo_url as org_logo_url
        FROM user_organizations uo
        JOIN roles r ON uo.role_id = r.id
        JOIN organizations o ON uo.organization_id = o.id
        WHERE uo.user_id = ${userId}
        AND uo.status = 'active'
        ORDER BY uo.joined_at DESC
      `

      return results.map((row) => ({
        id: row.id,
        user_id: row.user_id,
        organization_id: row.organization_id,
        role_id: row.role_id,
        status: row.status,
        invited_by: row.invited_by,
        invited_at: row.invited_at,
        joined_at: row.joined_at,
        role: {
          id: row.role_id,
          name: row.role_name,
          description: row.role_description,
          permissions: row.role_permissions,
          is_system_role: true,
        },
        organization: {
          id: row.organization_id,
          name: row.org_name,
          slug: row.org_slug,
          logo_url: row.org_logo_url,
          description: "",
          settings: {},
          subscription_tier: "free",
          max_users: 5,
          created_at: "",
          updated_at: "",
        },
      })) as UserOrganization[]
    } catch (error) {
      console.error("Error getting user organizations:", error)
      return []
    }
  }

  // Create organization
  static async createOrganization(data: {
    name: string
    slug: string
    description?: string
    ownerId: string
  }): Promise<Organization> {
    try {
      const [org] = await sql`
        INSERT INTO organizations (name, slug, description)
        VALUES (${data.name}, ${data.slug}, ${data.description || ""})
        RETURNING *
      `

      // Get owner role
      const [ownerRole] = await sql`
        SELECT id FROM roles WHERE name = 'Owner'
      `

      // Add owner to organization
      await sql`
        INSERT INTO user_organizations (user_id, organization_id, role_id, status)
        VALUES (${data.ownerId}, ${org.id}, ${ownerRole.id}, 'active')
      `

      return org as Organization
    } catch (error) {
      console.error("Error creating organization:", error)
      throw error
    }
  }

  // Invite user to organization
  static async inviteUser(organizationId: string, email: string, roleId: string, invitedBy: string): Promise<void> {
    try {
      // Check if user exists
      const [user] = await sql`
        SELECT id FROM users WHERE email = ${email}
      `

      if (user) {
        // Add existing user to organization
        await sql`
          INSERT INTO user_organizations (user_id, organization_id, role_id, status, invited_by, invited_at)
          VALUES (${user.id}, ${organizationId}, ${roleId}, 'pending', ${invitedBy}, CURRENT_TIMESTAMP)
          ON CONFLICT (user_id, organization_id) DO UPDATE SET
            role_id = EXCLUDED.role_id,
            status = 'pending',
            invited_by = EXCLUDED.invited_by,
            invited_at = CURRENT_TIMESTAMP
        `
      }

      // TODO: Send invitation email
    } catch (error) {
      console.error("Error inviting user:", error)
      throw error
    }
  }

  // Log audit event
  static async logAudit(data: {
    userId: string
    organizationId: string
    action: string
    resource: string
    resourceId?: string
    details?: any
    ipAddress?: string
    userAgent?: string
  }): Promise<void> {
    try {
      await sql`
        INSERT INTO audit_logs (
          user_id, organization_id, action, resource, resource_id, 
          details, ip_address, user_agent
        )
        VALUES (
          ${data.userId}, ${data.organizationId}, ${data.action}, 
          ${data.resource}, ${data.resourceId || null}, 
          ${JSON.stringify(data.details || {})}, 
          ${data.ipAddress || null}, ${data.userAgent || null}
        )
      `
    } catch (error) {
      console.error("Error logging audit event:", error)
    }
  }

  // Get all roles
  static async getRoles(): Promise<Role[]> {
    try {
      const results = await sql`
        SELECT * FROM roles ORDER BY name
      `
      return results as Role[]
    } catch (error) {
      console.error("Error getting roles:", error)
      return []
    }
  }

  // Get all permissions
  static async getPermissions(): Promise<Permission[]> {
    try {
      const results = await sql`
        SELECT * FROM permissions ORDER BY resource, action
      `
      return results as Permission[]
    } catch (error) {
      console.error("Error getting permissions:", error)
      return []
    }
  }

  // Get organization members
  static async getOrganizationMembers(organizationId: string): Promise<any[]> {
    try {
      const results = await sql`
        SELECT 
          uo.*,
          u.name as user_name,
          u.email as user_email,
          r.name as role_name,
          r.description as role_description
        FROM user_organizations uo
        JOIN users u ON uo.user_id = u.id
        JOIN roles r ON uo.role_id = r.id
        WHERE uo.organization_id = ${organizationId}
        ORDER BY uo.joined_at DESC
      `

      return results
    } catch (error) {
      console.error("Error getting organization members:", error)
      return []
    }
  }

  // Get audit logs
  static async getAuditLogs(organizationId: string, limit = 50, offset = 0): Promise<AuditLog[]> {
    try {
      const results = await sql`
        SELECT 
          al.*,
          u.name as user_name,
          u.email as user_email
        FROM audit_logs al
        LEFT JOIN users u ON al.user_id = u.id
        WHERE al.organization_id = ${organizationId}
        ORDER BY al.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `

      return results as AuditLog[]
    } catch (error) {
      console.error("Error getting audit logs:", error)
      return []
    }
  }
}

// Middleware helper for checking permissions
export async function requirePermission(permission: string, organizationId: string) {
  const { userId } = auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  const hasPermission = await RBAC.hasPermission(userId, organizationId, permission)

  if (!hasPermission) {
    throw new Error("Insufficient permissions")
  }

  return userId
}
