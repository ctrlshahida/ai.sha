'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Users } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-teal-dark/40 bg-teal sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-teal-dark flex items-center justify-center text-cream font-bold text-lg">
            ع
          </div>
          <div className="leading-tight">
            <span className="text-lg font-bold tracking-tight">
              <span className="text-amber">ai.</span><span className="text-cream">sha</span>
            </span>
            <span className="hidden sm:block text-[11px] text-cream/70 -mt-0.5">
              Islamic social media fact-checker
            </span>
          </div>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          <Link
            href="/"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              pathname === '/'
                ? 'bg-teal-dark/60 text-cream border border-cream/20'
                : 'text-cream/70 hover:text-cream hover:bg-teal-dark/40'
            }`}
          >
            <Search size={14} />
            Fact Check
          </Link>
          <Link
            href="/scholars"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              pathname === '/scholars'
                ? 'bg-teal-dark/60 text-cream border border-cream/20'
                : 'text-cream/70 hover:text-cream hover:bg-teal-dark/40'
            }`}
          >
            <Users size={14} />
            Scholars
          </Link>
        </div>
      </div>
    </nav>
  );
}
