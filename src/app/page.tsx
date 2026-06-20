import { Suspense } from 'react';
import HeroSection from '@/components/home/HeroSection';
import ClaimInputForm from '@/components/home/ClaimInputForm';
import TrendingSection from '@/components/home/TrendingSection';

export default function HomePage() {
  return (
    <div className="py-4">
      <HeroSection />
      <div className="border-t border-gold/20 my-6" />
      <ClaimInputForm />
      <div className="border-t border-gold/10 my-8" />
      <Suspense fallback={null}>
        <TrendingSection />
      </Suspense>
    </div>
  );
}
