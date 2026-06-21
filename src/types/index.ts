export type Verdict = 'supported' | 'contradicted' | 'nuanced' | 'unverified';

export interface QuranReference {
  surah: string;
  ayah: string;
  arabic: string;
  translation: string;
  relevance: string;
}

export interface HadithReference {
  collection: string;
  book: string;
  number: string;
  text: string;
  grade: string;
  relevance: string;
  sunnahLink?: string;
  verified?: boolean;
}

export interface SchoolPosition {
  school: 'Hanafi' | 'Maliki' | "Shafi'i" | 'Hanbali';
  position: string;
  consensus: boolean;
  sources?: string[];
}

export interface SuggestedResource {
  title: string;
  type: 'book' | 'scholar' | 'website' | 'lecture';
  author?: string;
  url?: string;
  description: string;
}

export interface FactCheckResult {
  extractedClaim: string;
  verdict: Verdict;
  verdictExplanation: string;
  quranReferences: QuranReference[];
  hadithReferences: HadithReference[];
  schoolPositions: SchoolPosition[];
  importantCaveats: string[];
  suggestedResources: SuggestedResource[];
}

export interface TrendingItem {
  claim: string;
  verdict: Verdict;
  count: number;
}

export interface VideoMeta {
  title: string;
  description: string;
  channelTitle: string;
  platform: 'youtube' | 'instagram' | 'tiktok' | 'unknown';
}

export interface Scholar {
  name: string;
  tradition: string;
  specialty: string;
  photo?: string;
  website?: string;
  youtubeChannel?: string;
  notableWork?: string;
}

export type Platform = 'YouTube' | 'Instagram' | 'TikTok' | 'Podcast';

export interface ContentCreator {
  name: string;
  handle: string;
  platforms: Platform[];
  focus: string;
  photo?: string;
  youtubeChannel?: string;
  instagram?: string;
  tiktok?: string;
  website?: string;
  verifiedCount: number; // number of times flagged as reputable by the fact-checker
  description: string;
}
