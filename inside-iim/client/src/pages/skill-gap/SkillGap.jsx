import { useNavigate } from 'react-router-dom';
import DashboardShell from '../../components/layout/DashboardShell';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import PageHeader from '../../components/ui/PageHeader';
import PrerequisitesBanner from '../../components/ui/PrerequisitesBanner';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';
import Badge from '../../components/ui/Badge';
import SkillGapBars from '../../components/charts/SkillGapBars';
import { formatPercent } from '../../utils/formatters';
import { analysisApi } from '../../services/api';
import { useAIFeature } from '../../hooks/useAIFeature';
import { useAnalysisContext } from '../../context/AnalysisContext';

export default function SkillGap() {
  const navigate = useNavigate();
  const { setSkillGap } = useAnalysisContext();

  const { result, loading, initialLoading, error, run, missing } = useAIFeature({
    analysisType: 'skill_gap',
    runFn: (data) => analysisApi.skillGap(data),
    onSuccess: (data) => setSkillGap(data),
  });

  return (
    <DashboardShell>
      <PageHeader
        title="Skill Gap Analysis"
        subtitle="Compare your skills against your target role"
        actionLabel="Analyze Gaps"
        onAction={() => run()}
        loading={loading}
      />

      <PrerequisitesBanner missing={missing} />
      {error && <p className="text-neutral-400 mb-4 text-sm border border-neutral-300 rounded-md p-3">{error}</p>}

      {initialLoading ? (
        <LoadingSkeleton rows={2} />
      ) : result ? (
        <div className="space-y-6">
          <Card>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-black font-medium text-sm">Role Match</h3>
                <p className="text-neutral-500 text-sm mt-1">{result.summary}</p>
              </div>
              <span className="text-4xl font-semibold text-black shrink-0 tabular-nums">
                {formatPercent(result.matchPercentage)}
              </span>
            </div>
            {result.missingSkills?.length > 0 && (
              <Button
                variant="secondary"
                className="mt-4"
                onClick={() => navigate('/roadmap', { state: { fromSkillGap: true } })}
              >
                Build roadmap from these gaps
              </Button>
            )}
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-black font-medium mb-4 text-sm">Present Skills</h3>
              <SkillGapBars skills={result.presentSkills} />
            </Card>
            <Card>
              <h3 className="text-black font-medium mb-4 text-sm">Missing Skills</h3>
              <div className="space-y-3">
                {result.missingSkills?.map((s, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Badge variant={s.priority === 'high' ? 'danger' : s.priority === 'medium' ? 'warning' : 'default'}>
                      {s.priority}
                    </Badge>
                    <div>
                      <p className="text-neutral-700 text-sm font-medium">{s.skill}</p>
                      <p className="text-neutral-600 text-xs">{s.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      ) : (
        <Card className="text-center py-16">
          <p className="text-neutral-500">Run analysis to see what skills you need for your target role.</p>
        </Card>
      )}
    </DashboardShell>
  );
}
