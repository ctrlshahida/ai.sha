'use client';

import { useState } from 'react';
import { ContentCreator, Platform } from '@/types';
import { ExternalLink, PlayCircle, Instagram, Mic, CheckCircle2 } from 'lucide-react';

const PLATFORM_COLORS: Record<Platform, string> = {
  YouTube: 'bg-rose-600/80 hover:bg-rose-600 text-white',
  Instagram: 'bg-purple-600/80 hover:bg-purple-600 text-white',
  TikTok: 'bg-neutral-700/80 hover:bg-neutral-700 text-white',
  Podcast: 'bg-amber-600/80 hover:bg-amber-600 text-white',
};

function PlatformBadge({ platform }: { platform: Platform }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full ${PLATFORM_COLORS[platform]}`}
    >
      {platform === 'YouTube' && <PlayCircle size={10} />}
      {platform === 'Instagram' && <Instagram size={10} />}
      {platform === 'Podcast' && <Mic size={10} />}
      {platform}
    </span>
  );
}

export default function CreatorCard({ creator }: { creator: ContentCreator }) {
  const [imgError, setImgError] = useState(false);
  const showPhoto = !!creator.photo && !imgError;

  return (
    <div className="border border-gold/20 rounded-2xl p-5 bg-forest-light hover:border-gold/50 hover:bg-forest-light/80 transition-all flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-14 h-14 rounded-full shrink-0 overflow-hidden border-2 border-gold/30">
          {showPhoto ? (
            <img
              src={creator.photo}
              alt={creator.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-teal/40 to-amber/30 flex items-center justify-center text-gold font-bold text-xl">
              {creator.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-cream leading-tight">{creator.name}</h3>
          <p className="text-xs text-cream/40 mt-0.5">{creator.handle}</p>
          <div className="flex flex-wrap gap-1 mt-1.5">
            {creator.platforms.map((p) => (
              <PlatformBadge key={p} platform={p} />
            ))}
          </div>
        </div>
      </div>

      {/* Focus */}
      <p className="text-xs text-gold/70 font-medium">{creator.focus}</p>

      {/* Description */}
      <p className="text-sm text-cream/60 leading-relaxed">{creator.description}</p>

      {/* Verified badge */}
      <div className="flex items-center gap-2 text-xs text-emerald-400/80 bg-emerald-900/20 border border-emerald-600/20 rounded-xl px-3 py-2">
        <CheckCircle2 size={13} className="shrink-0 text-emerald-400" />
        <span>
          <span className="font-bold text-emerald-400">{creator.verifiedCount}x</span> flagged as reputable by ai.sha
        </span>
      </div>

      {/* Links */}
      <div className="flex items-center gap-2 flex-wrap pt-1">
        {creator.youtubeChannel && (
          <a
            href={creator.youtubeChannel}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium bg-rose-600/80 hover:bg-rose-600 text-white px-3 py-1.5 rounded-full transition-colors"
          >
            <PlayCircle size={11} /> YouTube
          </a>
        )}
        {creator.instagram && (
          <a
            href={creator.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium bg-purple-600/80 hover:bg-purple-600 text-white px-3 py-1.5 rounded-full transition-colors"
          >
            <Instagram size={11} /> Instagram
          </a>
        )}
        {creator.website && (
          <a
            href={creator.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium bg-teal/80 hover:bg-teal text-cream px-3 py-1.5 rounded-full transition-colors"
          >
            <ExternalLink size={11} /> Website
          </a>
        )}
      </div>
    </div>
  );
}
