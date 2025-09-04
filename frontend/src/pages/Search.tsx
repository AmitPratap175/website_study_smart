import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const examSections = [
    {
      name: 'CAT',
      fullName: 'Common Admission Test',
      subjects: ['quant', 'varc', 'dilr'],
      description: 'Quantitative Aptitude, Verbal Ability & Reading Comprehension, Data Interpretation & Logical Reasoning',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCC8erT2xywYxUqBs6wbk4-BUexX9velUZQ1EW9GSEZhQ7_Ndbtqaimrk9EL0HUx339yCD_MhW6UraX82icS77IIUAVhNUDV9ytpdv716xNDeNE7Cgp4aM83KbucYqCmdjAstMjJ8pbyZyYaknSNIkYzHcolQROTT2BRQvbStG0lWZ2Bu7isZyEiGNCWg-YrvdjgzsJNZlNgfBY4QM5M6862ZDwkbx3k1138zqX1klClpJoR8r7xGa404Dz-gnn4FOxgaKv8QW-dho'
    },
    {
      name: 'XAT',
      fullName: 'Xavier Aptitude Test',
      subjects: ['quant', 'varc', 'dilr', 'decision-making'],
      description: 'Quantitative Aptitude, Verbal Ability, Data Interpretation, Decision Making',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkf7_1ChtNSljZ8gdDs0J58vnCQsHHAk1zEZHRv0GermIbOL6Vrjck_y6M6bFz7ic_B7cT60ZsscuMCU3-10yqanULQl1YymaD1XRAMcNToPwRiM6okwH732BK5BUboSJhRmxv5YoVa0OMWgd8QTP4-QyeiS_gavhn-ulBb5bY48Xi_4It0gI24AMdCrpl3sDVTjQ-60-6o-rpAZ17Wx6hXRdm1w4EFupgv8imy-VTywq_0WEB-ldft2IwaEcN2A7E73OhIuv0ONg'
    }
  ];

  const subjectDetails = {
    quant: { name: 'Quantitative Aptitude', icon: '📊' },
    varc: { name: 'Verbal Ability & Reading Comprehension', icon: '📚' },
    dilr: { name: 'Data Interpretation & Logical Reasoning', icon: '🧩' },
    'decision-making': { name: 'Decision Making', icon: '🎯' },
    essay: { name: 'Essay Writing', icon: '✍️' }
  };

  return (
    <main className="flex flex-1 flex-col items-center py-8 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="w-full max-w-5xl text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-[var(--text-color)] sm:text-5xl">
          Choose Your Path to Success
        </h2>
        <p className="mt-4 text-xl text-[var(--nav-text-color)]">
          Select your target exam and let's begin your journey.
        </p>
      </div>

      <div className="mt-12 flex w-full max-w-3xl flex-col items-center gap-6">
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <svg className="h-5 w-5 text-[var(--nav-text-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
          </div>
          <input
            className="w-full rounded-full border-[var(--border-color)] bg-[var(--surface-secondary)] py-3 pl-12 pr-4 text-base text-[var(--text-color)] placeholder:text-[var(--nav-text-color)] focus:border-primary-500 focus:ring-primary-500 focus:outline-none"
            placeholder="Search for exam sections (e.g., Verbal Ability, Quantitative Aptitude)"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <span className="text-sm font-medium text-[var(--nav-text-color)]">Popular filters:</span>
          <button className="rounded-full border border-primary-500 bg-primary-500/10 px-4 py-1.5 text-sm font-semibold text-primary-500 transition-colors hover:bg-primary-500/20">
            All Exams
          </button>
          <button className="rounded-full border border-[var(--border-color)] px-4 py-1.5 text-sm font-medium text-[var(--nav-text-color)] transition-colors hover:border-primary-500 hover:text-primary-500">
            CAT Sections
          </button>
          <button className="rounded-full border border-[var(--border-color)] px-4 py-1.5 text-sm font-medium text-[var(--nav-text-color)] transition-colors hover:border-primary-500 hover:text-primary-500">
            XAT Sections
          </button>
        </div>
      </div>

      <div className="mt-12 grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
        {examSections.map((exam) => (
          <div key={exam.name} className="group relative flex transform flex-col items-center justify-center overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--surface-color)] p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-500/30">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20 transition-opacity duration-300 group-hover:opacity-30"
              style={{ backgroundImage: `url("${exam.image}")` }}
            ></div>
            <div className="relative z-10 text-center">
              <h3 className="text-4xl font-bold text-[var(--text-color)]">{exam.name}</h3>
              <p className="mt-2 text-lg text-[var(--nav-text-color)]">{exam.fullName}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {exam.subjects.map((subject) => (
                  <Link
                    key={subject}
                    to={`/practice/${subject}`}
                    className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-3 py-1 text-sm font-medium text-primary-500 hover:bg-primary-500/20 transition-colors"
                  >
                    <span>{subjectDetails[subject as keyof typeof subjectDetails]?.icon}</span>
                    {subjectDetails[subject as keyof typeof subjectDetails]?.name}
                  </Link>
                ))}
              </div>
              <Link
                to={`/practice/${exam.subjects[0]}`}
                className="mt-6 inline-flex items-center rounded-full bg-primary-500 px-8 py-3 text-lg font-bold text-white transition-transform duration-300 group-hover:scale-105 hover:bg-primary-600"
              >
                Start Preparing
                <svg className="ml-2 -mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path clipRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" fillRule="evenodd"></path>
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Individual Subjects Section */}
      <div className="mt-12 w-full max-w-6xl">
        <h3 className="text-2xl font-bold text-[var(--text-color)] text-center mb-8">
          Practice by Subject
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(subjectDetails).map(([key, subject]) => (
            <Link
              key={key}
              to={`/practice/${key}`}
              className="group block p-6 rounded-lg border border-[var(--border-color)] bg-[var(--surface-color)] hover:bg-[var(--surface-secondary)] transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{subject.icon}</span>
                <div>
                  <h4 className="font-semibold text-[var(--text-color)] group-hover:text-primary-500 transition-colors">
                    {subject.name}
                  </h4>
                  <p className="text-sm text-[var(--nav-text-color)]">Start practicing</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Search;