import { NextRequest, NextResponse } from 'next/server';
import { fetchYouTubeMeta, isYouTubeUrl } from '@/lib/youtube';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) return NextResponse.json({ error: 'url param required' }, { status: 400 });

  if (!isYouTubeUrl(url)) {
    return NextResponse.json({ error: 'not_youtube' }, { status: 422 });
  }

  const meta = await fetchYouTubeMeta(url);
  if (!meta) {
    return NextResponse.json({ error: 'Could not fetch video metadata' }, { status: 404 });
  }

  return NextResponse.json(meta);
}
