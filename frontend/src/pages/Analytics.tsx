import React from 'react';
import { useData } from '../contexts/DataContext';

const Analytics: React.FC = () => {
  const { questions, userProgress } = useData();

  // Calculate overall statistics
  const calculateStats = () => {
    const allQuestions = Object.values(questions).flat();
    const totalQuestions = allQuestions.length;
    const attemptedQuestions = Object.keys(userProgress.answered).length;
    const correctAnswers = allQuestions.filter(q => 
      userProgress.answered[q.qid] === q.correct_option_data
    ).length;

    const accuracy = attemptedQuestions > 0 ? Math.round((correctAnswers / attemptedQuestions) * 100) : 0;
    const progress = totalQuestions > 0 ? Math.round((attemptedQuestions / totalQuestions) * 100) : 0;

    return { totalQuestions, attemptedQuestions, correctAnswers, accuracy, progress };
  };

  // Calculate subject-wise performance
  const calculateSubjectStats = () => {
    const subjects = ['quant', 'varc', 'dilr', 'decision-making', 'essay'];
    return subjects.map(subject => {
      const subjectQuestions = questions[subject] || [];
      const attempted = subjectQuestions.filter(q => userProgress.answered[q.qid]).length;
      const correct = subjectQuestions.filter(q => 
        userProgress.answered[q.qid] === q.correct_option_data
      ).length;
      
      return {
        subject,
        name: getSubjectName(subject),
        total: subjectQuestions.length,
        attempted,
        correct,
        accuracy: attempted > 0 ? Math.round((correct / attempted) * 100) : 0,
        progress: subjectQuestions.length > 0 ? Math.round((attempted / subjectQuestions.length) * 100) : 0
      };
    });
  };

  const getSubjectName = (subject: string) => {
    const names: Record<string, string> = {
      'quant': 'Quantitative Aptitude',
      'varc': 'Verbal Ability & RC',
      'dilr': 'Data Interpretation & LR',
      'decision-making': 'Decision Making',
      'essay': 'Essay Writing'
    };
    return names[subject] || subject;
  };

  const stats = calculateStats();
  const subjectStats = calculateSubjectStats();

  // Mock leaderboard data
  const leaderboard = [
    { name: 'Alex Johnson', points: 9850, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXG3HpcUkA4JXD_ZKZ4PmB-YVz_EELsqchaweeBsfZEyPFR5WpbR5p-nou-2PcuHTjdxXibtT5eNTbERiTWCkx9hJg-pVCdNTT9QV8f-69PJVXcL6ksuX-IU5yVVvtukuuGwu7sH_VcWLHanaFylaZ96S7RqbmnfxKgddwkDeXvCDU38xmWXoANrzUdmiJIpyAHZ4lb_Nprv1frUjGeZjVsT4wcOfMYo5LMGAkRGw8B0vH_2fSX0OqgRsXkBwPxehPvrN9ivXx1kI' },
    { name: 'Maria Garcia', points: 9520, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABEUd3Huwrrf0kGTV_CapMtq1q9WwQP2W8PI8v8Mt4_QhawK2M-PafQfSURtpljqAlKsNEgQEhFPbyuzO9skY8mSGmOZ7guuTT9wP-uzfFLpoKw_vKGdIoGnEYWRhXfhAM6ra-umxz8D0an1SNp73ZGOMIj9bP4fap4cgUPUv8w9tQGU7sicsqaMB3sZC2Y1Bk6jb3j1x0mKAFxX6Aq5RyTJW-0W6nzAty5HsQeb0id06bRAZlcPJNgm-siZ2HvgNQSkA3FcRw8_w' },
    { name: 'You', points: stats.correctAnswers * 10, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQJsmk962JOe-1oNcudl0YABQQtu5ROGcMAg-FkPbmSbIGpkhsqKP_gmUAuwRf0ySUQEFg811vSfd1fcx4t2SZsPpGrp27igMwZMwQgmgVungr2nBUO65bcDlpD4pSKNYYnfq4Z2gUoOWN5Pv2_H77VZuqHLTPFE5RTSlLj4Uk65oKb-OifjgDAlf2KVLW8GnWxgWpb9CyZP7FrTnjqKoZKTTQ4BRHcvfzjU0s8uX2FHJQI_YKHMXwoqdoLoo0vU4LxdzNzTL_90U' },
    { name: 'Chen Wei', points: 8980, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKg_o_ujW1VYwpnI3vdOlmCTcKaIOxdePC6Fj7x3kGb9Pumr8wuf78hUoa4J3EXfiNCjxwFjM23Vxmk4K6nf0gm04QG9bd0metOsFe8nv9gaNHi1ckVNWlSPKm2I6npNfHIt0ueu7t1m7aUApWzwwv0O88nMYNfjgld08xfQXlYWZgyxJDWZsCtiX7SqNQwfLLHwADWR3LsFt3SWsOrANzU7FlaiNLFm95ADSyJ4Yl7gR7YrL7lYcwb7xP47WapVVdr_7WnUWz1Q4' }
  ];

  // Mock achievements
  const achievements = [
    { title: 'First Steps', description: 'Completed 1st test', icon: '⭐', unlocked: stats.attemptedQuestions > 0 },
    { title: 'Night Owl', description: 'Studied past midnight', icon: '🌙', unlocked: false },
    { title: 'Consistency King', description: '7 days in a row', icon: '📈', unlocked: false },
    { title: 'Speed Demon', description: 'Answered 50 questions in a day', icon: '⚡', unlocked: stats.attemptedQuestions >= 50 },
    { title: 'Perfectionist', description: '100% accuracy in a subject', icon: '🎯', unlocked: subjectStats.some(s => s.accuracy === 100 && s.attempted >= 5) },
    { title: 'Scholar', description: 'Completed 100 questions', icon: '🎓', unlocked: stats.attemptedQuestions >= 100 }
  ];

  return (
    <main className="flex-1 px-10 py-8 pt-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-[var(--text-color)]">
            Analytics Dashboard
          </h1>
        </div>

        {/* Overall Progress Section */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 mb-8">
          <div className="flex flex-col gap-6 rounded-lg border border-[var(--border-color)] bg-[var(--surface-color)] p-6 shadow-lg lg:col-span-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-lg font-medium leading-normal text-[var(--nav-text-color)]">Overall Progress</p>
                <p className="text-6xl font-bold leading-tight tracking-tighter text-primary-500">{stats.progress}%</p>
              </div>
              <div className="flex items-center gap-2 text-lg font-medium">
                <span className="text-[var(--nav-text-color)]">Questions Attempted</span>
                <span className="text-green-500 text-xl font-bold flex items-center gap-1">
                  <svg className="feather feather-arrow-up-right" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
                    <line x1="7" x2="17" y1="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                  <span>{stats.attemptedQuestions}</span>
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--text-color)]">{stats.totalQuestions}</div>
                <div className="text-sm text-[var(--nav-text-color)]">Total Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--text-color)]">{stats.correctAnswers}</div>
                <div className="text-sm text-[var(--nav-text-color)]">Correct Answers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--text-color)]">{stats.accuracy}%</div>
                <div className="text-sm text-[var(--nav-text-color)]">Accuracy</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 rounded-lg border border-[var(--border-color)] bg-[var(--surface-color)] p-6 shadow-lg lg:col-span-2">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-lg font-medium leading-normal text-[var(--nav-text-color)]">Best Subject</p>
                <p className="text-4xl font-bold leading-tight tracking-tighter text-[var(--text-color)]">
                  {subjectStats.reduce((best, current) => 
                    current.accuracy > best.accuracy ? current : best, subjectStats[0]
                  )?.accuracy || 0}%
                </p>
              </div>
            </div>
            <div className="text-[var(--nav-text-color)]">
              {subjectStats.reduce((best, current) => 
                current.accuracy > best.accuracy ? current : best, subjectStats[0]
              )?.name || 'No data'}
            </div>
          </div>
        </div>

        {/* Subject Performance */}
        <div className="rounded-lg border border-[var(--border-color)] bg-[var(--surface-color)] p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-bold leading-tight tracking-tight mb-6 text-[var(--text-color)]">
            Subject Performance
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {subjectStats.map((subject) => (
              <div key={subject.subject} className="p-4 rounded-lg border border-[var(--border-color)] bg-[var(--surface-secondary)]">
                <h3 className="font-bold text-[var(--text-color)] mb-2">{subject.name}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-[var(--nav-text-color)]">Progress</span>
                    <span className="text-sm font-semibold text-[var(--text-color)]">{subject.progress}%</span>
                  </div>
                  <div className="w-full bg-[var(--surface-color)] rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${subject.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--nav-text-color)]">Accuracy: {subject.accuracy}%</span>
                    <span className="text-[var(--nav-text-color)]">{subject.correct}/{subject.attempted}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Recommendations */}
        <div className="rounded-lg border border-[var(--border-color)] bg-[var(--surface-color)] p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-bold leading-tight tracking-tight mb-6 text-[var(--text-color)]">
            Personalized Study Recommendations
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {subjectStats
              .filter(s => s.attempted > 0)
              .sort((a, b) => a.accuracy - b.accuracy)
              .slice(0, 3)
              .map((subject, index) => {
                const isWeakest = index === 0;
                const isStrongest = index === 2;
                return (
                  <div key={subject.subject} className="flex flex-col gap-4 rounded-lg border border-[var(--border-color)] bg-[var(--surface-secondary)] p-5">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        isWeakest ? 'bg-red-500/20 text-red-500' : 
                        isStrongest ? 'bg-green-500/20 text-green-500' : 
                        'bg-blue-500/20 text-blue-500'
                      }`}>
                        {isWeakest ? '⚠️' : isStrongest ? '🎯' : '📚'}
                      </div>
                      <div>
                        <h3 className="font-bold text-[var(--text-color)]">
                          {isWeakest ? 'Focus on' : isStrongest ? 'Excel in' : 'Improve'} {subject.name}
                        </h3>
                        <p className="text-sm text-[var(--nav-text-color)]">
                          {isWeakest ? 'Weakest Area' : isStrongest ? 'Strongest Area' : 'Moderate Area'}
                        </p>
                      </div>
                    </div>
                    <p className="text-[var(--nav-text-color)]">
                      {isWeakest 
                        ? `Your accuracy in ${subject.name} is ${subject.accuracy}%. Focus on fundamentals and practice more questions.`
                        : isStrongest 
                        ? `You're excelling with ${subject.accuracy}% accuracy. Try advanced questions to push further.`
                        : `Good progress with ${subject.accuracy}% accuracy. Consistent practice will improve your performance.`
                      }
                    </p>
                    <button className={`w-full rounded-md px-4 py-2 text-sm font-semibold text-white transition-colors ${
                      isWeakest ? 'bg-red-500 hover:bg-red-600' :
                      isStrongest ? 'bg-green-500 hover:bg-green-600' :
                      'bg-blue-500 hover:bg-blue-600'
                    }`}>
                      Practice {subject.name}
                    </button>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Leaderboard and Achievements */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-lg border border-[var(--border-color)] bg-[var(--surface-color)] p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold leading-tight tracking-tight text-[var(--text-color)]">
              Leaderboard
            </h2>
            <ul className="divide-y divide-[var(--border-color)]">
              {leaderboard.map((user, index) => (
                <li key={user.name} className={`flex items-center justify-between py-4 ${
                  user.name === 'You' ? 'bg-[var(--surface-secondary)] -mx-6 px-6 rounded-lg' : ''
                }`}>
                  <div className="flex items-center gap-4">
                    <span className={`text-lg font-bold ${
                      user.name === 'You' ? 'text-primary-500' : 'text-[var(--nav-text-color)]'
                    }`}>
                      {index + 1}
                    </span>
                    <img 
                      alt={`${user.name} avatar`}
                      className="h-10 w-10 rounded-full"
                      src={user.avatar}
                    />
                    <div>
                      <p className="font-semibold text-[var(--text-color)]">{user.name}</p>
                      <p className="text-sm text-[var(--nav-text-color)]">{user.points} Points</p>
                    </div>
                  </div>
                  <span className={`${
                    index === 0 ? 'text-yellow-400' :
                    index === 1 ? 'text-gray-400' :
                    user.name === 'You' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {index === 0 ? '👑' : index === 1 ? '🥈' : user.name === 'You' ? '⬆️' : '⬇️'}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold leading-tight tracking-tight mb-4 text-[var(--text-color)]">
                Achievements
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.title}
                    className={`flex flex-col items-center gap-3 rounded-lg border p-4 text-center shadow-lg transition-all ${
                      achievement.unlocked 
                        ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20' 
                        : 'border-[var(--border-color)] bg-[var(--surface-secondary)] opacity-60'
                    }`}
                  >
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl ${
                      achievement.unlocked 
                        ? 'bg-yellow-400/20 text-yellow-600' 
                        : 'bg-[var(--surface-color)] text-[var(--nav-text-color)]'
                    }`}>
                      {achievement.icon}
                    </div>
                    <h3 className={`text-base font-bold ${
                      achievement.unlocked ? 'text-yellow-800 dark:text-yellow-200' : 'text-[var(--text-color)]'
                    }`}>
                      {achievement.title}
                    </h3>
                    <p className={`text-xs ${
                      achievement.unlocked ? 'text-yellow-700 dark:text-yellow-300' : 'text-[var(--nav-text-color)]'
                    }`}>
                      {achievement.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Analytics;