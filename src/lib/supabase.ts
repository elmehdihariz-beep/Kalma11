import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Post = {
  id: string;
  title_ar: string;
  body_ar: string;
  image_url: string;
  category: string;
  tags: string[];
  agree_count: number;
  disagree_count: number;
  created_at: string;
  is_featured: boolean;
};

export type Vote = {
  id: string;
  post_id: string;
  fingerprint: string;
  vote_type: 'agree' | 'disagree';
  created_at: string;
};
