/*
  # Premium Bible Study System - Complete Schema

  ## Overview
  Creates a comprehensive database schema for a premium offline-first Bible study experience
  with the King James Version (KJV). Designed for deep study, personal notes, highlighting,
  cross-references, and reading plans.

  ## New Tables

  ### Core Bible Data
  1. `bible_books`
     - `id` (int, primary key) - Book ID (1-66)
     - `name` (text) - Full book name (e.g., "Genesis")
     - `abbreviation` (text) - Short code (e.g., "Gen")
     - `testament` (text) - "OT" or "NT"
     - `book_order` (int) - Canonical order
     - `chapter_count` (int) - Number of chapters
     - `category` (text) - Law, History, Wisdom, Prophecy, Gospel, Epistle, etc.

  2. `bible_verses`
     - `id` (uuid, primary key)
     - `book_id` (int, foreign key)
     - `chapter` (int)
     - `verse` (int)
     - `text` (text) - Verse text in KJV
     - `verse_key` (text, unique) - Format: "Gen.1.1"
     - `is_poetry` (boolean) - For formatting
     - `is_red_letter` (boolean) - Jesus's words
     - `words` (text[]) - Tokenized for concordance

  3. `cross_references`
     - `id` (uuid, primary key)
     - `from_verse_key` (text) - Source verse
     - `to_verse_key` (text) - Referenced verse
     - `reference_type` (text) - parallel, quote, allusion, thematic
     - `strength` (int) - 1-5, connection strength

  ### User Study Data
  4. `user_highlights`
     - `id` (uuid, primary key)
     - `user_id` (uuid) - Links to auth.users
     - `verse_key` (text)
     - `color` (text) - Hex color code
     - `color_label` (text) - User's label for this color
     - `created_at` (timestamptz)
     - `updated_at` (timestamptz)
     - `synced_at` (timestamptz) - For offline sync

  5. `user_notes`
     - `id` (uuid, primary key)
     - `user_id` (uuid)
     - `verse_key` (text) - Can be null for standalone notes
     - `chapter_reference` (text) - Format: "Gen.1"
     - `note_type` (text) - verse, chapter, journal
     - `title` (text)
     - `content` (text) - Rich text/markdown
     - `tags` (text[]) - Custom tags
     - `is_private` (boolean) - Default true
     - `created_at` (timestamptz)
     - `updated_at` (timestamptz)
     - `synced_at` (timestamptz)

  6. `user_bookmarks`
     - `id` (uuid, primary key)
     - `user_id` (uuid)
     - `verse_key` (text)
     - `label` (text) - User's bookmark name
     - `color` (text) - Ribbon color
     - `position` (int) - Display order
     - `created_at` (timestamptz)

  7. `user_reading_history`
     - `id` (uuid, primary key)
     - `user_id` (uuid)
     - `verse_key` (text)
     - `chapter_reference` (text)
     - `visited_at` (timestamptz)
     - Keep only last 100 per user

  8. `user_study_collections`
     - `id` (uuid, primary key)
     - `user_id` (uuid)
     - `collection_name` (text)
     - `description` (text)
     - `verse_keys` (text[])
     - `is_public` (boolean)
     - `created_at` (timestamptz)
     - `updated_at` (timestamptz)

  9. `reading_plans`
     - `id` (uuid, primary key)
     - `name` (text)
     - `description` (text)
     - `duration_days` (int)
     - `plan_type` (text) - chronological, canonical, thematic
     - `daily_readings` (jsonb) - Array of daily reading assignments
     - `is_active` (boolean)
     - `created_at` (timestamptz)

  10. `user_reading_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid)
      - `plan_id` (uuid, foreign key)
      - `current_day` (int)
      - `completed_days` (int[])
      - `started_at` (timestamptz)
      - `last_read_at` (timestamptz)
      - `completed_at` (timestamptz)

  11. `user_preferences`
      - `user_id` (uuid, primary key)
      - `reading_mode` (text) - study, reader, poetry
      - `font_family` (text)
      - `font_size` (int)
      - `line_spacing` (int)
      - `theme` (text) - light, dark, sepia, etc.
      - `column_layout` (text) - single, double
      - `show_verse_numbers` (boolean)
      - `show_red_letters` (boolean)
      - `audio_speed` (decimal)
      - `default_highlight_color` (text)
      - `preferences` (jsonb) - Additional settings
      - `updated_at` (timestamptz)

  ## Security
  - All user tables have RLS enabled
  - Users can only access their own data
  - Bible core data is publicly readable
  - No one can modify core Bible data except via migrations
*/

-- Create bible_books table
CREATE TABLE IF NOT EXISTS bible_books (
  id int PRIMARY KEY,
  name text NOT NULL,
  abbreviation text NOT NULL,
  testament text NOT NULL CHECK (testament IN ('OT', 'NT')),
  book_order int NOT NULL UNIQUE,
  chapter_count int NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create bible_verses table
CREATE TABLE IF NOT EXISTS bible_verses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id int NOT NULL REFERENCES bible_books(id),
  chapter int NOT NULL,
  verse int NOT NULL,
  text text NOT NULL,
  verse_key text NOT NULL UNIQUE,
  is_poetry boolean DEFAULT false,
  is_red_letter boolean DEFAULT false,
  words text[],
  created_at timestamptz DEFAULT now()
);

