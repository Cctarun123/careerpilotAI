import DashboardShell from '../../components/layout/DashboardShell';
import Card from '../../components/ui/Card';
import PageHeader from '../../components/ui/PageHeader';
import PrerequisitesBanner from '../../components/ui/PrerequisitesBanner';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';
import ScoreRing from '../../components/charts/ScoreRing';
import RadarChart from '../../components/charts/RadarChart';
import ProgressBar from '../../components/ui/ProgressBar';
import Icon from '../../components/icons/Icons';
import { analysisApi } from '../../services/api';
import { useAIFeature } from '../../hooks/useAIFeature';

export default function ResumeAnalysis() {
  const { result, loading, initialLoading, error, run, missing } = useAIFeature({
    analysisType: 'resume_score',
    runFn: (data) => analysisApi.score(data),
  });

  return (
    <DashboardShell>
      <PageHeader
        title="Resume Score"
        subtitle="AI-powered quality assessment for your target role"
        actionLabel="Run Analysis"
        onAction={() => run()}
        loading={loading}
      />

      <PrerequisitesBanner missing={missing} />
      {error && <p className="text-neutral-400 mb-4 text-sm border border-neutral-300 rounded-md p-3">{error}</p>}

      {initialLoading ? (
        <LoadingSkeleton rows={2} />
      ) : result ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="flex flex-col items-center justify-center">
            <ScoreRing score={result.overallScore} label="Overall" />
          </Card>
          <Card>
            <h3 className="text-black font-medium mb-4 text-sm">Category Breakdown</h3>
            <RadarChart data={result.categories?.map((c) => ({ name: c.name, score: c.score }))} />
          </Card>
          {result.categories?.length > 0 && (
            <Card className="lg:col-span-2">
              <h3 className="text-black font-medium mb-4 text-sm">Category Feedback</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.categories.map((cat) => (
                  <div key={cat.name} className="p-3 rounded-md bg-neutral-100 border border-neutral-200">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-neutral-700 font-medium">{cat.name}</span>
                      <span className="text-black tabular-nums">{Math.round(cat.score)}/100</span>
                    </div>
                    <ProgressBar value={cat.score} className="mb-2" />
                    <p className="text-xs text-neutral-500">{cat.feedback}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}
          <Card>
            <h3 className="text-black font-medium mb-3 text-sm">Top Strengths</h3>
            <ul className="space-y-2">
              {result.topStrengths?.map((s, i) => (
                <li key={i} className="text-sm text-neutral-400 flex gap-2">
                  <Icon name="check" className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="text-black font-medium mb-3 text-sm">Quick Wins</h3>
            <ul className="space-y-2">
              {result.quickWins?.map((w, i) => (
                <li key={i} className="text-sm text-neutral-400 flex gap-2">
                  <Icon name="arrow-right" className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  {w}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      ) : (
        <Card className="text-center py-16">
          <p className="text-neutral-400 mb-2">Upload a resume, then run analysis to see your score.</p>
          <p className="text-neutral-600 text-sm">Results are saved — you won't lose them on refresh.</p>
        </Card>
      )}
    </DashboardShell>
  );
}
