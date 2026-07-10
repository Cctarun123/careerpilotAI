export default function ProgressBar({ value = 0, className = '' }) {
  return (
    <div className={`h-1.5 rounded-full bg-neutral-200 overflow-hidden ${className}`}>
      <div
        className="h-full rounded-full bg-black transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
