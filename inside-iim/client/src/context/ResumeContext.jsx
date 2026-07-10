import { createContext, useContext, useState, useCallback } from 'react';
import { resumeApi } from '../services/api';

const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLatest = useCallback(async () => {
    setLoading(true);
    try {
      const res = await resumeApi.getLatest();
      setResume(res.data);
      return res.data;
    } catch {
      setResume(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadResume = async (file) => {
    setLoading(true);
    try {
      const res = await resumeApi.upload(file);
      setResume(res.data);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResumeContext.Provider value={{ resume, loading, fetchLatest, uploadResume, setResume }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used within ResumeProvider');
  return ctx;
}
