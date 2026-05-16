import React from 'react';

export interface TwoColumnProps {
  proportion?: '50/50' | '70/30';
  children: React.ReactNode;
}

export const TwoColumn: React.FC<TwoColumnProps> = ({ proportion = '70/30', children }) => {
  const leftClass = proportion === '50/50' ? 'lg:col-span-6' : 'lg:col-span-8';
  const rightClass = proportion === '50/50' ? 'lg:col-span-6' : 'lg:col-span-4';
  const childrenArray = React.Children.toArray(children);
  
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className={`${leftClass} flex flex-col gap-6`}>{childrenArray[0]}</div>
      <div className={`${rightClass} flex flex-col gap-6`}>{childrenArray[1]}</div>
    </div>
  );
};
