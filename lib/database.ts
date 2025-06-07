import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface User {
  id: string
  email: string
  name: string
  subscription_tier: string
  subscription_status: string
  stripe_customer_id?: string
  created_at: string
  updated_at: string
}

export interface Campaign {
  id: string
  user_id: string
  campaign_id: string
  name: string
  target_platforms: string[]
  start_date: string
  end_date: string
  budget: number
  target_audience: any
  objectives: string[]
  status: string
  created_at: string
  updated_at: string
}

export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  billing_period: string
  features: string[]
  max_campaigns: number
  max_platforms: number
}

export class Database {
  static async createUser(userData: Partial<User>): Promise<User> {
    const [user] = await sql`
      INSERT INTO users (id, email, name, subscription_tier, subscription_status)
      VALUES (${userData.id}, ${userData.email}, ${userData.name}, ${userData.subscription_tier || "free"}, ${userData.subscription_status || "inactive"})
      ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        name = EXCLUDED.name,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *
    `
    return user as User
  }

  static async getUserById(id: string): Promise<User | null> {
    const [user] = await sql`
      SELECT * FROM users WHERE id = ${id}
    `
    return (user as User) || null
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const [user] = await sql`
      SELECT * FROM users WHERE email = ${email}
    `
    return (user as User) || null
  }

  static async createCampaign(campaignData: Partial<Campaign>): Promise<Campaign> {
    const [campaign] = await sql`
      INSERT INTO campaigns (
        user_id, campaign_id, name, target_platforms, start_date, end_date, 
        budget, target_audience, objectives, status
      )
      VALUES (
        ${campaignData.user_id}, ${campaignData.campaign_id}, ${campaignData.name},
        ${campaignData.target_platforms}, ${campaignData.start_date}, ${campaignData.end_date},
        ${campaignData.budget}, ${JSON.stringify(campaignData.target_audience)}, 
        ${campaignData.objectives}, ${campaignData.status || "draft"}
      )
      RETURNING *
    `
    return campaign as Campaign
  }

  static async getCampaignsByUserId(userId: string): Promise<Campaign[]> {
    const campaigns = await sql`
      SELECT * FROM campaigns WHERE user_id = ${userId} ORDER BY created_at DESC
    `
    return campaigns as Campaign[]
  }

  static async getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    const plans = await sql`
      SELECT * FROM subscription_plans ORDER BY price ASC
    `
    return plans as SubscriptionPlan[]
  }

  static async updateUserSubscription(
    userId: string,
    tier: string,
    status: string,
    stripeCustomerId?: string,
  ): Promise<void> {
    await sql`
      UPDATE users 
      SET subscription_tier = ${tier}, subscription_status = ${status}, stripe_customer_id = ${stripeCustomerId}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${userId}
    `
  }
}
