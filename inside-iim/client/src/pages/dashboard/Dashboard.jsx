import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardShell from '../../components/layout/DashboardShell';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Icon from '../../components/icons/Icons';
import { useAuth } from '../../context/AuthContext';
import { analysisApi } from '../../services/api';
import { formatPercent } from '../../utils/formatters';
import { FEATURE_CARDS } from '../../config/navItems';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [completed, setCompleted] = useState({});

  useEffect(() => {
    const types = [
      'resume_score',
      'skill_gap',
      'jd_match',
      'roadmap',
      'project_suggest',
      'resume_optimize',
      'hr_feedback',
    ];
    types.forEach((type) => {
      analysisApi
        .getLatest(type)
        .then((res) => setCompleted((prev) => ({ ...prev, [type]: res.data })))
        .catch(() => {});
    });
  }, []);

  const getBadge = (card) => {
    const data = completed[card.type];
    if (!data) return { label: 'Not run', variant: 'default' };
    if (card.scoreKey && data[card.scoreKey] != null) {
      return { label: formatPercent(data[card.scoreKey]), variant: 'success' };
    }
    if (card.type === 'roadmap' && data.weeks) {
      return { label: `${data.weeks.length} weeks`, variant: 'success' };
    }
    if (card.type === 'project_suggest' && data.projects) {
      return { label: `${data.projects.length} ideas`, variant: 'success' };
    }
    if (card.type === 'hr_feedback' && data.verdict) {
      return { label: data.verdict, variant: 'warning' };
    }
    if (card.type === 'resume_optimize' && data.bulletRewrites) {
      return { label: `${data.bulletRewrites.length} rewrites`, variant: 'success' };
    }
    return { label: 'Done', variant: 'success' };
  };

  const completedCount = FEATURE_CARDS.filter((c) => c.type && completed[c.type]).length;
  const totalWithType = FEATURE_CARDS.filter((c) => c.type).length;

  return (
    <DashboardShell>
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-black">
              Welcome back, {user?.name?.split(' ')[0] || 'there'}
            </h1>
            <p className="text-neutral-500 text-sm mt-1">
              {user?.targetRole
                ? `Targeting ${user.targetRole}`
                : 'Set your target role to unlock personalized insights'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-neutral-600 uppercase tracking-wider">Progress</p>
            <p className="text-lg font-medium text-black tabular-nums">
              {completedCount}/{totalWithType}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {FEATURE_CARDS.map((card) => {
          const badge = getBadge(card);
          return (
            <Card
              key={card.path}
              onClick={() => navigate(card.path)}
              className={`group ${card.featured ? 'border-neutral-500' : ''}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="icon-box group-hover:border-neutral-500 transition-colors">
                  <Icon name={card.icon} className="w-4 h-4" />
                </div>
                <Badge variant={badge.variant}>{badge.label}</Badge>
              </div>
              <h3 className="text-base font-medium text-black group-hover:text-neutral-800 transition-colors">
                {card.title}
              </h3>
              {card.featured && (
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 mt-1 block">
                  Featured
                </span>
              )}
              <p className="text-sm text-neutral-500 mt-1.5 leading-relaxed">{card.description}</p>
            </Card>
          );
        })}
      </div>
    </DashboardShell>
  );
}
