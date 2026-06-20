import { QuranReference } from '@/types';

const BASE = 'https://api.alquran.cloud/v1';

export async function fetchAyah(
  ref: string
): Promise<{ arabic: string; translation: string } | null> {
  try {
    const res = await fetch(
      `${BASE}/ayah/${ref}/editions/quran-uthmani-quran-academy,en.sahih`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.data || data.data.length < 2) return null;
    return {
      arabic: data.data[0].text as string,
      translation: data.data[1].text as string,
    };
  } catch {
    return null;
  }
}

export async function enrichQuranReferences(
  refs: QuranReference[]
): Promise<QuranReference[]> {
  const enriched = await Promise.all(
    refs.map(async (ref) => {
      const ayah = await fetchAyah(ref.ayah);
      if (!ayah) return ref;
      return { ...ref, arabic: ayah.arabic, translation: ayah.translation };
    })
  );
  return enriched;
}
