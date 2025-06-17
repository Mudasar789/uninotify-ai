-- Insert sample users
INSERT INTO users (email, first_name, last_name, preferences) VALUES
('john.doe@example.com', 'John', 'Doe', '{"countries": ["United States", "Canada"], "programs": ["Computer Science", "Engineering"], "maxTuition": 60000, "currency": "USD", "notificationSettings": {"deadlineReminders": true, "newAdmissions": true, "scholarships": true, "emailFrequency": "immediate"}}'),
('jane.smith@example.com', 'Jane', 'Smith', '{"countries": ["United Kingdom", "Australia"], "programs": ["Medicine", "Biology"], "maxTuition": 50000, "currency": "USD", "notificationSettings": {"deadlineReminders": true, "newAdmissions": true, "scholarships": true, "emailFrequency": "daily"}}'),
('alex.chen@example.com', 'Alex', 'Chen', '{"countries": ["Singapore", "Japan"], "programs": ["Business", "Economics"], "maxTuition": 40000, "currency": "USD", "notificationSettings": {"deadlineReminders": true, "newAdmissions": false, "scholarships": true, "emailFrequency": "weekly"}}')
ON CONFLICT (email) DO NOTHING;

-- Insert sample universities
INSERT INTO universities (name, country, ranking, tuition_usd, tuition_local, currency, programs, deadline, scholarships, quality_score, acceptance_rate, admission_status) VALUES
('Stanford University', 'United States', 3, 56169, 56169, 'USD', ARRAY['Computer Science', 'Engineering', 'Business', 'Medicine'], '2025-01-01', true, 9.8, 4.3, 'open'),
('University of Oxford', 'United Kingdom', 1, 45000, 35000, 'GBP', ARRAY['Philosophy', 'Medicine', 'Law', 'Engineering'], '2025-01-15', true, 9.9, 17.5, 'open'),
('MIT', 'United States', 2, 57986, 57986, 'USD', ARRAY['Computer Science', 'Engineering', 'Physics', 'Mathematics'], '2025-01-01', true, 9.9, 6.7, 'open'),
('University of Toronto', 'Canada', 25, 35000, 45000, 'CAD', ARRAY['Computer Science', 'Medicine', 'Business', 'Engineering'], '2025-02-01', true, 8.9, 43.0, 'open'),
('ETH Zurich', 'Switzerland', 8, 1500, 1400, 'CHF', ARRAY['Engineering', 'Computer Science', 'Physics', 'Mathematics'], '2025-03-31', false, 9.5, 27.0, 'open'),
('National University of Singapore', 'Singapore', 11, 25000, 35000, 'SGD', ARRAY['Computer Science', 'Engineering', 'Business', 'Medicine'], '2025-02-15', true, 9.2, 22.0, 'open'),
('University of Melbourne', 'Australia', 33, 30000, 45000, 'AUD', ARRAY['Medicine', 'Engineering', 'Business', 'Arts'], '2025-03-01', true, 8.7, 35.0, 'open'),
('University of Tokyo', 'Japan', 23, 15000, 1800000, 'JPY', ARRAY['Engineering', 'Medicine', 'Science', 'Liberal Arts'], '2025-02-28', false, 9.0, 30.0, 'closed'),
('Harvard University', 'United States', 5, 54002, 54002, 'USD', ARRAY['Medicine', 'Law', 'Business', 'Liberal Arts'], '2025-01-01', true, 9.8, 3.4, 'open'),
('University of Cambridge', 'United Kingdom', 2, 42000, 32000, 'GBP', ARRAY['Mathematics', 'Physics', 'Engineering', 'Medicine'], '2024-12-31', true, 9.9, 21.0, 'closed')
ON CONFLICT (name) DO NOTHING;

-- Insert sample saved universities
INSERT INTO saved_universities (user_id, university_name, notes)
SELECT u.id, 'Stanford University', 'Interested in Computer Science program'
FROM users u WHERE u.email = 'john.doe@example.com'
ON CONFLICT DO NOTHING;

INSERT INTO saved_universities (user_id, university_name, notes)
SELECT u.id, 'MIT', 'Top choice for Engineering'
FROM users u WHERE u.email = 'john.doe@example.com'
ON CONFLICT DO NOTHING;

INSERT INTO saved_universities (user_id, university_name, notes)
SELECT u.id, 'University of Oxford', 'Excellent Medicine program'
FROM users u WHERE u.email = 'jane.smith@example.com'
ON CONFLICT DO NOTHING;

-- Insert sample notifications
INSERT INTO notifications (user_id, type, title, message, university_name, read, priority)
SELECT u.id, 'deadline', 'Application Deadline Approaching', 'Stanford University application deadline is in 2 days', 'Stanford University', false, 'high'
FROM users u WHERE u.email = 'john.doe@example.com';

INSERT INTO notifications (user_id, type, title, message, university_name, read, priority)
SELECT u.id, 'new_admission', 'New Admission Opening', 'Harvard University has opened applications for Fall 2025', 'Harvard University', false, 'medium'
FROM users u WHERE u.email = 'john.doe@example.com';

INSERT INTO notifications (user_id, type, title, message, university_name, read, priority)
SELECT u.id, 'scholarship', 'Scholarship Opportunity', 'University of Oxford is offering new merit-based scholarships', 'University of Oxford', true, 'medium'
FROM users u WHERE u.email = 'jane.smith@example.com';
