import React from 'react';

const Community: React.FC = () => {
  const features = [
    {
      icon: '📤',
      title: 'Upload',
      description: 'Upload your study materials, practice questions, and insights to enrich our shared knowledge base.',
      color: 'bg-blue-500'
    },
    {
      icon: '🔍',
      title: 'Review',
      description: 'Review and refine existing content to ensure accuracy and relevance for all users.',
      color: 'bg-green-500'
    },
    {
      icon: '⭐',
      title: 'Earn Stars',
      description: 'Get recognition for your contributions and build your reputation in the community.',
      color: 'bg-yellow-500'
    },
    {
      icon: '🏆',
      title: 'Compete',
      description: 'Participate in leaderboards and compete with fellow learners to stay motivated.',
      color: 'bg-purple-500'
    }
  ];

  const benefits = [
    { icon: '🏆', label: 'Levels' },
    { icon: '🥇', label: 'Badges' },
    { icon: '👥', label: 'Leaderboards' },
    { icon: '🎁', label: 'Benefits' }
  ];

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#111118] text-white overflow-x-hidden pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#111118] via-[#111118] to-indigo-900/30 opacity-50"></div>
        <div className="absolute top-1/4 left-1/4 size-96 animate-pulse rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 size-96 animate-pulse rounded-full bg-purple-500/10 blur-3xl"></div>
      </div>

      <div className="layout-container flex h-full grow flex-col z-10">
        <main className="px-4 md:px-20 flex flex-1 justify-center py-16">
          <div className="layout-content-container flex flex-col max-w-5xl flex-1 gap-12">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <h1 className="text-white tracking-tight text-4xl md:text-5xl font-bold leading-tight">
                About Our <span className="text-[#1919e6]">Community</span>
              </h1>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                Discover the 'Learn More, Earn More' initiative. It's our way of building a collaborative space where your knowledge helps everyone, and your contributions are rewarded.
              </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* How Contributions Work */}
              <div className="perspective">
                <div className="card rounded-2xl bg-[#1a1a24]/80 p-8 border border-white/10 shadow-lg shadow-blue-500/5 backdrop-blur-sm">
                  <h3 className="text-white tracking-light text-2xl font-bold leading-tight mb-6">
                    How Contributions Work
                  </h3>
                  <div className="space-y-6">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className={`${feature.color} flex items-center justify-center rounded-lg shrink-0 size-12 text-2xl`}>
                          {feature.icon}
                        </div>
                        <div>
                          <p className="text-white text-lg font-medium leading-normal mb-2">
                            {feature.title}
                          </p>
                          <p className="text-gray-300 text-sm font-normal leading-normal">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* The Star System */}
              <div className="perspective">
                <div className="card rounded-2xl bg-[#1a1a24]/80 p-8 border border-white/10 shadow-lg shadow-purple-500/5 backdrop-blur-sm">
                  <h3 className="text-white tracking-light text-2xl font-bold leading-tight mb-4">
                    The Star System
                  </h3>
                  <p className="text-gray-300 text-sm font-normal leading-normal mb-6">
                    Earn stars for every contribution. Stars measure your reputation and impact. The more you earn, the more benefits you unlock.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="text-yellow-400 size-6 text-2xl">
                          {benefit.icon}
                        </div>
                        <span className="text-white text-sm">{benefit.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Community Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-6 rounded-2xl bg-[#1a1a24]/80 border border-white/10">
                <div className="text-4xl font-bold text-[#1919e6] mb-2">2,500+</div>
                <div className="text-gray-300">Active Contributors</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-[#1a1a24]/80 border border-white/10">
                <div className="text-4xl font-bold text-[#1919e6] mb-2">15,000+</div>
                <div className="text-gray-300">Questions Contributed</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-[#1a1a24]/80 border border-white/10">
                <div className="text-4xl font-bold text-[#1919e6] mb-2">98%</div>
                <div className="text-gray-300">Quality Rating</div>
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="rounded-2xl bg-[#1a1a24]/80 p-8 border border-white/10">
              <h3 className="text-white text-2xl font-bold mb-6">Community Guidelines</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-3">✅ Do's</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Share accurate and helpful content</li>
                    <li>• Respect other community members</li>
                    <li>• Provide constructive feedback</li>
                    <li>• Follow quality standards</li>
                    <li>• Credit original sources</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-3">❌ Don'ts</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Post copyrighted material without permission</li>
                    <li>• Share incorrect or misleading information</li>
                    <li>• Engage in spam or promotional content</li>
                    <li>• Use inappropriate language</li>
                    <li>• Violate community standards</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contribution Levels */}
            <div className="rounded-2xl bg-[#1a1a24]/80 p-8 border border-white/10">
              <h3 className="text-white text-2xl font-bold mb-6">Contributor Levels</h3>
              <div className="grid gap-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-[#2a2a2a]/50">
                  <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Beginner (0-100 stars)</h4>
                    <p className="text-gray-400 text-sm">Start your journey with basic contributions</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-[#2a2a2a]/50">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Contributor (100-500 stars)</h4>
                    <p className="text-gray-400 text-sm">Regular contributor with quality content</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-[#2a2a2a]/50">
                  <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Expert (500-1000 stars)</h4>
                    <p className="text-gray-400 text-sm">Recognized expert with high-quality contributions</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-[#2a2a2a]/50">
                  <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Master (1000+ stars)</h4>
                    <p className="text-gray-400 text-sm">Top-tier contributor with exceptional impact</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-[#1919e6] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-500/50 mx-auto">
                <span className="truncate">Start Contributing Now</span>
              </button>
              <p className="text-gray-400 text-sm mt-4">
                Join thousands of learners building the future of education together
              </p>
            </div>
          </div>
        </main>
      </div>


    </div>
  );
};

export default Community;