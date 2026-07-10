import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardShell from '../../components/layout/DashboardShell';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import PageHeader from '../../components/ui/PageHeader';
import PrerequisitesBanner from '../../components/ui/PrerequisitesBanner';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';
import LockedSection from '../../components/ui/LockedSection';
import Icon from '../../components/icons/Icons';
import { optimizerApi } from '../../services/api';
import { useAIFeature } from '../../hooks/useAIFeature';
import { useAnalysisContext } from '../../context/AnalysisContext';

export default function ResumeOptimizer() {
  const location = useLocation();
  const { jobDescription, setJobDescription, hasJobDescription } = useAnalysisContext();

  const { result, setResult, loading, initialLoading, error, run, missing } = useAIFeature({
    analysisType: 'resume_optimize',
    runFn: (data) => optimizerApi.tailor(data),
    skipInitialLoad: true,
  });

  useEffect(() => {
    if (location.state?.jobDescription) {
      setJobDescription(location.state.jobDescription);
    }
  }, [location.state?.jobDescription, setJobDescription]);

  useEffect(() => {
    if (!hasJobDescription) {
      setResult(null);
    }
  }, [hasJobDescription, setResult]);

  const handleOptimize = () => {
    if (!hasJobDescription) return;
    run({ jobDescription: jobDescription.trim() });
  };

  const copyText = (text) => navigator.clipboard?.writeText(text);

  return (
    <DashboardShell>
      <PageHeader
        title="Resume Optimizer"
        subtitle="Tailor bullets and keywords for a specific job description"
        actionLabel="Optimize Resume"
        onAction={handleOptimize}
        loading={loading}
        disabled={!hasJobDescription}
      />

      <PrerequisitesBanner missing={missing} />

      <Card className="mb-6">
        <label className="block text-sm text-neutral-500 mb-2">
          Job description <span className="text-black">*</span>
        </label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={5}
          className="input-field resize-none text-sm"
          placeholder="Paste a job description to unlock optimization..."
        />
        {location.state?.jobDescription && hasJobDescription && (
          <p className="text-xs text-neutral-400 mt-2">Pre-filled from JD Match</p>
        )}
      </Card>

      <LockedSection
        locked={!hasJobDescription}
        message="Paste a job description above to unlock resume optimization."
      >
        {error && (
          <p className="text-neutral-400 mb-4 text-sm border border-neutral-300 rounded-md p-3">{error}</p>
        )}

        {initialLoading ? (
          <LoadingSkeleton rows={3} />
        ) : result ? (
          <div className="space-y-6">
            <Card>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-black font-medium mb-2 text-sm">Suggested Summary</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">{result.summary}</p>
                </div>
                <Button variant="ghost" className="shrink-0 text-xs" onClick={() => copyText(result.summary)}>
                  Copy
                </Button>
              </div>
            </Card>

            <Card>
              <h3 className="text-black font-medium mb-4 text-sm">Bullet Rewrites</h3>
              <div className="space-y-5">
                {result.bulletRewrites?.map((b, i) => (
                  <div key={i} className="border-l-2 border-neutral-300 pl-4">
                    <Badge className="mb-2">{b.section}</Badge>
                    <p className="text-sm text-neutral-600 line-through mb-2">{b.original}</p>
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm text-neutral-700">{b.improved}</p>
                      <Button variant="ghost" className="shrink-0 text-xs" onClick={() => copyText(b.improved)}>
                        Copy
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-black font-medium mb-3 text-sm">Keywords to Add</h3>
                <div className="flex flex-wrap gap-2">
                  {result.keywordsToAdd?.map((k) => (
                    <Badge key={k} variant="accent">{k}</Badge>
                  ))}
                </div>
              </Card>
              <Card>
                <h3 className="text-black font-medium mb-3 text-sm">ATS Tips</h3>
                <ul className="space-y-2">
                  {result.atsTips?.map((tip, i) => (
                    <li key={i} className="text-sm text-neutral-400 flex gap-2">
                      <Icon name="arrow-right" className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="text-center py-16">
            <p className="text-neutral-500">Click Optimize Resume to get tailored bullet rewrites and ATS tips.</p>
          </Card>
        )}
      </LockedSection>
    </DashboardShell>
  );
}
