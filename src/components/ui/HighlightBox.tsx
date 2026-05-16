import React from 'react';

export interface HighlightBoxProps {
  children: React.ReactNode;
  intent?: 'info' | 'warning' | 'success';
}

export const HighlightBox: React.FC<HighlightBoxProps> = ({ children, intent = 'info' }) => {
  const colors = {
    info: 'bg-blue-900/30 border-blue-500/50 text-blue-100',
    warning: 'bg-amber-900/30 border-amber-500/50 text-amber-100',
    success: 'bg-emerald-900/30 border-emerald-500/50 text-emerald-100',
  };
  
  return (
    <div className={`p-4 rounded-lg border ${colors[intent]} mb-6`}>
      {children}
    </div>
  );
};
