-- Update users table to use Clerk user IDs
ALTER TABLE users ALTER COLUMN id TYPE VARCHAR(255);
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE users ADD PRIMARY KEY (id);

-- Update campaigns table foreign key
ALTER TABLE campaigns DROP CONSTRAINT IF EXISTS campaigns_user_id_fkey;
ALTER TABLE campaigns ALTER COLUMN user_id TYPE VARCHAR(255);
ALTER TABLE campaigns ADD CONSTRAINT campaigns_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Update campaign_metrics table foreign key  
ALTER TABLE campaign_metrics ALTER COLUMN campaign_id TYPE VARCHAR(255);
