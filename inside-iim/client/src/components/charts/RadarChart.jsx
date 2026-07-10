import ProgressBar from '../ui/ProgressBar';

export default function RadarChart({ data = [] }) {
  if (!data.length) {
    return <p className="text-neutral-500 text-sm">No chart data yet.</p>;
  }

  const size = 160;
  const center = size / 2;
  const maxRadius = center - 16;
  const angleStep = (2 * Math.PI) / data.length;

  const points = data.map((item, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = (item.score / 100) * maxRadius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  });

  const polygon = points.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width={size} height={size}>
        {[0.25, 0.5, 0.75, 1].map((scale) => (
          <circle
            key={scale}
            cx={center}
            cy={center}
            r={maxRadius * scale}
            fill="none"
            stroke="#d9d9d9"
          />
        ))}
        <polygon
          points={polygon}
          fill="rgba(0,0,0,0.08)"
          stroke="#000000"
          strokeWidth="1.5"
        />
      </svg>
      <div className="w-full space-y-2">
        {data.map((item) => (
          <div key={item.name}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-neutral-500">{item.name}</span>
              <span className="text-neutral-700 tabular-nums">{Math.round(item.score)}</span>
            </div>
            <ProgressBar value={item.score} />
          </div>
        ))}
      </div>
    </div>
  );
}
