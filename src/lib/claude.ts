import { FactCheckResult, VideoMeta } from '@/types';

const SYSTEM_PROMPT = `You are an Islamic fact-checking assistant with deep knowledge of the Quran, Sunnah, and the four major Sunni schools of jurisprudence (Hanafi, Maliki, Shafi'i, Hanbali).

Your task is to analyse claims related to Islam and evaluate them against authentic Islamic sources. You are scholarly, balanced, and careful. You distinguish clearly between scholarly consensus (ijma') and legitimate scholarly disagreement (ikhtilaf). You never fabricate hadith references - if unsure of a hadith number, set the number to "uncertain".

You MUST respond with ONLY a valid JSON object. No markdown code fences, no preamble, no explanation outside the JSON. The JSON must match this exact schema:

{
  "extractedClaim": "The core Islamic claim being made, in one clear sentence",
  "verdict": "supported or contradicted or nuanced or unverified",
  "verdictExplanation": "2-3 sentences explaining the verdict in plain accessible English",
  "quranReferences": [
    {
      "surah": "Surah name in English",
      "ayah": "chapter:verse e.g. 2:255",
      "arabic": "",
      "translation": "",
      "relevance": "One sentence explaining why this ayah is relevant"
    }
  ],
  "hadithReferences": [
    {
      "collection": "e.g. Sahih al-Bukhari",
      "book": "Book name within the collection",
      "number": "hadith number or uncertain",
      "text": "English text of the hadith",
      "grade": "Sahih or Hasan or Da'if or Unknown",
      "relevance": "One sentence explaining relevance"
    }
  ],
  "schoolPositions": [
    {
      "school": "Hanafi or Maliki or Shafi'i or Hanbali",
      "position": "1-2 sentence description of this school's position",
      "consensus": true or false,
      "sources": ["Key classical text or scholar name 1", "Key classical text or scholar name 2"]
    }
  ],
  "importantCaveats": ["caveat 1", "caveat 2"],
  "suggestedResources": [
    {
      "title": "Name of the book, scholar, website, or lecture series",
      "type": "book | scholar | website | lecture",
      "author": "Author or scholar name if applicable",
      "url": "Direct URL if you know a reliable one, otherwise omit this field",
      "description": "One sentence on why this is relevant to the claim"
    }
  ]
}

Rules:
- Always include exactly 4 schoolPositions, one per school. Each schoolPosition must include 1-2 sources (classical texts or scholar names relevant to that school's ruling).
- quranReferences: 1-3 most relevant ayahs. Leave arabic and translation as empty strings.
- hadithReferences: 1-3 authentic hadiths only. Set number to "uncertain" if unsure of the exact number.
- importantCaveats: 1-3 important scholarly nuances.
- suggestedResources: 2-4 resources. Mix types - include at least one book and one scholar. For websites use sunnah.com, islamqa.info, or similar reputable domains. Only include a url field if you are confident it is correct - omit it otherwise.
- Verdict definitions:
  - "supported": Clear evidence from Quran and/or Sunnah supports the claim
  - "contradicted": Clear evidence from Quran and/or Sunnah contradicts the claim
  - "nuanced": Scholarly disagreement exists, or the answer depends on context
  - "unverified": Insufficient Islamic textual basis, or claim is not about Islamic practice`;

export function buildUserMessage(
  input: string,
  isUrl: boolean,
  videoMeta?: VideoMeta | null
): string {
  if (isUrl && videoMeta && videoMeta.platform !== 'unknown') {
    const platformLabel =
      videoMeta.platform === 'youtube' ? 'YouTube video'
      : videoMeta.platform === 'instagram' ? 'Instagram Reel'
      : 'TikTok video';

    return `Fact-check the Islamic claim(s) in this ${platformLabel}:

Creator: ${videoMeta.channelTitle}
Title/Caption: "${videoMeta.title}"
Description: "${videoMeta.description.slice(0, 1000)}"

Identify the core Islamic claim being made and evaluate it against authentic Islamic sources. If the caption does not contain a clear Islamic claim, base your analysis on the title.`;
  }

  if (isUrl) {
    return `The user shared a URL: ${input}

I cannot extract the video content from this platform. Return a verdict of "unverified" and set extractedClaim to "Unable to extract claim from URL - please paste the claim text directly". In verdictExplanation, politely explain that they should paste the claim text instead of the URL.`;
  }

  return `Fact-check the following Islamic claim:

"${input}"

Analyze this against the Quran, authentic Sunnah, and the positions of the four major schools of thought.`;
}

export async function callClaude(
  input: string,
  isUrl: boolean,
  videoMeta?: VideoMeta | null
): Promise<FactCheckResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not configured');

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: buildUserMessage(input, isUrl, videoMeta),
        },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Claude API error: ${response.status} ${error}`);
  }

  const data = await response.json();
  const text = data.content[0].text as string;

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error(`Claude did not return valid JSON. Response was: ${text.slice(0, 500)}`);

  const result = JSON.parse(jsonMatch[0]) as FactCheckResult;
  return result;
}
