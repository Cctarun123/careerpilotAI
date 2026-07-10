import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { AuthProvider } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';
import { AnalysisProvider } from './context/AnalysisContext';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ChooseGoal from './pages/onboarding/ChooseGoal';
import UploadResume from './pages/onboarding/UploadResume';
import Dashboard from './pages/dashboard/Dashboard';
import ResumeAnalysis from './pages/resume-analysis/ResumeAnalysis';
import SkillGap from './pages/skill-gap/SkillGap';
import LearningRoadmap from './pages/roadmap/LearningRoadmap';
import ProjectAdvisor from './pages/projects/ProjectAdvisor';
import ResumeOptimizer from './pages/optimizer/ResumeOptimizer';
import InterviewCoach from './pages/interview/InterviewCoach';
import HRFeedback from './pages/hr-feedback/HRFeedback';
import JDMatch from './pages/jd-match/JDMatch';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-neutral-500">Loading...</div>
      </div>
    );
  }
  return user ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Navigate to="/dashboard" replace /> : children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

      <Route path="/onboarding/goal" element={<PrivateRoute><ChooseGoal /></PrivateRoute>} />
      <Route path="/onboarding/resume" element={<PrivateRoute><UploadResume /></PrivateRoute>} />

      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/resume-analysis" element={<PrivateRoute><ResumeAnalysis /></PrivateRoute>} />
      <Route path="/skill-gap" element={<PrivateRoute><SkillGap /></PrivateRoute>} />
      <Route path="/roadmap" element={<PrivateRoute><LearningRoadmap /></PrivateRoute>} />
      <Route path="/projects" element={<PrivateRoute><ProjectAdvisor /></PrivateRoute>} />
      <Route path="/optimizer" element={<PrivateRoute><ResumeOptimizer /></PrivateRoute>} />
      <Route path="/interview" element={<PrivateRoute><InterviewCoach /></PrivateRoute>} />
      <Route path="/hr-feedback" element={<PrivateRoute><HRFeedback /></PrivateRoute>} />
      <Route path="/jd-match" element={<PrivateRoute><JDMatch /></PrivateRoute>} />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ResumeProvider>
        <AnalysisProvider>
          <AppRoutes />
        </AnalysisProvider>
      </ResumeProvider>
    </AuthProvider>
  );
}
