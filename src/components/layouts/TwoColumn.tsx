import React from 'react';
import { SemanticVariant, FillMode, resolveLayoutVisuals, getVariantStyles } from '../../theme/variants';

export interface TwoColumnProps {
  proportion?: '50/50' | '70/30';
  variant?: SemanticVariant;
  fillMode?: FillMode;
  glow?: boolean;
  accentBorders?: boolean;
  children: React.ReactNode;
}

export const TwoColumn: React.FC<TwoColumnProps> = ({ 
  proportion = '70/30', variant = 'default', fillMode = 'none', glow = false, accentBorders = false, children 
}) => {
  const leftClass = proportion === '50/50' ? 'lg:col-span-6' : 'lg:col-span-8';
  const rightClass = proportion === '50/50' ? 'lg:col-span-6' : 'lg:col-span-4';
  const childrenArray = React.Children.toArray(children);
  
  const aesthetics = resolveLayoutVisuals(variant, fillMode, glow);
  const vStyle = getVariantStyles(variant);
  
  const borderVisual = accentBorders ? `border-l-2 pl-5 md:pl-8 ${vStyle.borderAccent}` : '';

  return (
    <div className={`w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start p-1 rounded-xl transition-all ${aesthetics}`}>
      <div className={`${leftClass} flex flex-col gap-6 ${borderVisual}`}>{childrenArray[0]}</div>
      <div className={`${rightClass} flex flex-col gap-6 ${borderVisual}`}>{childrenArray[1]}</div>
    </div>
  );
};
