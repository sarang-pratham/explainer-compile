import React from 'react';
import { SemanticVariant, getVariantStyles } from '../../theme/variants';

export interface ValueStackProps {
  items: { label: string; weight: number; status?: SemanticVariant }[];
  variant?: SemanticVariant;
}

export const ValueStack: React.FC<ValueStackProps> = ({ items, variant = 'default' }) => {
  const containerStyle = getVariantStyles(variant);
  const totalWeight = items.reduce((acc, curr) => acc + curr.weight, 0);

  return (
    <div className={`w-full max-w-sm flex flex-col-reverse gap-[2px] p-2 rounded-xl bg-[#0B0F19] border border-slate-800`}>
      {items.map((item, idx) => {
        const itemVariant = item.status || 'default';
        const itemStyle = getVariantStyles(itemVariant);
        // Calculate height proportional to weight, enforcing a minimum height
        const heightPct = Math.max(10, Math.round((item.weight / totalWeight) * 100));
        
        return (
          <div key={idx} 
               className={`flex items-center justify-center rounded-sm border ${itemStyle.borderSubtle} ${itemStyle.bgSubtle} transition-all relative group`}
               style={{ minHeight: `${heightPct * 2}px`, padding: '4px' }}>
             <span className={`font-mono text-[10px] sm:text-xs tracking-widest uppercase font-bold ${itemStyle.textAccent} opacity-80 group-hover:opacity-100 transition-opacity`}>
               {item.label}
             </span>
          </div>
        );
      })}
    </div>
  );
};
