import React from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';

const SearchPage: React.FC = () => {
  return (
    <Layout>
      <Header />
      <main className="flex flex-1 flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl">Choose Your Path to Success</h2>
          <p className="mt-4 text-xl text-[var(--text-secondary)]">Select your target exam and let's begin your journey.</p>
        </div>
        <div className="mt-12 flex w-full max-w-3xl flex-col items-center gap-6">
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <svg className="h-5 w-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
              </svg>
            </div>
            <input className="form-input w-full rounded-full border-[var(--border-color)] bg-gray-100 dark:bg-gray-800 py-3 pl-12 pr-4 text-base text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:border-primary-color focus:ring-primary-color" placeholder="Search for exam sections (e.g., Verbal Ability, Quantitative Aptitude)" type="search" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-sm font-medium text-[var(--text-secondary)]">Popular filters:</span>
            <button className="rounded-full border border-primary-color bg-primary-color/10 px-4 py-1.5 text-sm font-semibold text-primary-color transition-colors hover:bg-primary-color/20">All Exams</button>
            <button className="rounded-full border border-[var(--border-color)] px-4 py-1.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:border-primary-color hover:text-primary-color">CAT Sections</button>
            <button className="rounded-full border border-[var(--border-color)] px-4 py-1.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:border-primary-color hover:text-primary-color">GATE Sections</button>
          </div>
        </div>
        <div className="mt-12 grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
          {/* Exam cards would be components */}
        </div>
      </main>
    </Layout>
  );
};

export default SearchPage;
