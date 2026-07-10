import { useLocation } from 'react-router-dom';
import DashboardShell from '../../components/layout/DashboardShell';
import Card from '../../components/ui/Card';
import PageHeader from '../../components/ui/PageHeader';
import PrerequisitesBanner from '../../components/ui/PrerequisitesBanner';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';
import Badge from '../../components/ui/Badge';
import { roadmapApi } from '../../services/api';
import { useAIFeature } from '../../hooks/useAIFeature';
import { useAnalysisContext } from '../../context/AnalysisContext';

export default function LearningRoadmap() {
  const location = useLocation();
  const { skillGap } = useAnalysisContext();
  const fromSkillGap = location.state?.fromSkillGap;

  const missingSkills = skillGap?.missingSkills?.map((s) => s.skill) || [];

  const { result, loading, initialLoading, error, run, missing } = useAIFeature({
    analysisType: 'roadmap',
    runFn: (data) =>
      roadmapApi.generate({
        ...data,
        missingSkills: data.missingSkills ?? missingSkills,
      }),
  });

  const handleGenerate = () => {
    run({ missingSkills });
  };

  return (
    <DashboardShell>
      <PageHeader
        title="Learning Roadmap"
        subtitle="4-week plan to close your skill gaps"
        actionLabel={fromSkillGap && missingSkills.length ? 'Generate from Gaps' : 'Generate Roadmap'}
        onAction={handleGenerate}
        loading={loading}
      />

      <PrerequisitesBanner missing={missing} />
      {missingSkills.length > 0 && (
        <div className="mb-4 p-3 rounded-md bg-neutral-100 border border-neutral-300 text-sm text-neutral-400">
          Targeting {missingSkills.length} skill gap{missingSkills.length > 1 ? 's' : ''}:{' '}
          {missingSkills.slice(0, 5).join(', ')}
          {missingSkills.length > 5 && ` +${missingSkills.length - 5} more`}
        </div>
      )}
      {error && <p className="text-neutral-400 mb-4 text-sm border border-neutral-300 rounded-md p-3">{error}</p>}

      {initialLoading ? (
        <LoadingSkeleton rows={4} />
      ) : result?.weeks ? (
        <div className="space-y-4">
          {result.weeks.map((week) => (
            <Card key={week.weekNumber}>
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="accent">Week {week.weekNumber}</Badge>
                <h3 className="text-black font-medium text-sm">{week.focus}</h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {week.skills?.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
              <p className="text-sm text-neutral-500 mb-3">
                <span className="text-neutral-700 font-medium">Mini task:</span> {week.miniTask}
              </p>
              <ul className="space-y-2">
                {week.resources?.map((r, i) => (
                  <li key={i} className="text-sm">
                    {r.url ? (
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black underline underline-offset-2 hover:text-neutral-700"
                      >
                        {r.title}
                      </a>
                    ) : (
                      <span className="text-neutral-700">{r.title}</span>
                    )}
                    <span className="text-neutral-600 ml-2">({r.type})</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-16">
          <p className="text-neutral-400 mb-2">Generate a personalized 4-week learning plan.</p>
          <p className="text-neutral-600 text-sm">
            Tip: run Skill Gap first for a gap-targeted roadmap.
          </p>
        </Card>
      )}
    </DashboardShell>
  );
}
