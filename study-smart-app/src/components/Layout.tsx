import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* The star background will be part of the layout */}
      <div className="absolute inset-0 -z-10 hidden dark:block">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>
      {/* Header will go here */}
      <main>{children}</main>
      {/* Footer will go here */}
    </div>
  );
};

export default Layout;
