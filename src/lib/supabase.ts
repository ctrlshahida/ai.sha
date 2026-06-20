import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export async function saveFactCheck(data: {
  claim: string;
  video_url?: string;
  verdict: string;
  result: object;
}): Promise<void> {
  if (!supabase) return;
  try {
    await supabase.from('fact_checks').insert(data);
  } catch {
    // Non-critical - don't fail the request if Supabase is unavailable
  }
}

export async function getTrending(): Promise<
  { claim: string; verdict: string; count: number }[]
> {
  if (!supabase) return [];
  try {
    const { data } = await supabase.rpc('get_trending_claims');
    return data ?? [];
  } catch {
    return [];
  }
}
