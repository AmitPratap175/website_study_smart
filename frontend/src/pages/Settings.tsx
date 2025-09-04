import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Settings: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    notifications: {
      push: true,
      email: false
    },
    advanced: {
      adaptiveLearning: true,
      smartReminders: false,
      offlineMode: true,
      spaceAnimation: true
    },
    animationSpeed: 50,
    elementDensity: 50,
    visualStyle: 'Classic Stars'
  });

  const [showResetModal, setShowResetModal] = useState(false);

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...(prev[category as keyof typeof prev] || {}),
        [key]: value
      }
    }));
  };

  const handleResetProgress = () => {
    localStorage.removeItem('userProgress');
    setShowResetModal(false);
    // Reload the page to reset the state
    window.location.reload();
  };

  return (
    <main className="flex-1 px-40 py-10 pt-24">
      <div className="mx-auto max-w-[960px]">
        <div className="flex justify-between items-center p-4 mb-8">
          <p className="text-4xl font-bold leading-tight text-[var(--text-color)]">Settings</p>
          <button 
            onClick={toggleTheme}
            className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors bg-[var(--surface-secondary)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
              isDark ? 'translate-x-6' : 'translate-x-1'
            }`}></span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {/* Account Section */}
          <div>
            <h3 className="text-xl font-bold leading-tight tracking-[-0.015em] px-4 pb-4 text-[var(--text-color)]">
              Account
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-4 rounded-md bg-[var(--surface-color)] p-4 justify-between hover:bg-[var(--surface-secondary)] transition-colors cursor-pointer">
                <div className="flex flex-col justify-center">
                  <p className="text-base font-medium leading-normal text-[var(--text-color)]">Name</p>
                  <p className="text-sm font-normal leading-normal text-[var(--nav-text-color)]">StudySmart User</p>
                </div>
                <div className="text-[var(--nav-text-color)]">
                  <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px">
                    <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                  </svg>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-md bg-[var(--surface-color)] p-4 justify-between hover:bg-[var(--surface-secondary)] transition-colors cursor-pointer">
                <div className="flex flex-col justify-center">
                  <p className="text-base font-medium leading-normal text-[var(--text-color)]">Email</p>
                  <p className="text-sm font-normal leading-normal text-[var(--nav-text-color)]">user@studysmart.com</p>
                </div>
                <div className="text-[var(--nav-text-color)]">
                  <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px">
                    <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                  </svg>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-md bg-[var(--surface-color)] p-4 justify-between hover:bg-[var(--surface-secondary)] transition-colors cursor-pointer">
                <div className="flex flex-col justify-center">
                  <p className="text-base font-medium leading-normal text-[var(--text-color)]">Password</p>
                  <p className="text-sm font-normal leading-normal text-[var(--nav-text-color)]">********</p>
                </div>
                <div className="text-[var(--nav-text-color)]">
                  <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px">
                    <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* App Settings */}
          <div>
            <h3 className="text-xl font-bold leading-tight tracking-[-0.015em] px-4 pb-4 text-[var(--text-color)]">
              App Settings
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-4 rounded-md bg-[var(--surface-color)] p-4 justify-between hover:bg-[var(--surface-secondary)] transition-colors cursor-pointer">
                <div className="flex flex-col justify-center">
                  <p className="text-base font-medium leading-normal text-[var(--text-color)]">Language</p>
                  <p className="text-sm font-normal leading-normal text-[var(--nav-text-color)]">English</p>
                </div>
                <div className="text-[var(--nav-text-color)]">
                  <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px">
                    <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                  </svg>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-md bg-[var(--surface-color)] p-4 justify-between">
                <div className="flex flex-col justify-center">
                  <p className="text-base font-medium leading-normal text-[var(--text-color)]">Theme</p>
                  <p className="text-sm font-normal leading-normal text-[var(--nav-text-color)]">
                    {isDark ? 'Dark' : 'Light'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div>
            <h3 className="text-xl font-bold leading-tight tracking-[-0.015em] px-4 pb-4 text-[var(--text-color)]">
              Notifications
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-4 rounded-md bg-[var(--surface-color)] p-4 justify-between">
                <div className="flex flex-col justify-center">
                  <p className="text-base font-medium leading-normal text-[var(--text-color)]">Push Notifications</p>
                  <p className="text-sm font-normal leading-normal text-[var(--nav-text-color)]">
                    {settings.notifications.push ? 'On' : 'Off'}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.notifications.push}
                    onChange={(e) => updateSetting('notifications', 'push', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-[var(--surface-secondary)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                </label>
              </div>
              <div className="flex items-center gap-4 rounded-md bg-[var(--surface-color)] p-4 justify-between">
                <div className="flex flex-col justify-center">
                  <p className="text-base font-medium leading-normal text-[var(--text-color)]">Email Notifications</p>
                  <p className="text-sm font-normal leading-normal text-[var(--nav-text-color)]">
                    {settings.notifications.email ? 'On' : 'Off'}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.notifications.email}
                    onChange={(e) => updateSetting('notifications', 'email', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-[var(--surface-secondary)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Advanced Options */}
          <div>
            <h3 className="text-xl font-bold leading-tight tracking-[-0.015em] px-4 pb-4 text-[var(--text-color)]">
              Advanced Options
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-md bg-[var(--surface-color)] p-4">
                <div className="flex flex-col">
                  <p className="text-base font-medium text-[var(--text-color)]">Adaptive Learning</p>
                  <p className="text-sm text-[var(--nav-text-color)]">Adjusts question difficulty based on your performance.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.advanced.adaptiveLearning}
                    onChange={(e) => updateSetting('advanced', 'adaptiveLearning', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-[var(--surface-secondary)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between rounded-md bg-[var(--surface-color)] p-4">
                <div className="flex flex-col">
                  <p className="text-base font-medium text-[var(--text-color)]">Smart Reminders</p>
                  <p className="text-sm text-[var(--nav-text-color)]">Sends notifications for topics you need to review.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.advanced.smartReminders}
                    onChange={(e) => updateSetting('advanced', 'smartReminders', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-[var(--surface-secondary)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between rounded-md bg-[var(--surface-color)] p-4">
                <div className="flex flex-col">
                  <p className="text-base font-medium text-[var(--text-color)]">Offline Mode</p>
                  <p className="text-sm text-[var(--nav-text-color)]">Download question banks for offline access.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.advanced.offlineMode}
                    onChange={(e) => updateSetting('advanced', 'offlineMode', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-[var(--surface-secondary)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between rounded-md bg-[var(--surface-color)] p-4">
                <div className="flex flex-col">
                  <p className="text-base font-medium text-[var(--text-color)]">Reset Progress</p>
                  <p className="text-sm text-[var(--nav-text-color)]">Clear all your performance data and start fresh.</p>
                </div>
                <button 
                  onClick={() => setShowResetModal(true)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-bold transition-colors"
                >
                  Reset
                </button>
              </div>

              {isDark && (
                <div className="flex flex-col justify-between rounded-md bg-[var(--surface-color)] p-4 gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <p className="text-base font-medium text-[var(--text-color)]">Space Animation</p>
                      <p className="text-sm text-[var(--nav-text-color)]">Customize the dark mode background animation.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={settings.advanced.spaceAnimation}
                        onChange={(e) => updateSetting('advanced', 'spaceAnimation', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-[var(--surface-secondary)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                  
                  {settings.advanced.spaceAnimation && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[var(--nav-text-color)]">Animation Speed</label>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={settings.animationSpeed}
                          onChange={(e) => setSettings(prev => ({ ...prev, animationSpeed: parseInt(e.target.value) }))}
                          className="w-full h-2 bg-[var(--surface-secondary)] rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[var(--nav-text-color)]">Element Density</label>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={settings.elementDensity}
                          onChange={(e) => setSettings(prev => ({ ...prev, elementDensity: parseInt(e.target.value) }))}
                          className="w-full h-2 bg-[var(--surface-secondary)] rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[var(--nav-text-color)]">Visual Style</label>
                        <select 
                          value={settings.visualStyle}
                          onChange={(e) => setSettings(prev => ({ ...prev, visualStyle: e.target.value }))}
                          className="block w-full px-3 py-2 text-sm bg-[var(--surface-secondary)] border border-[var(--border-color)] rounded-md text-[var(--text-color)] focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        >
                          <option>Classic Stars</option>
                          <option>Cosmic Dust</option>
                          <option>Nebula Clouds</option>
                          <option>Galactic Voyage</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-bold leading-tight tracking-[-0.015em] px-4 pb-4 text-[var(--text-color)]">
              Support
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-4 rounded-md bg-[var(--surface-color)] p-4 justify-between hover:bg-[var(--surface-secondary)] transition-colors cursor-pointer">
                <p className="text-base font-normal leading-normal text-[var(--text-color)]">Help Center</p>
                <div className="text-[var(--nav-text-color)]">
                  <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px">
                    <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                  </svg>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-md bg-[var(--surface-color)] p-4 justify-between hover:bg-[var(--surface-secondary)] transition-colors cursor-pointer">
                <p className="text-base font-normal leading-normal text-[var(--text-color)]">Contact Us</p>
                <div className="text-[var(--nav-text-color)]">
                  <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px">
                    <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                  </svg>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-md bg-[var(--surface-color)] p-4 justify-between hover:bg-[var(--surface-secondary)] transition-colors cursor-pointer">
                <p className="text-base font-normal leading-normal text-[var(--text-color)]">Terms of Service</p>
                <div className="text-[var(--nav-text-color)]">
                  <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px">
                    <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                  </svg>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-md bg-[var(--surface-color)] p-4 justify-between hover:bg-[var(--surface-secondary)] transition-colors cursor-pointer">
                <p className="text-base font-normal leading-normal text-[var(--text-color)]">Privacy Policy</p>
                <div className="text-[var(--nav-text-color)]">
                  <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px">
                    <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Log Out Button */}
        <div className="px-4 py-8">
          <button className="bg-[var(--surface-secondary)] hover:bg-[var(--btn-secondary-hover-bg)] text-[var(--text-color)] px-6 py-3 rounded-md font-bold transition-colors">
            Log Out
          </button>
        </div>
      </div>

      {/* Reset Progress Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-[var(--surface-color)] rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900">
                <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-medium leading-6 text-[var(--text-color)]">Reset Progress</h3>
              <div className="mt-2">
                <p className="text-sm text-[var(--nav-text-color)]">
                  Are you sure you want to reset your progress? All of your performance data will be permanently deleted. This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <button 
                onClick={handleResetProgress}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm"
              >
                Reset
              </button>
              <button 
                onClick={() => setShowResetModal(false)}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-[var(--border-color)] shadow-sm px-4 py-2 bg-[var(--surface-color)] text-base font-medium text-[var(--text-color)] hover:bg-[var(--surface-secondary)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:col-start-1 sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Settings;