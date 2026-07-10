import ProgressBar from '../ui/ProgressBar';

export default function SkillGapBars({ skills = [] }) {
  if (!skills.length) {
    return <p className="text-neutral-500 text-sm">No skill data yet.</p>;
  }

  return (
    <div className="space-y-3">
      {skills.map((item, i) => (
        <div key={i}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-neutral-700">{item.skill}</span>
            <span className="text-neutral-500 capitalize text-xs">{item.level || item.priority}</span>
          </div>
          <ProgressBar
            value={item.level === 'advanced' ? 90 : item.level === 'intermediate' ? 60 : 30}
          />
        </div>
      ))}
    </div>
  );
}
