import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardShell from '../../components/layout/DashboardShell';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import PageHeader from '../../components/ui/PageHeader';
import PrerequisitesBanner from '../../components/ui/PrerequisitesBanner';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';
import LockedSection from '../../components/ui/LockedSection';
import ScoreRing from '../../components/charts/ScoreRing';
import ProgressBar from '../../components/ui/ProgressBar';
import Icon from '../../components/icons/Icons';
import { formatPercent } from '../../utils/formatters';
import { jdApi } from '../../services/api';
import { useAIFeature } from '../../hooks/useAIFeature';
import { useAnalysisContext } from '../../context/AnalysisContext';

export default function JDMatch() {
  const navigate = useNavigate();
  const { jobDescription, setJobDescription, hasJobDescription } = useAnalysisContext();

  const { result, setResult, loading, initialLoading, error, run, missing } = useAIFeature({
    analysisType: 'jd_match',
    runFn: (data) => jdApi.match(data),
    skipInitialLoad: true,
  });

  useEffect(() => {
    if (!hasJobDescription) {
      setResult(null);
    }
  }, [hasJobDescription, setResult]);

  const handleMatch = () => {
    if (!hasJobDescription) return;
    run({ jobDescription: jobDescription.trim() });
  };

  return (
    <DashboardShell>
      <PageHeader
        title="JD Match"
        subtitle="Paste a job description — see exactly how well your resume fits"
        actionLabel="Calculate Match"
        onAction={handleMatch}
        loading={loading}
        disabled={!hasJobDescription}
      />

      <PrerequisitesBanner missing={missing} />

      <Card className="mb-6">
        <label className="block text-sm text-neutral-500 mb-2">
          Job Description <span className="text-black">*</span>
        </label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={8}
          className="input-field resize-none text-sm leading-relaxed"
          placeholder="Paste the full job description here — requirements, responsibilities, qualifications..."
        />
        <p className="text-xs text-neutral-600 mt-2">
          Tip: include the full posting for the most accurate keyword match.
        </p>
      </Card>

      <LockedSection
        locked={!hasJobDescription}
        message="Paste a job description above to unlock match analysis."
      >
        {error && (
          <p className="text-neutral-400 mb-4 text-sm border border-neutral-300 rounded-md p-3">{error}</p>
        )}

        {initialLoading ? (
          <LoadingSkeleton rows={3} />
        ) : result ? (
          <div className="space-y-6">
            <Card>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <ScoreRing score={result.matchPercentage} label="JD Match" size={140} />
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-2xl font-semibold text-black mb-1">
                    {formatPercent(result.matchPercentage)} Match
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{result.summary}</p>
                  <ProgressBar value={result.matchPercentage} className="mt-4" />
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-black font-medium mb-3 text-sm">
                  Matched Keywords ({result.matchedKeywords?.length || 0})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.matchedKeywords?.map((k) => (
                    <Badge key={k} variant="success">{k}</Badge>
                  ))}
                </div>
              </Card>
              <Card>
                <h3 className="text-neutral-400 font-medium mb-3 text-sm">
                  Missing Keywords ({result.missingKeywords?.length || 0})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.missingKeywords?.map((k) => (
                    <Badge key={k} variant="default">{k}</Badge>
                  ))}
                </div>
              </Card>
            </div>

            <Card>
              <h3 className="text-black font-medium mb-3 text-sm">Recommendations</h3>
              <ul className="space-y-2">
                {result.recommendations?.map((r, i) => (
                  <li key={i} className="text-sm text-neutral-400 flex gap-2">
                    <Icon name="arrow-right" className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
              <Button
                variant="secondary"
                className="mt-4"
                onClick={() => navigate('/optimizer', { state: { jobDescription } })}
              >
                Optimize resume for this JD
              </Button>
            </Card>
          </div>
        ) : (
          <Card className="text-center py-16">
            <div className="icon-box icon-box-lg mx-auto mb-3">
              <Icon name="target" className="w-5 h-5" />
            </div>
            <p className="text-neutral-400 mb-2">Click Calculate Match to see your fit for this role.</p>
            <p className="text-neutral-600 text-sm">Keywords, gaps, and recommendations appear here.</p>
          </Card>
        )}
      </LockedSection>
    </DashboardShell>
  );
}
