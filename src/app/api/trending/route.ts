import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  if (!supabase) {
    return NextResponse.json([]);
  }

  try {
    const { data, error } = await supabase
      .from('fact_checks')
      .select('claim, verdict')
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      .limit(100);

    if (error || !data) return NextResponse.json([]);

    const counts: Record<string, { claim: string; verdict: string; count: number }> = {};
    for (const row of data) {
      const key = row.claim;
      if (!counts[key]) counts[key] = { claim: row.claim, verdict: row.verdict, count: 0 };
      counts[key].count++;
    }

    const trending = Object.values(counts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    return NextResponse.json(trending);
  } catch {
    return NextResponse.json([]);
  }
}
