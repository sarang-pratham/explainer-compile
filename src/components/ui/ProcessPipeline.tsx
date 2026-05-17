import React from 'react';
import { SemanticVariant, getVariantStyles } from '../../theme/variants';
import { ChevronRight } from 'lucide-react';

export interface ProcessPipelineProps {
  steps: { label: string; subtext?: string; iconType?: string }[];
  variant?: SemanticVariant;
}

export const ProcessPipeline: React.FC<ProcessPipelineProps> = ({ steps, variant = 'info' }) => {
  const vStyle = getVariantStyles(variant);

  return (
    <div className={`w-full flex items-center overflow-x-auto gap-4 my-8 p-6 md:p-8 rounded-xl bg-[#0B0F19] border ${vStyle.borderSubtle}`}>
      {steps.map((step, idx) => (
        <React.Fragment key={idx}>
          <div className="flex flex-col gap-2 w-48 shrink-0 relative group">
            <div className={`px-4 py-4 rounded-lg border border-dashed ${vStyle.borderSubtle} ${vStyle.bgSubtle} text-center flex flex-col items-center justify-center min-h-[4rem] group-hover:border-solid transition-all duration-300`}>
               <span className={`font-mono text-xs tracking-widest font-bold uppercase ${vStyle.textAccent}`}>{step.label}</span>
            </div>
            {step.subtext && <span className="text-[10px] text-gray-500 text-center uppercase tracking-widest mt-1 opacity-70 px-2 leading-relaxed">{step.subtext}</span>}
          </div>
          {idx < steps.length - 1 && (
            <ChevronRight size={20} strokeWidth={2} className="text-slate-700 shrink-0 mb-6" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
