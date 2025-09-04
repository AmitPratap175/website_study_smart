import React from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';

const SettingsPage: React.FC = () => {
  return (
    <Layout>
      <Header />
      <main className="flex-1 px-40 py-10">
        <div className="mx-auto max-w-[960px]">
          <div className="flex justify-between items-center p-4">
            <p className="text-gray-900 dark:text-gray-200 text-4xl font-bold leading-tight">Settings</p>
            {/* Theme toggle button can be its own component */}
          </div>
          <div className="grid grid-cols-1 gap-12">
            {/* Account, App Settings, Notifications, Advanced Options, Support sections would be components */}
          </div>
          <div className="px-4 py-8">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 px-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <span className="truncate">Log Out</span>
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default SettingsPage;
