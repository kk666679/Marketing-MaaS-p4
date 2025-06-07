-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    subscription_tier VARCHAR(50) DEFAULT 'free',
    subscription_status VARCHAR(50) DEFAULT 'inactive',
    stripe_customer_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    campaign_id VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    target_platforms TEXT[] NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    budget DECIMAL(10,2) NOT NULL,
    target_audience JSONB NOT NULL,
    objectives TEXT[] NOT NULL,
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create campaign_metrics table
CREATE TABLE IF NOT EXISTS campaign_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
    platform VARCHAR(50) NOT NULL,
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    engagement_rate DECIMAL(5,2) DEFAULT 0,
    cost_per_click DECIMAL(10,2) DEFAULT 0,
    roi DECIMAL(10,2) DEFAULT 0,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create subscription_plans table
CREATE TABLE IF NOT EXISTS subscription_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    billing_period VARCHAR(20) NOT NULL,
    features JSONB NOT NULL,
    max_campaigns INTEGER,
    max_platforms INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default subscription plans
INSERT INTO subscription_plans (name, price, billing_period, features, max_campaigns, max_platforms) VALUES
('Starter', 29.00, 'monthly', '["Basic Analytics", "3 Platforms", "Email Support"]', 5, 3),
('Professional', 99.00, 'monthly', '["Advanced Analytics", "All Platforms", "Priority Support", "Custom Branding"]', 25, 8),
('Enterprise', 299.00, 'monthly', '["Enterprise Analytics", "All Platforms", "24/7 Support", "Custom Integrations", "Dedicated Manager"]', 100, 8);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_campaigns_user_id ON campaigns(user_id);
CREATE INDEX IF NOT EXISTS idx_campaign_metrics_campaign_id ON campaign_metrics(campaign_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
