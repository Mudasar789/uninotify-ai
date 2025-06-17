-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    preferences JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create saved_universities table
CREATE TABLE IF NOT EXISTS saved_universities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    university_name VARCHAR(255) NOT NULL,
    notes TEXT,
    saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('deadline', 'new_admission', 'scholarship', 'update')),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    university_name VARCHAR(255) NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create universities table for caching scraped data
CREATE TABLE IF NOT EXISTS universities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) UNIQUE NOT NULL,
    country VARCHAR(100) NOT NULL,
    ranking INTEGER,
    tuition_usd INTEGER,
    tuition_local INTEGER,
    currency VARCHAR(10),
    programs TEXT[], -- Array of program names
    deadline DATE,
    scholarships BOOLEAN DEFAULT FALSE,
    quality_score DECIMAL(3,1),
    acceptance_rate DECIMAL(5,2),
    admission_status VARCHAR(20) DEFAULT 'closed',
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_saved_universities_user_id ON saved_universities(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_universities_country ON universities(country);
CREATE INDEX IF NOT EXISTS idx_universities_ranking ON universities(ranking);
CREATE INDEX IF NOT EXISTS idx_universities_admission_status ON universities(admission_status);
CREATE INDEX IF NOT EXISTS idx_universities_deadline ON universities(deadline);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_universities_updated_at BEFORE UPDATE ON universities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
