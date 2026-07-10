export default function LoadingSkeleton({ rows = 3 }) {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="glass-card p-6">
          <div className="h-3 bg-neutral-200 rounded w-1/4 mb-3" />
          <div className="h-2 bg-neutral-100 rounded w-full mb-2" />
          <div className="h-2 bg-neutral-100 rounded w-2/3" />
        </div>
      ))}
    </div>
  );
}
