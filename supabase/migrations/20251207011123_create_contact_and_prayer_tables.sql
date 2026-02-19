/*
  # Create Contact and Prayer Request Tables

  ## Overview
  Creates tables to store contact form submissions and prayer requests from the website.
  All data is stored securely with proper RLS policies.

  ## New Tables
  
  ### `contact_submissions`
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Submitter's name
  - `email` (text) - Submitter's email address
  - `request_type` (text) - Type of request (general, prayer, healing, testimony, crisis, ministry)
  - `subject` (text) - Subject line
  - `message` (text) - Message content
  - `created_at` (timestamptz) - Submission timestamp
  - `status` (text) - Processing status (new, read, responded)
  
  ### `prayer_requests`
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text, nullable) - Submitter's name (null if anonymous)
  - `email` (text, nullable) - Submitter's email (null if anonymous)
  - `is_anonymous` (boolean) - Whether submission is anonymous
  - `prayer_request` (text) - The prayer request content
  - `allow_sharing` (boolean) - Permission to share testimony
  - `created_at` (timestamptz) - Submission timestamp
  - `status` (text) - Status (new, praying, answered)
  
  ## Security
  - Both tables have RLS enabled
  - Public can INSERT (submit forms)
  - Only authenticated users (ministry admins) can SELECT/UPDATE/DELETE
*/

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  request_type text NOT NULL DEFAULT 'general',
  subject text DEFAULT '',
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'new'
);

-- Create prayer_requests table
CREATE TABLE IF NOT EXISTS prayer_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  email text,
  is_anonymous boolean DEFAULT false,
  prayer_request text NOT NULL,
  allow_sharing boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'new'
);

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;

-- Contact Submissions Policies
CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact submissions"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contact submissions"
  ON contact_submissions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete contact submissions"
  ON contact_submissions FOR DELETE
  TO authenticated
  USING (true);

-- Prayer Requests Policies
CREATE POLICY "Anyone can submit prayer requests"
  ON prayer_requests FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view prayer requests"
  ON prayer_requests FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update prayer requests"
  ON prayer_requests FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete prayer requests"
  ON prayer_requests FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_created_at ON prayer_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_status ON prayer_requests(status);
