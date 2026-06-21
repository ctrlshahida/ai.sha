# ai.sha: Islamic Fact-Checker

> ٱلْحَقُّ - The Truth

## The Problem

Information systems were not built with everyone in mind. Muslim communities, like many communities outside the mainstream, are misrepresented on social media, algorithmically suppressed, and rarely involved in shaping the narratives that define them.

The problem runs deeper than representation. The same platforms that distort how we are seen also compete for our attention. The attention economy was built to extract, and those without the resources to step away from the feed pay the highest price. For younger and more vulnerable members of our communities, the stakes are even higher: harmful content, misinformation, and a near-total absence of safeguarding designed *with* us in mind.

Islamic content on social media is no exception. Claims about the Quran, the Sunnah, and religious practice spread rapidly, often without context, scholarship, or verification.

**ai.sha** is our response: a tool built for the community, that puts authentic Islamic knowledge back in the hands of the people who need it.

---

## What It Does

**ai.sha** lets you fact-check any Islamic claim - whether it's something you read online or a link to a video on YouTube, Instagram, or TikTok. It returns a clear verdict backed by evidence from the Quran and authentic Hadith, alongside the positions of all four major schools of thought.

---

## How It Works

### Simple Workflow

1. **Paste a link or type a claim** - share a YouTube, Instagram, or TikTok link, or just describe what you heard
2. **AI reads and extracts the claim** - the app pulls the title, creator, and description from the video to identify the Islamic claim being made
3. **Checked against Quran and Hadith** - the claim is evaluated against authentic Islamic sources e.g. Qur'an verses and Hadith
4. **Verdict and evidence returned** - you receive a clear verdict, supporting or contradicting evidence, school of thought positions, and suggested resources for deeper reading

### Technical Workflow

1. The user submits a social media URL or free-text claim via the Next.js frontend
2. The `/api/factcheck` route detects the platform (YouTube, Instagram, TikTok) and fetches video metadata (title, description, channel) via their respective APIs
3. The extracted claim and metadata are sent to **Claude Haiku** (`claude-haiku-4-5`) with a structured system prompt instructing it to act as a scholarly Islamic fact-checker
4. Claude returns a JSON response containing: verdict, Quran references, Hadith references, positions from all four Sunni schools of thought (Hanafi, Maliki, Shafi'i, Hanbali), caveats, and suggested resources
5. Quran references are enriched via a local Quran dataset; Hadith references are verified and linked via the **Hadith API** and **sunnah.com**
6. The result is saved to **Supabase** and rendered on the results page

**Stack:** Next.js 15, TypeScript, Tailwind CSS, Claude AI (Anthropic), Supabase, YouTube Data API

---

## Further Reading

The app includes a **Scholars** page — a curated directory of classical and contemporary Islamic scholars, organised by school of thought, with brief biographies and areas of specialisation. It is designed as a starting point for users who want to go beyond a single fact-check and engage more deeply with the tradition.

→ [ai-sha-ai.vercel.app/scholars](https://ai-sha-ai.vercel.app/scholars)

---

## Try It

[**ai-sha-ai.vercel.app**](https://ai-sha-ai.vercel.app)
