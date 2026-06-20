import { VideoMeta } from '@/types';

export function isInstagramUrl(url: string): boolean {
  return /instagram\.com\/(reel|p|tv)\//.test(url);
}

export function isTikTokUrl(url: string): boolean {
  return /tiktok\.com\/@.+\/video\/|vm\.tiktok\.com\//.test(url);
}

export async function fetchInstagramMeta(url: string): Promise<VideoMeta | null> {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) {
    console.error('[Instagram] RAPIDAPI_KEY is not set');
    return null;
  }

  const shortcodeMatch = url.match(/\/(?:reel|p|tv)\/([A-Za-z0-9_-]+)/);
  if (!shortcodeMatch) {
    console.error('[Instagram] Could not extract shortcode from URL', url);
    return null;
  }
  const mediaCode = shortcodeMatch[1];

  try {
    const res = await fetch(
      `https://instagram-scraper-stable-api.p.rapidapi.com/get_media_data_v2.php?media_code=${mediaCode}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-host': 'instagram-scraper-stable-api.p.rapidapi.com',
          'x-rapidapi-key': apiKey,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error('[Instagram] API error', res.status, JSON.stringify(data));
      return null;
    }

    console.log('[Instagram] Full raw response:', JSON.stringify(data).slice(0, 2000));

    const item = data?.data ?? data?.result ?? data?.media ?? data;
    if (!item) {
      console.error('[Instagram] No data in response', JSON.stringify(data));
      return null;
    }

    console.log('[Instagram] Item keys:', Object.keys(item));

    const caption =
      item.caption_text ??
      item.caption?.text ??
      item.caption ??
      item.edge_media_to_caption?.edges?.[0]?.node?.text ??
      item.desc ??
      item.description ??
      item.title ??
      '';

    const author =
      item.owner?.username ??
      item.owner?.full_name ??
      item.user?.username ??
      item.user?.full_name ??
      item.username ??
      item.author ??
      '';

    console.log('[Instagram] Parsed caption:', caption.slice(0, 100), '| author:', author);

    return {
      title: caption.slice(0, 200),
      description: caption,
      channelTitle: author,
      platform: 'instagram',
    };
  } catch (err) {
    console.error('[Instagram] Fetch exception', err);
    return null;
  }
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
