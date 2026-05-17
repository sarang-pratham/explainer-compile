import React from 'react';
import { SemanticVariant, getVariantStyles } from '../../theme/variants';

export const Marker: React.FC<{ color?: SemanticVariant; importance?: 'bold' | 'subtle'; children: React.ReactNode }> = ({ color = 'info', importance = 'bold', children }) => {
  const vStyle = getVariantStyles(color);
  const weightClass = importance === 'bold' ? 'font-bold' : 'font-medium';
  return <span className={`${vStyle.textAccent} ${weightClass}`}>{children}</span>;
};

export const Badge: React.FC<{ text: string; variant?: SemanticVariant }> = ({ text, variant = 'default' }) => {
  const vStyle = getVariantStyles(variant);
  return (
    <span className={`inline-flex ml-3 px-2.5 py-0.5 rounded border ${vStyle.borderSubtle} ${vStyle.bgSubtle} ${vStyle.textAccent} text-[10px] uppercase font-mono tracking-widest font-bold align-text-bottom`}>
      {text}
    </span>
  );
};
