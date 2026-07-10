import { createContext, useContext, useState, useCallback } from 'react';

const AnalysisContext = createContext(null);
const JD_STORAGE_KEY = 'careerpilot_job_description';

export function AnalysisProvider({ children }) {
  const [skillGap, setSkillGap] = useState(null);
  const [jobDescription, setJobDescriptionState] = useState(() => {
    try {
      return sessionStorage.getItem(JD_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });

  const setJobDescription = useCallback((value) => {
    setJobDescriptionState(value);
    try {
      if (value?.trim()) {
        sessionStorage.setItem(JD_STORAGE_KEY, value);
      } else {
        sessionStorage.removeItem(JD_STORAGE_KEY);
      }
    } catch {
      /* ignore storage errors */
    }
  }, []);

  const hasJobDescription = !!jobDescription.trim();

  return (
    <AnalysisContext.Provider
      value={{
        skillGap,
        setSkillGap,
        jobDescription,
        setJobDescription,
        hasJobDescription,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysisContext() {
  const ctx = useContext(AnalysisContext);
  if (!ctx) throw new Error('useAnalysisContext must be used within AnalysisProvider');
  return ctx;
}
