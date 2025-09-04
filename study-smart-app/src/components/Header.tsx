import React from 'react';
import { Link } from 'react-router-dom';
import useTheme from '../hooks/useTheme';

const Header: React.FC = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--header-bg)] backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <div className="text-primary-600 h-8 w-8">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <h2 className="text-xl font-bold tracking-tighter text-[var(--text-color)]">StudySmart</h2>
            </Link>
          </div>
          <nav className="hidden items-center gap-8 text-sm font-medium text-[var(--nav-text-color)] lg:flex">
            <Link className="transition-colors hover:text-primary-500" to="/analytics">Analytics</Link>
            <Link className="transition-colors hover:text-primary-500" to="/community">Community</Link>
            <Link className="transition-colors hover:text-primary-500" to="/settings">Settings</Link>
          </nav>
          <div className="flex items-center gap-2">
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-transparent text-[var(--nav-text-color)] transition-colors hover:bg-[var(--btn-secondary-hover-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              onClick={toggleTheme}
            >
              <span className="material-symbols-outlined block dark:hidden">dark_mode</span>
              <span className="material-symbols-outlined hidden dark:block">light_mode</span>
            </button>
            <button className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary-600 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
              Sign Up
            </button>
            <button className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-[var(--btn-secondary-bg)] px-4 text-sm font-semibold text-[var(--btn-secondary-text)] transition-colors hover:bg-[var(--btn-secondary-hover-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2">
              Log In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
