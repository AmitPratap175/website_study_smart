import React from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';

const CommunityPage: React.FC = () => {
  return (
    <Layout>
      <Header />
      <main className="px-20 flex flex-1 justify-center py-16">
        <div className="layout-content-container flex flex-col max-w-5xl flex-1 gap-12">
          <div className="text-center space-y-4">
            <h1 className="text-white tracking-tight text-5xl font-bold leading-tight">
              About Our <span className="text-[var(--primary-color)]">Community</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Discover the 'Learn More, Earn More' initiative. It's our way of building a collaborative space where your knowledge helps everyone, and your contributions are rewarded.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Contribution and Star System cards would be components */}
          </div>
          <div className="text-center">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-[var(--primary-color)] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-500/50 mx-auto">
              <span className="truncate">Start Contributing Now</span>
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default CommunityPage;
