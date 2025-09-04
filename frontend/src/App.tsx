import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { DataProvider } from './contexts/DataContext.tsx';
import Header from './components/Header.tsx';
import Landing from './pages/Landing.tsx';
import Practice from './pages/Practice.tsx';
import Question from './pages/Question.tsx';
import Analytics from './pages/Analytics.tsx';
import Settings from './pages/Settings.tsx';
import Search from './pages/Search.tsx';
import Community from './pages/Community.tsx';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300">
            <div className="relative min-h-screen overflow-hidden">
              {/* Dark mode background animation */}
              <div className="absolute inset-0 -z-10 hidden dark:block">
                <div className="stars"></div>
                <div className="twinkling"></div>
              </div>
              
              <Header />
              
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/search" element={<Search />} />
                <Route path="/practice" element={<Practice />} />
                <Route path="/practice/:subject" element={<Practice />} />
                <Route path="/question/:subject/:id" element={<Question />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/community" element={<Community />} />
              </Routes>
            </div>
          </div>
        </Router>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;