import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';

const Question: React.FC = () => {
  const { subject, id } = useParams<{ subject: string; id: string }>();
  const { getQuestionsBySubject, userProgress, updateAnswer, markComplete } = useData();
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  const questions = getQuestionsBySubject(subject || '');
  const currentIndex = questions.findIndex(q => q.qid === id);
  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (currentQuestion && userProgress.answered[currentQuestion.qid]) {
      setSelectedAnswer(userProgress.answered[currentQuestion.qid]);
      setIsSubmitted(true);
    } else {
      setSelectedAnswer('');
      setIsSubmitted(false);
      setShowExplanation(false);
    }
  }, [currentQuestion, userProgress]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion]);

  useEffect(() => {
    setTimeSpent(0);
  }, [currentQuestion]);

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[var(--text-color)] mb-4">Question not found</h2>
          <button 
            onClick={() => navigate(`/practice/${subject}`)}
            className="text-primary-500 hover:text-primary-600"
          >
            Return to practice
          </button>
        </div>
      </div>
    );
  }

  const progress = Math.round(((currentIndex + 1) / questions.length) * 100);

  const handleAnswerSelect = (optionValue: string) => {
    if (!isSubmitted) {
      setSelectedAnswer(optionValue);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer && !isSubmitted) {
      updateAnswer(currentQuestion.qid, selectedAnswer);
      markComplete(currentQuestion.qid);
      setIsSubmitted(true);
      setShowExplanation(true);
    }
  };

  const navigateToQuestion = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < questions.length) {
      navigate(`/question/${subject}/${questions[newIndex].qid}`);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Header with Progress and Timer */}
      <div className="bg-[var(--surface-color)] border-b border-[var(--border-color)] sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(`/practice/${subject}`)}
                className="text-[var(--nav-text-color)] hover:text-[var(--text-color)] transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <div>
                <p className="text-sm font-medium text-[var(--nav-text-color)]">Question {currentIndex + 1} of {questions.length}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-40 rounded-full bg-[var(--surface-secondary)]">
                    <div 
                      className="h-2 rounded-full bg-primary-500 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm font-semibold text-[var(--text-color)]">{progress}%</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 rounded-lg bg-[var(--surface-secondary)] p-2">
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--text-color)]">{formatTime(timeSpent).split(':')[0]}</div>
                <div className="text-xs text-[var(--nav-text-color)]">MIN</div>
              </div>
              <div className="text-2xl font-bold text-[var(--nav-text-color)]">:</div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--text-color)]">{formatTime(timeSpent).split(':')[1]}</div>
                <div className="text-xs text-[var(--nav-text-color)]">SEC</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex text-sm mb-6">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <button 
                onClick={() => navigate(`/practice/${subject}`)}
                className="inline-flex items-center text-[var(--nav-text-color)] hover:text-primary-500"
              >
                Practice
              </button>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-[var(--nav-text-color)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="ml-1 font-medium text-[var(--text-color)] md:ml-2">Question {currentIndex + 1}</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Question Card */}
        <div className="rounded-lg border border-[var(--border-color)] bg-[var(--surface-color)] p-6 shadow-sm">
          {/* Passage */}
          {currentQuestion.passage_text && (
            <div className="mb-6 p-4 bg-[var(--surface-secondary)] rounded-lg">
              <h3 className="font-medium text-[var(--text-color)] mb-2">Passage:</h3>
              <p className="text-[var(--nav-text-color)] leading-relaxed">{currentQuestion.passage_text}</p>
            </div>
          )}

          {/* Question */}
          <h2 className="mb-6 text-xl font-bold leading-snug text-[var(--text-color)]">
            {currentQuestion.question_text}
          </h2>

          {/* Image if available */}
          {currentQuestion.image_url && (
            <div className="mb-6">
              <img 
                src={currentQuestion.image_url} 
                alt="Question diagram" 
                className="max-w-full h-auto rounded-lg border border-[var(--border-color)]"
              />
            </div>
          )}

          {/* Options */}
          {currentQuestion.options.length > 0 ? (
            <div className="space-y-4 mb-8">
              {currentQuestion.options.map((option) => {
                let optionClass = "radio-option flex cursor-pointer items-center gap-4 rounded-md border border-[var(--border-color)] p-4 transition-colors";
                
                if (isSubmitted) {
                  if (option.is_correct) {
                    optionClass = "radio-option radio-option-correct flex cursor-pointer items-center gap-4 rounded-md border border-green-500 bg-green-50 dark:bg-green-900/20 p-4 ring-2 ring-green-200 dark:ring-green-500/30";
                  } else if (selectedAnswer === option.data_option && !option.is_correct) {
                    optionClass = "radio-option radio-option-wrong flex cursor-pointer items-center gap-4 rounded-md border border-red-500 bg-red-50 dark:bg-red-900/20 p-4 ring-2 ring-red-200 dark:ring-red-500/30";
                  }
                }

                return (
                  <label key={option.data_option} className={optionClass}>
                    <input
                      className="radio-custom h-5 w-5 appearance-none rounded-full border-2 border-[var(--border-color)] bg-[var(--surface-color)] checked:border-primary-500 checked:bg-primary-500 focus:outline-none"
                      name="question-option"
                      type="radio"
                      value={option.data_option}
                      checked={selectedAnswer === option.data_option}
                      onChange={() => handleAnswerSelect(option.data_option)}
                      disabled={isSubmitted}
                    />
                    <span className="flex-grow text-sm font-medium text-[var(--text-color)]">
                      {option.label}. {option.option_text}
                    </span>
                    {isSubmitted && option.is_correct && (
                      <svg className="text-green-600 dark:text-green-400" fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    )}
                    {isSubmitted && selectedAnswer === option.data_option && !option.is_correct && (
                      <svg className="text-red-600 dark:text-red-400" fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20">
                        <line x1="18" x2="6" y1="6" y2="18"></line>
                        <line x1="6" x2="18" y1="6" y2="18"></line>
                      </svg>
                    )}
                  </label>
                );
              })}
            </div>
          ) : (
            <div className="mb-8 p-4 bg-[var(--surface-secondary)] rounded-lg">
              <p className="text-[var(--nav-text-color)] text-sm">
                This is a subjective question. Think about your answer and proceed to the next question.
              </p>
            </div>
          )}

          {/* Explanation */}
          {isSubmitted && showExplanation && currentQuestion.solution_text && (
            <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-500/30">
              <h3 className="font-medium text-blue-900 dark:text-blue-200 mb-2">Explanation:</h3>
              <p className="text-blue-800 dark:text-blue-300">{currentQuestion.solution_text}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="flex gap-4">
              <button
                onClick={() => navigateToQuestion('prev')}
                disabled={currentIndex === 0}
                className="flex items-center justify-center gap-2 rounded-md border border-[var(--border-color)] bg-[var(--surface-color)] px-4 py-2.5 text-sm font-bold text-[var(--text-color)] hover:bg-[var(--surface-secondary)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Previous
              </button>
              
              <button
                onClick={() => navigateToQuestion('next')}
                disabled={currentIndex === questions.length - 1}
                className="flex items-center justify-center gap-2 rounded-md border border-[var(--border-color)] bg-[var(--surface-color)] px-4 py-2.5 text-sm font-bold text-[var(--text-color)] hover:bg-[var(--surface-secondary)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>

            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className="w-full sm:w-auto rounded-md bg-primary-500 px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Answer
              </button>
            ) : (
              <div className="flex items-center gap-2 text-sm">
                {selectedAnswer === currentQuestion.correct_option_data ? (
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Correct Answer!
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    Incorrect Answer
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;