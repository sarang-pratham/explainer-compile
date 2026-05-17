import React from 'react';
import { SemanticVariant, getVariantStyles } from '../../theme/variants';

export interface EditorialCalloutProps {
  variant?: SemanticVariant;
  badgeText?: string;
  text: string;
}

export const EditorialCallout: React.FC<EditorialCalloutProps> = ({ variant = 'insight', badgeText, text }) => {
  const vStyle = getVariantStyles(variant);
  
  return (
    <div className={`flex flex-col md:flex-row gap-6 my-10 p-8 rounded-xl border ${vStyle.borderSubtle} ${vStyle.bgSubtle} relative overflow-hidden backdrop-blur`}>
      {/* Decorative left bar */}
      <div className={`absolute top-0 left-0 w-1.5 h-full`} style={{ backgroundColor: vStyle.borderAccent.replace('border-', 'var(--') + ')' }} />
      
      {badgeText && (
        <div className="shrink-0 flex items-start">
          <span className={`px-4 py-2 rounded bg-[#0B0F19] border ${vStyle.borderSubtle} text-xs tracking-[0.2em] font-bold uppercase ${vStyle.textAccent} font-mono shadow-xl`}>
            {badgeText}
          </span>
        </div>
      )}
      
      <div className={`text-base md:text-lg leading-relaxed font-['Geist'] text-gray-200 font-medium`}>
        {text}
      </div>
    </div>
  );
};
