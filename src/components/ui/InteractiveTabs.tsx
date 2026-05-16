import React, { useState } from 'react';

export interface InteractiveTabsProps {
  labels: string[];
  children: React.ReactNode;
}

export const InteractiveTabs: React.FC<InteractiveTabsProps> = ({ labels, children }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const childrenArray = React.Children.toArray(children);

  return (
    <div className="w-full flex flex-col mb-8 bg-tone-surface border border-tone-boundary rounded-xl overflow-hidden">
      <div className="flex border-b border-tone-boundary bg-[#0B0F19]/50 overflow-x-auto">
        {labels.map((lbl, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`px-6 py-3 font-medium text-sm transition-colors outline-none whitespace-nowrap border-b-2 ${
              activeIdx === idx 
                ? 'border-tone-cyan text-tone-cyan bg-tone-surface' 
                : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-tone-surface/50'
            }`}
          >
            {lbl}
          </button>
        ))}
      </div>
      <div className="w-full p-6">
        {childrenArray[activeIdx]}
      </div>
    </div>
  );
};
