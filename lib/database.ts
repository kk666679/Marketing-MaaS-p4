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

// Mock data
const mockUsers: User[] = [
  {
    id: "1",
    email: "john.doe@example.com",
    name: "John Doe",
    subscription_tier: "pro",
    subscription_status: "active",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z"
  }
]

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    user_id: "1",
    campaign_id: "camp_1",
    name: "Summer Sale Campaign",
    target_platforms: ["facebook", "google"],
    start_date: "2024-06-01",
    end_date: "2024-08-31",
    budget: 5000,
    target_audience: { age: "25-45", interests: ["shopping"] },
    objectives: ["brand_awareness", "conversions"],
    status: "active",
    created_at: "2024-05-15T10:00:00Z",
    updated_at: "2024-05-15T10:00:00Z"
  }
]

const mockPlans: SubscriptionPlan[] = [
  {
    id: "1",
    name: "Free",
    price: 0,
    billing_period: "monthly",
    features: ["Basic campaigns", "1 platform"],
    max_campaigns: 1,
    max_platforms: 1
  },
  {
    id: "2",
    name: "Pro",
    price: 29,
    billing_period: "monthly",
    features: ["Advanced campaigns", "5 platforms", "Analytics"],
    max_campaigns: 10,
    max_platforms: 5
  }
]

export class Database {
  static async createUser(userData: Partial<User>): Promise<User> {
    const newUser: User = {
      id: userData.id || String(mockUsers.length + 1),
      email: userData.email || "",
      name: userData.name || "",
      subscription_tier: userData.subscription_tier || "free",
      subscription_status: userData.subscription_status || "inactive",
      stripe_customer_id: userData.stripe_customer_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    mockUsers.push(newUser)
    return newUser
  }

  static async getUserById(id: string): Promise<User | null> {
    return mockUsers.find(user => user.id === id) || null
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    return mockUsers.find(user => user.email === email) || null
  }

  static async createCampaign(campaignData: Partial<Campaign>): Promise<Campaign> {
    const newCampaign: Campaign = {
      id: String(mockCampaigns.length + 1),
      user_id: campaignData.user_id || "",
      campaign_id: campaignData.campaign_id || "",
      name: campaignData.name || "",
      target_platforms: campaignData.target_platforms || [],
      start_date: campaignData.start_date || "",
      end_date: campaignData.end_date || "",
      budget: campaignData.budget || 0,
      target_audience: campaignData.target_audience || {},
      objectives: campaignData.objectives || [],
      status: campaignData.status || "draft",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    mockCampaigns.push(newCampaign)
    return newCampaign
  }

  static async getCampaignsByUserId(userId: string): Promise<Campaign[]> {
    return mockCampaigns.filter(campaign => campaign.user_id === userId)
  }

  static async getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    return mockPlans
  }

  static async updateUserSubscription(
    userId: string,
    tier: string,
    status: string,
    stripeCustomerId?: string,
  ): Promise<void> {
    const user = mockUsers.find(u => u.id === userId)
    if (user) {
      user.subscription_tier = tier
      user.subscription_status = status
      user.stripe_customer_id = stripeCustomerId
      user.updated_at = new Date().toISOString()
    }
  }
}