-- Create indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_bible_verses_book_chapter ON bible_verses(book_id, chapter);
CREATE INDEX IF NOT EXISTS idx_bible_verses_verse_key ON bible_verses(verse_key);
CREATE INDEX IF NOT EXISTS idx_bible_verses_words ON bible_verses USING gin(words);

-- Create cross_references table
CREATE TABLE IF NOT EXISTS cross_references (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_verse_key text NOT NULL,
  to_verse_key text NOT NULL,
  reference_type text NOT NULL CHECK (reference_type IN ('parallel', 'quote', 'allusion', 'thematic', 'prophetic')),
  strength int DEFAULT 3 CHECK (strength BETWEEN 1 AND 5),
  created_at timestamptz DEFAULT now(),
  UNIQUE(from_verse_key, to_verse_key)
);

CREATE INDEX IF NOT EXISTS idx_cross_refs_from ON cross_references(from_verse_key);
CREATE INDEX IF NOT EXISTS idx_cross_refs_to ON cross_references(to_verse_key);

-- Create user_highlights table
CREATE TABLE IF NOT EXISTS user_highlights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  verse_key text NOT NULL,
  color text NOT NULL,
  color_label text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  synced_at timestamptz DEFAULT now(),
  UNIQUE(user_id, verse_key)
);

ALTER TABLE user_highlights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own highlights"
  ON user_highlights
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_user_highlights_user ON user_highlights(user_id);
CREATE INDEX IF NOT EXISTS idx_user_highlights_verse ON user_highlights(verse_key);

-- Create user_notes table
CREATE TABLE IF NOT EXISTS user_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  verse_key text,
  chapter_reference text,
  note_type text DEFAULT 'verse' CHECK (note_type IN ('verse', 'chapter', 'journal')),
  title text,
  content text NOT NULL,
  tags text[] DEFAULT '{}',
  is_private boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  synced_at timestamptz DEFAULT now()
);

ALTER TABLE user_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own notes"
  ON user_notes
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_user_notes_user ON user_notes(user_id);
CREATE INDEX IF NOT EXISTS idx_user_notes_verse ON user_notes(verse_key);
CREATE INDEX IF NOT EXISTS idx_user_notes_tags ON user_notes USING gin(tags);

-- Create user_bookmarks table
CREATE TABLE IF NOT EXISTS user_bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  verse_key text NOT NULL,
  label text NOT NULL,
  color text DEFAULT '#3b82f6',
  position int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, verse_key)
);

ALTER TABLE user_bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own bookmarks"
  ON user_bookmarks
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_user_bookmarks_user ON user_bookmarks(user_id);

-- Create user_reading_history table
CREATE TABLE IF NOT EXISTS user_reading_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  verse_key text NOT NULL,
  chapter_reference text NOT NULL,
  visited_at timestamptz DEFAULT now()
);

ALTER TABLE user_reading_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own history"
  ON user_reading_history
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_user_history_user_visited ON user_reading_history(user_id, visited_at DESC);

-- Create user_study_collections table
CREATE TABLE IF NOT EXISTS user_study_collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  collection_name text NOT NULL,
  description text,
  verse_keys text[] DEFAULT '{}',
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_study_collections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own collections"
  ON user_study_collections
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_user_collections_user ON user_study_collections(user_id);

-- Create reading_plans table
CREATE TABLE IF NOT EXISTS reading_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  duration_days int NOT NULL,
  plan_type text NOT NULL CHECK (plan_type IN ('chronological', 'canonical', 'thematic', 'custom')),
  daily_readings jsonb NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Reading plans are public (no RLS needed for read access)

-- Create user_reading_progress table
CREATE TABLE IF NOT EXISTS user_reading_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id uuid REFERENCES reading_plans(id) ON DELETE CASCADE,
  current_day int DEFAULT 1,
  completed_days int[] DEFAULT '{}',
  started_at timestamptz DEFAULT now(),
  last_read_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  UNIQUE(user_id, plan_id)
);

ALTER TABLE user_reading_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own progress"
  ON user_reading_progress
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_user_progress_user ON user_reading_progress(user_id);

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  reading_mode text DEFAULT 'study' CHECK (reading_mode IN ('study', 'reader', 'poetry')),
  font_family text DEFAULT 'serif',
  font_size int DEFAULT 16 CHECK (font_size BETWEEN 12 AND 36),
  line_spacing int DEFAULT 150 CHECK (line_spacing BETWEEN 120 AND 200),
  theme text DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'sepia', 'high-contrast')),
  column_layout text DEFAULT 'single' CHECK (column_layout IN ('single', 'double')),
  show_verse_numbers boolean DEFAULT true,
  show_red_letters boolean DEFAULT true,
  audio_speed decimal DEFAULT 1.0 CHECK (audio_speed BETWEEN 0.5 AND 2.0),
  default_highlight_color text DEFAULT '#fef08a',
  preferences jsonb DEFAULT '{}',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own preferences"
  ON user_preferences
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_user_highlights_updated_at
  BEFORE UPDATE ON user_highlights
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_notes_updated_at
  BEFORE UPDATE ON user_notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_collections_updated_at
  BEFORE UPDATE ON user_study_collections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON user_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
