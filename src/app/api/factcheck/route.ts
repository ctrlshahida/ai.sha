import { NextRequest, NextResponse } from 'next/server';
import { callClaude } from '@/lib/claude';
import { enrichQuranReferences } from '@/lib/quran';
import { saveFactCheck } from '@/lib/supabase';
import { fetchYouTubeMeta, isYouTubeUrl } from '@/lib/youtube';
import { fetchInstagramMeta, fetchTikTokMeta, isInstagramUrl, isTikTokUrl } from '@/lib/social';
import { HadithReference } from '@/types';

const COLLECTION_SLUGS: Record<string, string> = {
  'sahih al-bukhari': 'sahih-bukhari',
  'sahih muslim': 'sahih-muslim',
  'sunan abu dawud': 'abu-dawood',
  'sunan ibn majah': 'ibn-e-majah',
  "jami' al-tirmidhi": 'al-tirmidhi',
  "sunan an-nasa'i": 'sunan-nasai',
  'riyad al-salihin': 'riyad-us-saliheen',
};

async function enrichHadith(hadith: HadithReference): Promise<HadithReference> {
  if (hadith.number === 'uncertain') return hadith;

  const slug = COLLECTION_SLUGS[hadith.collection.toLowerCase()];
  if (!slug) return hadith;

  const apiKey = process.env.HADITH_API_KEY;
  if (!apiKey) return hadith;

  try {
    const url = new URL('https://hadithapi.com/api/hadiths');
    url.searchParams.set('apikey', apiKey);
    url.searchParams.set('book', slug);
    url.searchParams.set('hadithNumber', hadith.number);

    const res = await fetch(url.toString());
    if (!res.ok) return hadith;

    const data = await res.json();
    const entry = data?.hadiths?.data?.[0];
    if (!entry) return hadith;

    return {
      ...hadith,
      text: entry.hadithEnglish ?? hadith.text,
      verified: true,
      sunnahLink: `https://sunnah.com/${slug.replace('sahih-bukhari', 'bukhari').replace('sahih-muslim', 'muslim')}:${hadith.number}`,
    };
  } catch {
    return hadith;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { input, isUrl } = await req.json();
    if (!input || typeof input !== 'string') {
      return NextResponse.json({ error: 'Input is required' }, { status: 400 });
    }

    let videoMeta = null;
    if (isUrl) {
      if (isYouTubeUrl(input)) videoMeta = await fetchYouTubeMeta(input);
      else if (isInstagramUrl(input)) videoMeta = await fetchInstagramMeta(input);
      else if (isTikTokUrl(input)) videoMeta = await fetchTikTokMeta(input);
    }

    const result = await callClaude(input, isUrl, videoMeta);

    const [enrichedQuran, enrichedHadiths] = await Promise.all([
      enrichQuranReferences(result.quranReferences),
      Promise.all(result.hadithReferences.map(enrichHadith)),
    ]);

    const finalResult = {
      ...result,
      quranReferences: enrichedQuran,
      hadithReferences: enrichedHadiths,
    };

    await saveFactCheck({
      claim: result.extractedClaim,
      video_url: isUrl ? input : undefined,
      verdict: result.verdict,
      result: finalResult,
    });

    return NextResponse.json(finalResult);
  } catch (err) {
    console.error('Fact-check error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Something went wrong' },
      { status: 500 }
    );
  }
}
