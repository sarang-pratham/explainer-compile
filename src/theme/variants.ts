export type SemanticVariant = 'default' | 'info' | 'system' | 'success' | 'critical' | 'insight';
export type FillMode = 'card' | 'subtle-tint' | 'none';

export const getVariantStyles = (variant: SemanticVariant = 'default') => {
  const styles = {
    default: {
      bgSubtle: 'bg-slate-900/40',
      borderSubtle: 'border-slate-800',
      textAccent: 'text-slate-300',
      borderAccent: 'border-slate-500',
      glow: 'shadow-[0_0_30px_-5px_rgba(255,255,255,0.05)]'
    },
    info: {
      bgSubtle: 'bg-[#22d3ee]/5',
      borderSubtle: 'border-[#22d3ee]/20',
      textAccent: 'text-tone-cyan',
      borderAccent: 'border-tone-cyan',
      glow: 'shadow-[0_0_30px_-5px_rgba(34,211,238,0.15)]'
    },
    system: {
      bgSubtle: 'bg-[#a78bfa]/5',
      borderSubtle: 'border-[#a78bfa]/20',
      textAccent: 'text-tone-violet',
      borderAccent: 'border-tone-violet',
      glow: 'shadow-[0_0_30px_-5px_rgba(167,139,250,0.15)]'
    },
    success: {
      bgSubtle: 'bg-[#34d399]/5',
      borderSubtle: 'border-[#34d399]/20',
      textAccent: 'text-tone-emerald',
      borderAccent: 'border-tone-emerald',
      glow: 'shadow-[0_0_30px_-5px_rgba(52,211,153,0.15)]'
    },
    critical: {
      bgSubtle: 'bg-[#f43f5e]/5',
      borderSubtle: 'border-[#f43f5e]/20',
      textAccent: 'text-tone-rose',
      borderAccent: 'border-tone-rose',
      glow: 'shadow-[0_0_30px_-5px_rgba(244,63,94,0.15)]'
    },
    insight: {
      bgSubtle: 'bg-amber-500/5',
      borderSubtle: 'border-amber-500/20',
      textAccent: 'text-amber-400',
      borderAccent: 'border-amber-500',
      glow: 'shadow-[0_0_30px_-5px_rgba(245,158,11,0.15)]'
    }
  };
  return styles[variant];
};

export const resolveLayoutVisuals = (variant: SemanticVariant, fillMode: FillMode, useGlow: boolean) => {
  const v = getVariantStyles(variant);
  let layoutClasses = '';
  
  if (fillMode === 'card') {
    layoutClasses += 'bg-tone-surface border ' + v.borderSubtle;
  } else if (fillMode === 'subtle-tint') {
    layoutClasses += v.bgSubtle + ' border ' + v.borderSubtle;
  } else {
    layoutClasses += 'bg-transparent border-transparent';
  }

  if (useGlow) {
    layoutClasses += ' ' + v.glow;
  }

  return layoutClasses;
};
