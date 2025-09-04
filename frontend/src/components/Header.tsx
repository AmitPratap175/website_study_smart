import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--header-bg)] backdrop-blur-md border-b border-[var(--border-color)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="text-primary-600 h-8 w-8">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold tracking-tighter text-[var(--text-color)]">StudySmart</h2>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[var(--nav-text-color)] lg:flex">
            <Link 
              to="/search"
              className={`transition-colors hover:text-primary-500 ${isActive('/search') ? 'text-primary-500 font-bold' : ''}`}
            >
              Exams
            </Link>
            <Link 
              to="/practice"
              className={`transition-colors hover:text-primary-500 ${isActive('/practice') ? 'text-primary-500 font-bold' : ''}`}
            >
              Practice
            </Link>
            <Link 
              to="/analytics"
              className={`transition-colors hover:text-primary-500 ${isActive('/analytics') ? 'text-primary-500 font-bold' : ''}`}
            >
              Analytics
            </Link>
            <Link 
              to="/community"
              className={`transition-colors hover:text-primary-500 ${isActive('/community') ? 'text-primary-500 font-bold' : ''}`}
            >
              Community
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <button 
              onClick={toggleTheme}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-transparent text-[var(--nav-text-color)] transition-colors hover:bg-[var(--btn-secondary-hover-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              <span className="material-symbols-outlined block dark:hidden">dark_mode</span>
              <span className="material-symbols-outlined hidden dark:block">light_mode</span>
            </button>
            
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-transparent text-[var(--nav-text-color)] transition-colors hover:bg-[var(--btn-secondary-hover-bg)] focus-visible:outline-none">
              <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg">
                <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
              </svg>
            </button>

            <Link to="/settings">
              <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCQJsmk962JOe-1oNcudl0YABQQtu5ROGcMAg-FkPbmSbIGpkhsqKP_gmUAuwRf0ySUQEFg811vSfd1fcx4t2SZsPpGrp27igMwZMwQgmgVungr2nBUO65bcDlpD4pSKNYYnfq4Z2gUoOWN5Pv2_H77VZuqHLTPFE5RTSlLj4Uk65oKb-OifjgDAlf2KVLW8GnWxgWpb9CyZP7FrTnjqKoZKTTQ4BRHcvfzjU0s8uX2FHJQI_YKHMXwoqdoLoo0vU4LxdzNzTL_90U")'}}></div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;