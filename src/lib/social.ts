import { VideoMeta } from '@/types';

export function isInstagramUrl(url: string): boolean {
  return /instagram\.com\/(reel|p|tv)\//.test(url);
}

export function isTikTokUrl(url: string): boolean {
  return /tiktok\.com\/@.+\/video\/|vm\.tiktok\.com\//.test(url);
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&#039;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

async function fetchInstagramMetaFromPage(url: string): Promise<VideoMeta | null> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
    });

    if (!res.ok) {
      console.error('[Instagram HTML] Status:', res.status);
      return null;
    }

    const html = await res.text();

    const ogDesc =
      html.match(/<meta\s+property="og:description"\s+content="([^"]*)"/)?.[1] ??
      html.match(/<meta\s+content="([^"]*)"\s+property="og:description"/)?.[1];

    const ogTitle =
      html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/)?.[1] ??
      html.match(/<meta\s+content="([^"]*)"\s+property="og:title"/)?.[1];

    if (!ogDesc && !ogTitle) {
      console.error('[Instagram HTML] No og: meta tags found — likely login wall');
      return null;
    }

    const description = ogDesc ? decodeHtmlEntities(ogDesc) : '';
    const title = ogTitle ? decodeHtmlEntities(ogTitle) : '';
    const authorMatch = title.match(/^(.+?)\s+on\s+Instagram/i);
    const author = authorMatch ? authorMatch[1] : '';

    console.log('[Instagram HTML] OK | author:', author, '| desc:', description.slice(0, 80));

    return {
      title: description.slice(0, 200) || title,
      description,
      channelTitle: author,
      platform: 'instagram',
    };
  } catch (err) {
    console.error('[Instagram HTML] Exception:', err);
    return null;
  }
}

async function fetchInstagramMetaFromRapidAPI(url: string): Promise<VideoMeta | null> {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(
      `https://instagram-looter2.p.rapidapi.com/post?url=${encodeURIComponent(url)}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-host': 'instagram-looter2.p.rapidapi.com',
          'x-rapidapi-key': apiKey,
        },
      }
    );

    const data = await res.json();
    console.log('[Instagram Looter2] Raw:', JSON.stringify(data).slice(0, 1000));

    if (!res.ok || data?.error || data?.detail) {
      console.error('[Instagram Looter2] Error:', JSON.stringify(data).slice(0, 200));
      return null;
    }

    // Handle multiple possible response shapes
    const media =
      data?.graphql?.shortcode_media ??
      data?.items?.[0] ??
      data?.data ??
      data?.result ??
      data;

    const caption =
      media?.edge_media_to_caption?.edges?.[0]?.node?.text ??
      media?.caption?.text ??
      media?.caption_text ??
      media?.caption ??
      '';

    const author =
      media?.owner?.username ??
      media?.owner?.full_name ??
      media?.user?.username ??
      media?.username ??
      '';

    console.log('[Instagram Looter2] Parsed | author:', author, '| caption:', caption.slice(0, 80));

    return {
      title: caption.slice(0, 200),
      description: caption,
      channelTitle: author,
      platform: 'instagram',
    };
  } catch (err) {
    console.error('[Instagram Looter2] Exception:', err);
    return null;
  }
}

export async function fetchInstagramMeta(url: string): Promise<VideoMeta | null> {
  // Try free HTML scraping first, fall back to RapidAPI
  const fromPage = await fetchInstagramMetaFromPage(url);
  if (fromPage && (fromPage.title || fromPage.description)) return fromPage;

  console.log('[Instagram] HTML scraping failed, trying RapidAPI...');
  return fetchInstagramMetaFromRapidAPI(url);
}

export async function fetchTikTokMeta(url: string): Promise<VideoMeta | null> {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) {
    console.error('[TikTok] RAPIDAPI_KEY is not set');
    return null;
  }

  try {
    const res = await fetch(
      `https://tiktok-scraper7.p.rapidapi.com/?url=${encodeURIComponent(url)}`,
      {
        headers: {
          'x-rapidapi-host': 'tiktok-scraper7.p.rapidapi.com',
          'x-rapidapi-key': apiKey,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error('[TikTok] API error', res.status, JSON.stringify(data));
      return null;
    }

    // tiktok-scraper7 uses a `code` field: 0 = success
    if (data?.code !== undefined && data.code !== 0) {
      console.error('[TikTok] API returned error code', data.code, data?.msg);
      return null;
    }

    const item = data?.data;
    if (!item) {
      console.error('[TikTok] No data in response', JSON.stringify(data));
      return null;
    }

    return {
      title: item.title ?? '',
      description: item.title ?? '',
      channelTitle: item.author?.nickname ?? item.author?.unique_id ?? '',
      platform: 'tiktok',
    };
  } catch (err) {
    console.error('[TikTok] Fetch exception', err);
    return null;
  }
}
