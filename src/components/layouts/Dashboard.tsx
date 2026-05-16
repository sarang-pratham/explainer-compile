import React from 'react';

export interface DashboardProps {
  title?: string;
  subtitle?: string;
  layout?: 'stacked' | 'asymmetric';
  children: React.ReactNode;
}

export const Dashboard: React.FC<DashboardProps> = ({ title, subtitle, layout = 'stacked', children }) => (
  <div className="w-full min-h-screen flex flex-col p-6 md:p-10 relative overflow-hidden bg-tone-bg text-gray-300">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
    <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-8 flex-1">
      {(title || subtitle) && (
        <header className="border-b border-tone-boundary pb-8 mb-4">
          {title && <h1 className="text-4xl font-bold tracking-tight text-white m-0 font-['Geist']">{title}</h1>}
          {subtitle && <p className="text-tone-cyan mt-3 text-lg">{subtitle}</p>}
        </header>
      )}
      <main className={`flex-1 w-full ${layout === 'asymmetric' ? 'flex flex-col xl:flex-row gap-10' : 'flex flex-col'}`}>
        {children}
      </main>
    </div>
  </div>
);
