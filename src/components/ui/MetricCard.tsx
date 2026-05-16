import React from 'react';
import { Activity, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: 'positive' | 'negative' | 'neutral';
  description?: string;
  icon?: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
  label, value, trend = 'neutral', description, icon 
}) => {
  const trendConfig = {
    positive: { color: 'text-tone-emerald', bg: 'bg-tone-emerald/10 border-tone-emerald/20', Icon: TrendingUp },
    negative: { color: 'text-tone-rose', bg: 'bg-tone-rose/10 border-tone-rose/20', Icon: TrendingDown },
    neutral: { color: 'text-tone-cyan', bg: 'bg-tone-cyan/10 border-tone-cyan/20', Icon: Minus }
  };
  const { color, bg, Icon } = trendConfig[trend];

  return (
    <div className="flex flex-col p-6 rounded-xl border border-tone-boundary bg-tone-surface relative overflow-hidden w-full mb-6 group hover:border-tone-boundary/50 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-400 text-sm font-medium tracking-wide uppercase">{label}</h3>
        <div className={`p-2 rounded border ${bg} ${color}`}>
          {icon || <Icon size={16} strokeWidth={2.5} />}
        </div>
      </div>
      <div className="flex items-baseline gap-3">
        <span className="text-4xl font-bold text-white tracking-tight">{value}</span>
      </div>
      {description && <p className="text-sm text-gray-500 mt-3 font-medium">{description}</p>}
    </div>
  );
};
