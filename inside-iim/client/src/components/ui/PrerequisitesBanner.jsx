import { Link } from 'react-router-dom';
import Icon from '../icons/Icons';

export default function PrerequisitesBanner({ missing = [] }) {
  if (!missing.length) return null;

  return (
    <div className="mb-6 p-4 rounded-md border border-neutral-300 bg-neutral-100 text-sm text-neutral-400">
      <p className="font-medium text-black mb-2">Before running AI analysis</p>
      <ul className="space-y-1.5">
        {missing.includes('target role') && (
          <li className="flex items-center gap-2">
            <Icon name="target" className="w-3.5 h-3.5 text-neutral-500" />
            Set your target role in{' '}
            <Link to="/onboarding/goal" className="text-black underline underline-offset-2">
              onboarding
            </Link>
          </li>
        )}
        {missing.includes('resume') && (
          <li className="flex items-center gap-2">
            <Icon name="file" className="w-3.5 h-3.5 text-neutral-500" />
            Upload your resume on the{' '}
            <Link to="/onboarding/resume" className="text-black underline underline-offset-2">
              upload page
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
