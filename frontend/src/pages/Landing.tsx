import React from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  return (
    <main className="flex flex-1 items-center justify-center pt-16">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-[var(--text-color)] sm:text-5xl lg:text-6xl">
            Welcome to <span className="text-primary-500">StudySmart</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-[var(--nav-text-color)]">
            Prepare for your exams with our comprehensive question banks and insightful analytics. Start your journey to success today!
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link 
              to="/search"
              className="inline-flex w-full items-center justify-center rounded-lg bg-primary-600 px-8 py-3 text-base font-semibold text-white shadow-sm transition-transform hover:scale-105 hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 sm:w-auto"
            >
              Get Started for Free
            </Link>
            <Link 
              to="/practice"
              className="inline-flex w-full items-center justify-center rounded-lg border border-[var(--border-color)] bg-transparent px-8 py-3 text-base font-semibold text-[var(--text-color)] shadow-sm transition-transform hover:scale-105 hover:bg-[var(--btn-secondary-hover-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 sm:w-auto"
            >
              Start Practice
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Landing;