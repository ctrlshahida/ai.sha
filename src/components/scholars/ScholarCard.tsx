'use client';

import { useState } from 'react';
import { Scholar } from '@/types';
import { ExternalLink, PlayCircle } from 'lucide-react';

export default function ScholarCard({ scholar }: { scholar: Scholar }) {
  const [imgError, setImgError] = useState(false);
  const showPhoto = !!scholar.photo && !imgError;

  return (
    <div className="rounded-2xl p-5 card hover:border-white/15 hover:brightness-110 transition-all">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-16 h-16 rounded-full shrink-0 overflow-hidden border-2 border-gold/30">
          {showPhoto ? (
            <img
              src={scholar.photo}
              alt={scholar.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-teal/40 to-amber/30 flex items-center justify-center text-gold font-bold text-xl">
              {scholar.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-cream leading-tight">{scholar.name}</h3>
          <span className="inline-block text-xs text-gold bg-gold/10 border border-gold/20 px-2 py-0.5 rounded-full mt-0.5">
            {scholar.tradition}
          </span>
        </div>
      </div>
      <p className="text-sm text-cream/60 leading-relaxed mb-3">{scholar.specialty}</p>
      {scholar.notableWork && (
        <p className="text-xs text-cream/40 italic mb-4">"{scholar.notableWork}"</p>
      )}
      <div className="flex items-center gap-2 flex-wrap">
        {scholar.website && (
          <a
            href={scholar.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium bg-teal/80 hover:bg-teal text-cream px-3 py-1.5 rounded-full transition-colors"
          >
            <ExternalLink size={11} /> Website
          </a>
        )}
        {scholar.youtubeChannel && (
          <a
            href={scholar.youtubeChannel}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium bg-rose-600/80 hover:bg-rose-600 text-white px-3 py-1.5 rounded-full transition-colors"
          >
            <PlayCircle size={11} /> YouTube
          </a>
        )}
      </div>
    </div>
  );
}
