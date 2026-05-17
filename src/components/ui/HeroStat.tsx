import React from 'react';
import { SemanticVariant, getVariantStyles } from '../../theme/variants';

export interface HeroStatProps {
  stat: string | number;
  label: string;
  alignment?: 'left' | 'center' | 'right';
  variant?: SemanticVariant;
}

export const HeroStat: React.FC<HeroStatProps> = ({ stat, label, alignment = 'left', variant = 'success' }) => {
  const vStyle = getVariantStyles(variant);
  const alignClass = alignment === 'center' ? 'items-center text-center' : alignment === 'right' ? 'items-end text-right' : 'items-start text-left';

  return (
    <div className={`flex flex-col ${alignClass} my-10`}>
      <span className={`text-6xl md:text-8xl font-bold tracking-tighter ${vStyle.textAccent} leading-none font-['Geist'] drop-shadow-2xl`}>
        {stat}
      </span>
      <span className="text-xs md:text-sm text-gray-500 font-mono tracking-widest uppercase mt-4 mb-2">
        {label}
      </span>
    </div>
  );
};
