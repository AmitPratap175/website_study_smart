import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import QuestionComponent from '../components/Question';
import { Question } from '../types';
import questionsData from '../data/final_quant.json';

const StudySessionPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    setQuestions(questionsData.questions);
  }, []);

  return (
    <Layout>
      <Header />
      <main className="flex flex-1 items-center justify-center pt-16">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-[var(--text-color)] sm:text-5xl lg:text-6xl mb-8">
            Study Session
          </h1>
          <div>
            {questions.map((question) => (
              <QuestionComponent key={question.qid} question={question} />
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default StudySessionPage;
