import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const ROLES = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Data Analyst',
  'Product Manager',
  'DevOps Engineer',
];

export default function ChooseGoal() {
  const { updateGoal } = useAuth();
  const navigate = useNavigate();
  const [targetRole, setTargetRole] = useState('');
  const [custom, setCustom] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const role = custom || targetRole;
    if (!role) return;
    setLoading(true);
    try {
      await updateGoal(role);
      navigate('/onboarding/resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <h1 className="text-xl font-semibold text-black mb-1">What's your target role?</h1>
        <p className="text-neutral-500 text-sm mb-6">
          We'll tailor every analysis to this goal.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {ROLES.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => { setTargetRole(role); setCustom(''); }}
                className={`px-3 py-2 rounded-md text-sm text-left transition-colors border ${
                  targetRole === role
                    ? 'bg-black text-white border-black'
                    : 'border-neutral-300 text-neutral-500 hover:border-neutral-500 hover:text-black'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={custom}
            onChange={(e) => { setCustom(e.target.value); setTargetRole(''); }}
            placeholder="Or type a custom role..."
            className="input-field"
          />
          <Button type="submit" className="w-full" disabled={loading || (!targetRole && !custom)}>
            {loading ? 'Saving...' : 'Continue'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
