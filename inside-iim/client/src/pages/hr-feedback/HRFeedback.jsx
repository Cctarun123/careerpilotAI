import DashboardShell from '../../components/layout/DashboardShell';
import Card from '../../components/ui/Card';
import PageHeader from '../../components/ui/PageHeader';
import PrerequisitesBanner from '../../components/ui/PrerequisitesBanner';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';
import Badge from '../../components/ui/Badge';
import Icon from '../../components/icons/Icons';
import { hrApi } from '../../services/api';
import { useAIFeature } from '../../hooks/useAIFeature';

const verdictVariant = {
  shortlist: 'success',
  maybe: 'warning',
  reject: 'danger',
};

const verdictLabel = {
  shortlist: 'Would Shortlist',
  maybe: 'Maybe — Needs Work',
  reject: 'Would Reject',
};

export default function HRFeedback() {
  const { result, loading, initialLoading, error, run, missing } = useAIFeature({
    analysisType: 'hr_feedback',
    runFn: (data) => hrApi.feedback(data),
  });

  return (
    <DashboardShell>
      <PageHeader
        title="HR Feedback"
        subtitle="Candid recruiter-style review of your resume"
        actionLabel="Get HR Review"
        onAction={() => run()}
        loading={loading}
      />

      <PrerequisitesBanner missing={missing} />
      {error && <p className="text-neutral-400 mb-4 text-sm border border-neutral-300 rounded-md p-3">{error}</p>}

      {initialLoading ? (
        <LoadingSkeleton rows={3} />
      ) : result ? (
        <div className="space-y-6">
          <Card>
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-black font-medium text-sm">Verdict</h3>
              <Badge variant={verdictVariant[result.verdict] || 'default'}>
                {verdictLabel[result.verdict] || result.verdict}
              </Badge>
            </div>
            <p className="text-neutral-400 leading-relaxed text-sm">{result.firstImpression}</p>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-black font-medium mb-3 text-sm">Green Flags</h3>
              <ul className="space-y-2">
                {result.greenFlags?.map((f, i) => (
                  <li key={i} className="text-sm text-neutral-400 flex gap-2">
                    <Icon name="check" className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <h3 className="text-neutral-400 font-medium mb-3 text-sm">Red Flags</h3>
              <ul className="space-y-2">
                {result.redFlags?.map((f, i) => (
                  <li key={i} className="text-sm text-neutral-400 flex gap-2">
                    <Icon name="x" className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <Card>
            <h3 className="text-black font-medium mb-3 text-sm">Questions They'd Ask in Screening</h3>
            <ul className="space-y-3">
              {result.questionsTheyWouldAsk?.map((q, i) => (
                <li key={i} className="text-sm text-neutral-400 pl-4 border-l-2 border-neutral-300">
                  {q}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      ) : (
        <Card className="text-center py-16">
          <p className="text-neutral-500">See how an HR manager would react to your resume in a first pass.</p>
        </Card>
      )}
    </DashboardShell>
  );
}
