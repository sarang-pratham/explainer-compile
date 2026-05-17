import React from 'react';
import { SemanticVariant, getVariantStyles } from '../../theme/variants';
import { ArrowRight } from 'lucide-react';

export interface DataArrayProps {
  blocks: string[];
  highlightIndices?: number[];
  variant?: SemanticVariant;
  arrowTarget?: string;
}

export const DataArray: React.FC<DataArrayProps> = ({
  blocks, highlightIndices = [], variant = 'info', arrowTarget
}) => {
  const vStyle = getVariantStyles(variant);
  const defaultStyle = getVariantStyles('default');

  return (
    <div className="flex items-center w-full max-w-full overflow-x-auto p-1 py-4 mb-6 -ml-1">
      <div className="flex border border-slate-800 rounded-lg overflow-hidden bg-[#0B0F19] shadow-md shrink-0">
        {blocks.map((block, idx) => {
          const isHighlighted = highlightIndices.includes(idx);
          const bg = isHighlighted ? vStyle.bgSubtle : defaultStyle.bgSubtle;
          const txt = isHighlighted ? vStyle.textAccent : 'text-gray-400';
          const border = idx !== blocks.length - 1 ? 'border-r border-slate-800' : '';
          
          return (
            <div key={idx} className={`px-4 py-3 font-mono text-sm tracking-widest ${bg} ${txt} ${border} transition-colors flex items-center justify-center min-w-[3rem]`}>
              {block}
            </div>
          );
        })}
      </div>
      
      {arrowTarget && (
        <div className="flex items-center shrink-0 ml-4 group">
          <ArrowRight size={18} className="text-gray-600 mr-4 group-hover:text-white transition-colors" />
          <div className={`px-4 py-2 rounded-full border border-dashed ${vStyle.borderSubtle} ${vStyle.bgSubtle} ${vStyle.textAccent} font-mono text-xs font-bold tracking-widest uppercase flex items-center`}>
            {arrowTarget}
          </div>
        </div>
      )}
    </div>
  );
};
