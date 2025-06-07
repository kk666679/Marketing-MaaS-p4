-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    permissions JSONB NOT NULL DEFAULT '[]',
    is_system_role BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create organizations table
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    logo_url VARCHAR(500),
    settings JSONB DEFAULT '{}',
    subscription_tier VARCHAR(50) DEFAULT 'free',
    max_users INTEGER DEFAULT 5,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create user_organizations table (many-to-many)
CREATE TABLE IF NOT EXISTS user_organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'active',
    invited_by VARCHAR(255),
    invited_at TIMESTAMP,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, organization_id)
);

-- Create permissions table
CREATE TABLE IF NOT EXISTS permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    resource VARCHAR(100) NOT NULL,
    action VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create audit_logs table
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(255) REFERENCES users(id) ON DELETE SET NULL,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    action VARCHAR(100) NOT NULL,
    resource VARCHAR(100) NOT NULL,
    resource_id VARCHAR(255),
    details JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default permissions
INSERT INTO permissions (name, description, resource, action) VALUES
('campaigns.create', 'Create new campaigns', 'campaigns', 'create'),
('campaigns.read', 'View campaigns', 'campaigns', 'read'),
('campaigns.update', 'Edit campaigns', 'campaigns', 'update'),
('campaigns.delete', 'Delete campaigns', 'campaigns', 'delete'),
('analytics.read', 'View analytics', 'analytics', 'read'),
('analytics.export', 'Export analytics data', 'analytics', 'export'),
('users.invite', 'Invite new users', 'users', 'invite'),
('users.manage', 'Manage user roles and permissions', 'users', 'manage'),
('organization.settings', 'Manage organization settings', 'organization', 'settings'),
('billing.manage', 'Manage billing and subscriptions', 'billing', 'manage'),
('integrations.manage', 'Manage platform integrations', 'integrations', 'manage'),
('reports.create', 'Create custom reports', 'reports', 'create'),
('api.access', 'Access API endpoints', 'api', 'access'),
('admin.full', 'Full administrative access', 'admin', 'full')
ON CONFLICT (name) DO NOTHING;

-- Insert default roles
INSERT INTO roles (name, description, permissions, is_system_role) VALUES
('Owner', 'Organization owner with full access', 
 '["campaigns.create", "campaigns.read", "campaigns.update", "campaigns.delete", "analytics.read", "analytics.export", "users.invite", "users.manage", "organization.settings", "billing.manage", "integrations.manage", "reports.create", "api.access", "admin.full"]', 
 true),
('Admin', 'Administrator with most permissions', 
 '["campaigns.create", "campaigns.read", "campaigns.update", "campaigns.delete", "analytics.read", "analytics.export", "users.invite", "users.manage", "integrations.manage", "reports.create", "api.access"]', 
 true),
('Manager', 'Campaign manager with campaign and analytics access', 
 '["campaigns.create", "campaigns.read", "campaigns.update", "analytics.read", "analytics.export", "reports.create"]', 
 true),
('Editor', 'Content editor with limited campaign access', 
 '["campaigns.read", "campaigns.update", "analytics.read"]', 
 true),
('Viewer', 'Read-only access to campaigns and analytics', 
 '["campaigns.read", "analytics.read"]', 
 true)
ON CONFLICT (name) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_organizations_user_id ON user_organizations(user_id);
CREATE INDEX IF NOT EXISTS idx_user_organizations_org_id ON user_organizations(organization_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_org_id ON audit_logs(organization_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
