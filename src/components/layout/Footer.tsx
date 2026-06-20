import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-teal-dark/50 bg-teal-dark mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <h3 className="font-bold mb-2 text-sm tracking-tight">
              <span className="text-amber">ai.</span><span className="text-cream">sha</span>
            </h3>
            <p className="text-xs text-cream/50 leading-relaxed">
              Fact-checking Islamic content against the Quran, Sunnah, and scholarly consensus.
            </p>
          </div>
          <div>
            <h3 className="text-cream/70 font-semibold mb-2 text-xs uppercase tracking-wider">Navigate</h3>
            <ul className="space-y-1">
              <li><Link href="/" className="text-xs text-cream/60 hover:text-cream transition-colors">Fact Check</Link></li>
              <li><Link href="/scholars" className="text-xs text-cream/60 hover:text-cream transition-colors">Scholars</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-cream/70 font-semibold mb-2 text-xs uppercase tracking-wider">Resources</h3>
            <ul className="space-y-1">
              <li><a href="https://sunnah.com" target="_blank" rel="noopener noreferrer" className="text-xs text-cream/60 hover:text-cream transition-colors">Sunnah.com</a></li>
              <li><a href="https://quran.com" target="_blank" rel="noopener noreferrer" className="text-xs text-cream/60 hover:text-cream transition-colors">Quran.com</a></li>
              <li><a href="https://islamqa.info" target="_blank" rel="noopener noreferrer" className="text-xs text-cream/60 hover:text-cream transition-colors">IslamQA</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-teal/20 text-center text-xs text-cream/50">
          Built for communities who create, distribute, and engage with information on their own terms.
        </div>
      </div>
    </footer>
  );
}
