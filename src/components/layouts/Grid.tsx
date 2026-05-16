import React from 'react';

export interface GridProps {
  columns?: 1 | 2 | 3 | 4;
  gap?: 'tight' | 'standard' | 'expressive';
  children: React.ReactNode;
}

export const Grid: React.FC<GridProps> = ({ columns = 2, gap = 'standard', children }) => {
  const gapClass = gap === 'tight' ? 'gap-4' : gap === 'expressive' ? 'gap-10' : 'gap-6';
  const colsClass = columns === 1 ? 'grid-cols-1' : columns === 2 ? 'grid-cols-1 lg:grid-cols-2' : columns === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
  
  return (
    <div className={`w-full grid ${colsClass} ${gapClass}`}>
      {children}
    </div>
  );
};
