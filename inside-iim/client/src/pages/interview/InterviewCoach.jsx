import { useEffect, useState } from 'react';
import DashboardShell from '../../components/layout/DashboardShell';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import PageHeader from '../../components/ui/PageHeader';
import PrerequisitesBanner from '../../components/ui/PrerequisitesBanner';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';
import ProgressBar from '../../components/ui/ProgressBar';
import Icon from '../../components/icons/Icons';
import { interviewApi } from '../../services/api';
import { usePrerequisites } from '../../hooks/useAIFeature';
import { INTERVIEW_CATEGORIES } from '../../config/navItems';

export default function InterviewCoach() {
  const { ready, missing } = usePrerequisites();
  const [category, setCategory] = useState('behavioral');
  const [questions, setQuestions] = useState(null);
  const [selectedQ, setSelectedQ] = useState(null);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState('');
  const [showHints, setShowHints] = useState(false);

  useEffect(() => {
    setInitialLoading(true);
    interviewApi
      .getLatest(category)
      .then((res) => {
        setQuestions(res.data.questions);
        setSelectedQ(null);
        setAnswer('');
        setFeedback(null);
      })
      .catch(() => setQuestions(null))
      .finally(() => setInitialLoading(false));
  }, [category]);

  const generate = async () => {
    if (!ready) {
      setError(`Please set your ${missing.join(' and ')} first.`);
      return;
    }
    setLoading(true);
    setError('');
    setFeedback(null);
    setShowHints(false);
    try {
      const res = await interviewApi.generate({ category });
      setQuestions(res.data.questions || res.data);
      setSelectedQ(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Generation failed');
    } finally {
      setLoading(false);
    }
  };

  const evaluate = async () => {
    if (!selectedQ || !answer.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await interviewApi.explain({
        question: selectedQ.question,
        userAnswer: answer.trim(),
      });
      setFeedback(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Evaluation failed');
    } finally {
      setLoading(false);
    }
  };

  const selectQuestion = (q) => {
    setSelectedQ(q);
    setAnswer('');
    setFeedback(null);
    setShowHints(false);
  };

  return (
    <DashboardShell>
      <PageHeader
        title="Interview Coach"
        subtitle="Practice with AI-generated questions and get scored feedback"
        actionLabel="Generate Questions"
        onAction={generate}
        loading={loading}
      />

      <PrerequisitesBanner missing={missing} />

      <div className="flex flex-wrap gap-2 mb-6">
        {INTERVIEW_CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={`px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-2 border ${
              category === c.id
                ? 'bg-black text-white border-black'
                : 'bg-transparent text-neutral-500 border-neutral-300 hover:border-neutral-500 hover:text-black'
            }`}
          >
            <Icon name={c.icon} className="w-3.5 h-3.5" />
            {c.label}
          </button>
        ))}
      </div>

      {error && <p className="text-neutral-400 mb-4 text-sm border border-neutral-300 rounded-md p-3">{error}</p>}

      {initialLoading ? (
        <LoadingSkeleton rows={2} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <h3 className="text-black font-medium mb-3 text-sm">
              {INTERVIEW_CATEGORIES.find((c) => c.id === category)?.label} Questions
            </h3>
            {questions?.length ? (
              <div className="space-y-1 max-h-[420px] overflow-y-auto">
                {questions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => selectQuestion(q)}
                    className={`w-full text-left p-3 rounded-md text-sm transition-colors ${
                      selectedQ === q
                        ? 'bg-black text-white'
                        : 'hover:bg-neutral-100 text-neutral-400'
                    }`}
                  >
                    <span className="text-neutral-600 text-xs mr-2 tabular-nums">Q{i + 1}</span>
                    {q.question}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-neutral-500 text-sm">Generate questions to start practicing.</p>
            )}
          </Card>

          <Card>
            {selectedQ ? (
              <div className="space-y-4">
                <h3 className="text-black font-medium text-sm leading-relaxed">{selectedQ.question}</h3>

                <Button variant="ghost" className="text-xs" onClick={() => setShowHints(!showHints)}>
                  {showHints ? 'Hide hints' : 'Show model answer & common mistakes'}
                </Button>

                {showHints && (
                  <div className="p-3 rounded-md bg-neutral-100 border border-neutral-200 space-y-3 text-sm">
                    <div>
                      <p className="text-neutral-600 text-xs mb-1 uppercase tracking-wider">Model answer</p>
                      <p className="text-neutral-700">{selectedQ.goodAnswer}</p>
                    </div>
                    {selectedQ.commonMistakes?.length > 0 && (
                      <div>
                        <p className="text-neutral-600 text-xs mb-1 uppercase tracking-wider">Common mistakes</p>
                        <ul className="space-y-1">
                          {selectedQ.commonMistakes.map((m, i) => (
                            <li key={i} className="text-neutral-400 flex items-start gap-2">
                              <Icon name="x" className="w-3 h-3 mt-0.5 shrink-0" />
                              {m}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  rows={5}
                  placeholder="Type your answer here..."
                  className="input-field resize-none"
                />
                <Button onClick={evaluate} disabled={loading || !answer.trim()}>
                  Get Feedback
                </Button>

                {feedback && (
                  <div className="space-y-4 pt-4 border-t border-neutral-200">
                    <div className="flex items-center gap-3">
                      <Badge variant={feedback.score >= 70 ? 'success' : 'warning'}>
                        {feedback.score}/100
                      </Badge>
                      <ProgressBar value={feedback.score} className="flex-1" />
                    </div>
                    {feedback.strengths?.length > 0 && (
                      <div>
                        <p className="text-neutral-600 text-xs mb-1 uppercase tracking-wider">Strengths</p>
                        <ul className="space-y-1">
                          {feedback.strengths.map((s, i) => (
                            <li key={i} className="text-sm text-neutral-700 flex items-start gap-2">
                              <Icon name="check" className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {feedback.improvements?.length > 0 && (
                      <div>
                        <p className="text-neutral-600 text-xs mb-1 uppercase tracking-wider">Improve</p>
                        <ul className="space-y-1">
                          {feedback.improvements.map((s, i) => (
                            <li key={i} className="text-sm text-neutral-700 flex items-start gap-2">
                              <Icon name="arrow-right" className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div>
                      <p className="text-neutral-600 text-xs mb-1 uppercase tracking-wider">Model answer</p>
                      <p className="text-sm text-neutral-700">{feedback.modelAnswer}</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="icon-box icon-box-lg mx-auto mb-3">
                  <Icon name="mic" className="w-5 h-5" />
                </div>
                <p className="text-neutral-500 text-sm">Select a question to practice your answer.</p>
              </div>
            )}
          </Card>
        </div>
      )}
    </DashboardShell>
  );
}
