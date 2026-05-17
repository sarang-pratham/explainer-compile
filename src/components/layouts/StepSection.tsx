import React from 'react';
import { SemanticVariant, FillMode, resolveLayoutVisuals, getVariantStyles } from '../../theme/variants';

export interface StepSectionProps {
  stepNumber: number;
  title: string;
  tagline?: string;
  variant?: SemanticVariant;
  fillMode?: FillMode;
  glow?: boolean;
  children: React.ReactNode;
}

export const StepSection: React.FC<StepSectionProps> = ({
  stepNumber, title, tagline, variant = 'info', fillMode = 'none', glow = false, children
}) => {
  const aesthetics = resolveLayoutVisuals(variant, fillMode, glow);
  const vStyle = getVariantStyles(variant);
  
  const circles = ['❶', '❷', '❸', '❹', '❺', '❻', '❼', '❽', '❾', '❿'];
  const numBadge = circles[Math.max(0, Math.min(9, stepNumber - 1))] || stepNumber;

  return (
    <div className={`w-full flex flex-col mb-10 p-2 md:p-6 rounded-xl transition-all ${aesthetics}`}>
      <div className="flex items-center mb-6 border-b border-white/5 pb-4">
        <span className={`text-4xl mr-5 ${vStyle.textAccent} font-mono leading-none`}>
          {numBadge}
        </span>
        <div className="flex flex-col">
          <h2 className={`text-2xl font-bold tracking-tight text-white mb-1 font-['Geist'] m-0 p-0 border-0`}>{title}</h2>
          {tagline && <p className={`text-xs ${vStyle.textAccent} font-mono uppercase tracking-widest mt-1 mb-0 opacity-80`}>{tagline}</p>}
        </div>
      </div>
      <div className="flex-1 text-gray-300 w-full pl-0 md:pl-12">
        {children}
      </div>
    </div>
  );
};
