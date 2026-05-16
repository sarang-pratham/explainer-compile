import React from 'react';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export interface DataChartProps {
  type?: 'line' | 'column' | 'area';
  data: any[];
  height?: number;
  animate?: boolean;
}

export const DataChart: React.FC<DataChartProps> = ({ type = 'line', data, height = 300, animate = true }) => {
  const renderChart = () => {
    const commonProps = { data, margin: { top: 20, right: 20, left: -20, bottom: 0 } };
    const strokeColor = 'var(--tone-boundary)';
    const textColor = '#64748b';
    
    if (type === 'column') {
      return (
        <BarChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke={strokeColor} vertical={false} />
          <XAxis dataKey="name" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} contentStyle={{ backgroundColor: '#131926', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
          <Bar dataKey="value" fill="var(--tone-cyan)" radius={[4, 4, 0, 0]} isAnimationActive={animate} />
        </BarChart>
      );
    }
    if (type === 'area') {
      return (
        <AreaChart {...commonProps}>
          <defs>
            <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--tone-violet)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="var(--tone-violet)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={strokeColor} vertical={false} />
          <XAxis dataKey="name" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ backgroundColor: '#131926', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
          <Area type="monotone" dataKey="value" stroke="var(--tone-violet)" strokeWidth={2} fillOpacity={1} fill="url(#colorVal)" isAnimationActive={animate} />
        </AreaChart>
      );
    }
    return (
      <LineChart {...commonProps}>
        <CartesianGrid strokeDasharray="3 3" stroke={strokeColor} vertical={false} />
        <XAxis dataKey="name" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={{ backgroundColor: '#131926', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
        <Line type="monotone" dataKey="value" stroke="var(--tone-emerald)" strokeWidth={3} dot={{ strokeWidth: 2, r: 4, fill: '#0B0F19' }} activeDot={{ r: 6 }} isAnimationActive={animate} />
      </LineChart>
    );
  };

  return (
    <div className="w-full bg-tone-surface border border-tone-boundary rounded-xl p-4 md:p-6 mb-6" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};
