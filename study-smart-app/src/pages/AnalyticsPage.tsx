import React from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';

const AnalyticsPage: React.FC = () => {
  return (
    <Layout>
      <Header />
      <main className="flex-1 px-10 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-gray-900 text-4xl font-bold leading-tight tracking-tight dark:text-gray-100">Analytics Dashboard</h1>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            <div className="flex flex-col gap-6 rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:bg-gray-800 dark:border-gray-700 lg:col-span-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-lg font-medium leading-normal dark:text-gray-400">Overall Progress</p>
                  <p className="text-[var(--primary-color)] text-6xl font-bold leading-tight tracking-tighter">75%</p>
                </div>
                <div className="flex items-center gap-2 text-lg font-medium">
                  <span className="text-gray-500 dark:text-gray-400">Last 30 Days</span>
                  <span className="text-green-500 text-xl font-bold flex items-center gap-1">
                    <svg className="feather feather-arrow-up-right" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                      <line x1="7" x2="17" y1="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                    <span>+5%</span>
                  </span>
                </div>
              </div>
              <div className="flex min-h-[250px] flex-1 flex-col justify-end pt-4">
                {/* Chart placeholder */}
              </div>
            </div>
            <div className="flex flex-col gap-6 rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:bg-gray-800 dark:border-gray-700 lg:col-span-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-lg font-medium leading-normal dark:text-gray-400">Subject Scores</p>
                  <p className="text-gray-900 text-6xl font-bold leading-tight tracking-tighter dark:text-gray-100">82<span className="text-4xl">%</span></p>
                </div>
              </div>
              <div className="grid min-h-[250px] grid-flow-col auto-cols-fr gap-4 items-end justify-items-center px-3 pt-4">
                {/* Barchart placeholder */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default AnalyticsPage;
