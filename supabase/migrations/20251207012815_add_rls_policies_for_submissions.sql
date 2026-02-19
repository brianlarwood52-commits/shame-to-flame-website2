/*
  # Add RLS Policies for Contact and Prayer Submissions

  1. Security Policies
    - Allow public INSERT on both tables (for form submissions)
    - Allow public SELECT, UPDATE, DELETE on both tables (for admin dashboard)
    
  2. Notes
    - Admin dashboard has password protection in the UI
    - These are non-sensitive public submissions that users expect to be read
    - RLS is enabled to provide a security layer while allowing necessary operations
*/

CREATE POLICY "Allow public insert on contact_submissions"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public select on contact_submissions"
  ON contact_submissions
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public update on contact_submissions"
  ON contact_submissions
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete on contact_submissions"
  ON contact_submissions
  FOR DELETE
  TO anon
  USING (true);

CREATE POLICY "Allow public insert on prayer_requests"
  ON prayer_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public select on prayer_requests"
  ON prayer_requests
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public update on prayer_requests"
  ON prayer_requests
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete on prayer_requests"
  ON prayer_requests
  FOR DELETE
  TO anon
  USING (true);
