import DashboardShell from '../../components/layout/DashboardShell';
import Card from '../../components/ui/Card';
import PageHeader from '../../components/ui/PageHeader';
import PrerequisitesBanner from '../../components/ui/PrerequisitesBanner';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';
import Badge from '../../components/ui/Badge';
import { projectsApi } from '../../services/api';
import { useAIFeature } from '../../hooks/useAIFeature';

export default function ProjectAdvisor() {
  const { result, loading, initialLoading, error, run, missing } = useAIFeature({
    analysisType: 'project_suggest',
    runFn: (data) => projectsApi.suggest(data),
  });

  return (
    <DashboardShell>
      <PageHeader
        title="Project Advisor"
        subtitle="Portfolio ideas tailored to your profile and target role"
        actionLabel="Suggest Projects"
        onAction={() => run()}
        loading={loading}
      />

      <PrerequisitesBanner missing={missing} />
      {error && <p className="text-neutral-400 mb-4 text-sm border border-neutral-300 rounded-md p-3">{error}</p>}

      {initialLoading ? (
        <LoadingSkeleton rows={2} />
      ) : result?.projects ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.projects.map((p, i) => (
            <Card key={i} className="flex flex-col">
              <div className="flex items-start justify-between mb-2 gap-2">
                <h3 className="text-black font-medium text-sm">{p.title}</h3>
                <Badge variant={p.difficulty === 'advanced' ? 'danger' : p.difficulty === 'intermediate' ? 'warning' : 'success'}>
                  {p.difficulty}
                </Badge>
              </div>
              <p className="text-sm text-neutral-500 mb-3 flex-1">{p.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {p.skills?.map((s) => <Badge key={s}>{s}</Badge>)}
              </div>
              <p className="text-xs text-neutral-600 border-t border-neutral-200 pt-3">
                <span className="text-neutral-500">Impact:</span> {p.impact}
              </p>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-16">
          <p className="text-neutral-500">Get AI-suggested portfolio projects to stand out in interviews.</p>
        </Card>
      )}
    </DashboardShell>
  );
}
