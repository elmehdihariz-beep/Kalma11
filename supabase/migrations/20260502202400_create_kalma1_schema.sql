/*
  # KALMA 1 - Moroccan News Platform Schema

  ## Tables
  - `posts`: News articles with title, body, image, category, vote counts
  - `votes`: Anonymous votes (agree/disagree) per post, tracked by session fingerprint

  ## Security
  - RLS enabled on all tables
  - Posts: public read, no public write (admin only via service role)
  - Votes: public read, public insert (one vote per fingerprint per post)
*/

CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  title_ar text NOT NULL DEFAULT '',
  body text NOT NULL DEFAULT '',
  body_ar text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'أسعار',
  tags text[] DEFAULT '{}',
  agree_count integer NOT NULL DEFAULT 0,
  disagree_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  is_featured boolean NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  fingerprint text NOT NULL DEFAULT '',
  vote_type text NOT NULL CHECK (vote_type IN ('agree', 'disagree')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(post_id, fingerprint)
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read posts"
  ON posts FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can read votes"
  ON votes FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert votes"
  ON votes FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS votes_post_id_idx ON votes(post_id);
CREATE INDEX IF NOT EXISTS votes_fingerprint_idx ON votes(fingerprint);
CREATE INDEX IF NOT EXISTS posts_created_at_idx ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS posts_category_idx ON posts(category);
