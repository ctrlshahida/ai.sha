export default function LoadingSpinner({ message = 'Checking sources…' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-8">
      <div className="relative w-20 h-20">
        {/* Outer ring - amber */}
        <div className="absolute inset-0 rounded-full border-2 border-amber/15" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-amber animate-spin" />
        {/* Inner ring - teal, counter-rotating */}
        <div className="absolute inset-3 rounded-full border-2 border-teal/15" />
        <div
          className="absolute inset-3 rounded-full border-2 border-transparent border-t-teal animate-spin"
          style={{ animationDuration: '1.4s', animationDirection: 'reverse' }}
        />
        {/* Centre */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-amber animate-pulse" />
        </div>
      </div>

      <div className="text-center space-y-1">
        <p className="text-cream font-semibold">{message}</p>
        <p className="text-cream-dark/60 text-sm">Quran · Sunnah · Scholarly sources</p>
      </div>
    </div>
  );
}
