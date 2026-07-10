import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import { analysisApi } from '../services/api';

export function usePrerequisites() {
  const { user } = useAuth();
  const { resume, loading: resumeLoading, fetchLatest } = useResume();

  useEffect(() => {
    fetchLatest();
  }, [fetchLatest]);

  const missing = [];
  if (!user?.targetRole) missing.push('target role');
  if (!resume && !resumeLoading) missing.push('resume');

  return {
    ready: missing.length === 0,
    missing,
    user,
    resume,
    resumeLoading,
  };
}

export function useAIFeature({ analysisType, runFn, onSuccess, skipInitialLoad = false }) {
  const { ready, missing, resumeLoading } = usePrerequisites();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!analysisType && !skipInitialLoad);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!analysisType || skipInitialLoad) {
      setInitialLoading(false);
      return;
    }

    analysisApi
      .getLatest(analysisType)
      .then((res) => {
        setResult(res.data);
        onSuccess?.(res.data);
      })
      .catch(() => {})
      .finally(() => setInitialLoading(false));
  }, [analysisType, skipInitialLoad]);

  const run = useCallback(async (payload = {}) => {
    if (!ready) {
      setError(`Please set your ${missing.join(' and ')} first.`);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await runFn(payload);
      setResult(res.data);
      onSuccess?.(res.data);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Request failed');
    } finally {
      setLoading(false);
    }
  }, [ready, missing, runFn, onSuccess]);

  return { result, setResult, loading, initialLoading, error, run, ready, missing, resumeLoading };
}
