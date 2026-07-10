import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  me: () => api.get('/auth/me'),
  updateGoal: (targetRole) => api.patch('/auth/goal', { targetRole }),
};

export const resumeApi = {
  upload: (file) => {
    const form = new FormData();
    form.append('resume', file);
    return api.post('/resume/upload', form);
  },
  getLatest: () => api.get('/resume/latest'),
};

export const analysisApi = {
  score: (data) => api.post('/analysis/score', data),
  skillGap: (data) => api.post('/analysis/skill-gap', data),
  getLatest: (type) => api.get(`/analysis/latest/${type}`),
};

export const roadmapApi = {
  generate: (data) => api.post('/roadmap/generate', data),
};

export const projectsApi = {
  suggest: (data) => api.post('/projects/suggest', data),
};

export const optimizerApi = {
  tailor: (data) => api.post('/optimizer/tailor', data),
};

export const interviewApi = {
  generate: (data) => api.post('/interview/generate', data),
  explain: (data) => api.post('/interview/explain', data),
  getLatest: (category) => api.get('/interview/latest', { params: { category } }),
};

export const hrApi = {
  feedback: (data) => api.post('/hr/feedback', data),
};

export const jdApi = {
  match: (data) => api.post('/jd/match', data),
};

export default api;
