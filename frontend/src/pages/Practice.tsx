import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';

const Practice: React.FC = () => {
  const { subject } = useParams<{ subject: string }>();
  const { getQuestionsBySubject, userProgress, loading } = useData();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'attempted' | 'unattempted'>('all');

  const subjects = {
    quant: { name: 'Quantitative Aptitude', icon: '📊', color: 'bg-blue-500' },
    varc: { name: 'Verbal Ability & Reading Comprehension', icon: '📚', color: 'bg-green-500' },
    dilr: { name: 'Data Interpretation & Logical Reasoning', icon: '🧩', color: 'bg-purple-500' },
    'decision-making': { name: 'Decision Making', icon: '🎯', color: 'bg-orange-500' },
    essay: { name: 'Essay Writing', icon: '✍️', color: 'bg-red-500' }
  };

  useEffect(() => {
    if (!subject) {
      navigate('/search');
    }
  }, [subject, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-16">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <p className="text-[var(--nav-text-color)]">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (!subject || !subjects[subject as keyof typeof subjects]) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[var(--text-color)] mb-4">Subject not found</h2>
          <Link to="/search" className="text-primary-500 hover:text-primary-600">
            Choose a subject to practice
          </Link>
        </div>
      </div>
    );
  }

  const questions = getQuestionsBySubject(subject);
  const subjectInfo = subjects[subject as keyof typeof subjects];

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.question_text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         question.passage_text?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const isAttempted = userProgress.answered[question.qid];
    
    if (filter === 'attempted' && !isAttempted) return false;
    if (filter === 'unattempted' && isAttempted) return false;
    
    return matchesSearch;
  });

  const startPractice = () => {
    if (questions.length > 0) {
      navigate(`/question/${subject}/${questions[0].qid}`);
    }
  };

  const continueFromLastQuestion = () => {
    const lastAnsweredIndex = questions.findIndex(q => !userProgress.answered[q.qid]);
    const targetIndex = Math.max(0, lastAnsweredIndex);
    if (questions[targetIndex]) {
      navigate(`/question/${subject}/${questions[targetIndex].qid}`);
    }
  };

  const getProgressStats = () => {
    const totalQuestions = questions.length;
    const attemptedQuestions = questions.filter(q => userProgress.answered[q.qid]).length;
    const correctAnswers = questions.filter(q => {
      const userAnswer = userProgress.answered[q.qid];
      return userAnswer && userAnswer === q.correct_option_data;
    }).length;

    return {
      total: totalQuestions,
      attempted: attemptedQuestions,
      correct: correctAnswers,
      accuracy: attemptedQuestions > 0 ? Math.round((correctAnswers / attemptedQuestions) * 100) : 0,
      progress: totalQuestions > 0 ? Math.round((attemptedQuestions / totalQuestions) * 100) : 0
    };
  };

  const stats = getProgressStats();

  return (
    <div className="min-h-screen pt-16">
      {/* Header Section */}
      <div className="bg-[var(--surface-color)] border-b border-[var(--border-color)]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-12 h-12 rounded-lg ${subjectInfo.color} flex items-center justify-center text-2xl`}>
              {subjectInfo.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[var(--text-color)]">{subjectInfo.name}</h1>
              <p className="text-[var(--nav-text-color)]">{questions.length} questions available</p>
            </div>
          </div>

          {/* Progress Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-[var(--surface-secondary)] rounded-lg p-4">
              <div className="text-2xl font-bold text-[var(--text-color)]">{stats.total}</div>
              <div className="text-sm text-[var(--nav-text-color)]">Total Questions</div>
            </div>
            <div className="bg-[var(--surface-secondary)] rounded-lg p-4">
              <div className="text-2xl font-bold text-[var(--text-color)]">{stats.attempted}</div>
              <div className="text-sm text-[var(--nav-text-color)]">Attempted</div>
            </div>
            <div className="bg-[var(--surface-secondary)] rounded-lg p-4">
              <div className="text-2xl font-bold text-[var(--text-color)]">{stats.correct}</div>
              <div className="text-sm text-[var(--nav-text-color)]">Correct</div>
            </div>
            <div className="bg-[var(--surface-secondary)] rounded-lg p-4">
              <div className="text-2xl font-bold text-[var(--text-color)]">{stats.accuracy}%</div>
              <div className="text-sm text-[var(--nav-text-color)]">Accuracy</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-[var(--nav-text-color)] mb-2">
              <span>Progress</span>
              <span>{stats.progress}%</span>
            </div>
            <div className="w-full bg-[var(--surface-secondary)] rounded-full h-2">
              <div 
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${stats.progress}%` }}
              ></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={startPractice}
              className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Start from Beginning
            </button>
            <button
              onClick={continueFromLastQuestion}
              className="flex-1 bg-[var(--surface-secondary)] hover:bg-[var(--btn-secondary-hover-bg)] text-[var(--text-color)] font-semibold py-3 px-6 rounded-lg border border-[var(--border-color)] transition-colors"
            >
              Continue Practice
            </button>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[var(--border-color)] rounded-lg bg-[var(--surface-color)] text-[var(--text-color)] focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <svg className="absolute left-3 top-2.5 h-5 w-5 text-[var(--nav-text-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-[var(--surface-secondary)] text-[var(--text-color)] hover:bg-[var(--btn-secondary-hover-bg)]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('attempted')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'attempted' 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-[var(--surface-secondary)] text-[var(--text-color)] hover:bg-[var(--btn-secondary-hover-bg)]'
              }`}
            >
              Attempted
            </button>
            <button
              onClick={() => setFilter('unattempted')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'unattempted' 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-[var(--surface-secondary)] text-[var(--text-color)] hover:bg-[var(--btn-secondary-hover-bg)]'
              }`}
            >
              Unattempted
            </button>
          </div>
        </div>

        {/* Questions Grid */}
        <div className="grid gap-4">
          {filteredQuestions.map((question, index) => {
            const isAttempted = userProgress.answered[question.qid];
            const isCorrect = isAttempted && userProgress.answered[question.qid] === question.correct_option_data;
            
            return (
              <Link
                key={question.qid}
                to={`/question/${subject}/${question.qid}`}
                className="block p-6 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-lg hover:bg-[var(--surface-secondary)] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    isAttempted 
                      ? isCorrect 
                        ? 'bg-green-500 text-white' 
                        : 'bg-red-500 text-white'
                      : 'bg-[var(--surface-secondary)] text-[var(--nav-text-color)]'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-[var(--text-color)] mb-2 line-clamp-2">
                      {question.question_text}
                    </p>
                    {question.passage_text && (
                      <p className="text-sm text-[var(--nav-text-color)] mb-2 line-clamp-1">
                        Passage: {question.passage_text.substring(0, 100)}...
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-[var(--nav-text-color)]">
                      <span>ID: {question.qid}</span>
                      {isAttempted && (
                        <span className={`px-2 py-1 rounded ${
                          isCorrect ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                   : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-[var(--nav-text-color)]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[var(--nav-text-color)] text-lg">No questions found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Practice;