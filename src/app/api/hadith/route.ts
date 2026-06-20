import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const collection = req.nextUrl.searchParams.get('collection');
  const number = req.nextUrl.searchParams.get('number');

  if (!collection || !number) {
    return NextResponse.json({ error: 'collection and number required' }, { status: 400 });
  }

  const apiKey = process.env.HADITH_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'Hadith API not configured' }, { status: 503 });

  try {
    const url = new URL('https://hadithapi.com/api/hadiths');
    url.searchParams.set('apikey', apiKey);
    url.searchParams.set('book', collection);
    url.searchParams.set('hadithNumber', number);

    const res = await fetch(url.toString());
    if (!res.ok) return NextResponse.json({ error: 'Not found' }, { status: res.status });

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch hadith' }, { status: 500 });
  }
}
