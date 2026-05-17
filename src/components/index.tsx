import React from 'react';
import { Dashboard } from './layouts/Dashboard';
import { Grid } from './layouts/Grid';
import { TwoColumn } from './layouts/TwoColumn';
import { StepSection } from './layouts/StepSection';
import { MetricCard } from './ui/MetricCard';
import { DataChart } from './ui/DataChart';
import { InteractiveTabs } from './ui/InteractiveTabs';
import { ArchitectureTree } from './ui/ArchitectureTree';
import { DataArray } from './ui/DataArray';
import { ValueStack } from './ui/ValueStack';
import { ProcessPipeline } from './ui/ProcessPipeline';
import { SystemLoop } from './ui/SystemLoop';
import { EditorialCallout } from './ui/EditorialCallout';
import { HeroStat } from './ui/HeroStat';
import { Marker, Badge } from './ui/Typography';

export const mdxComponentsRegistry = {
  // Typography overrides
  h1: (props: any) => <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 font-['Geist'] leading-tight" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-semibold text-white mt-12 mb-5 pb-3 border-b border-tone-boundary font-['Geist'] tracking-tight" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-medium text-gray-200 mt-8 mb-4 font-['Geist']" {...props} />,
  p: (props: any) => <p className="text-base text-gray-400 leading-relaxed mb-5 font-['Geist']" {...props} />,
  
  // Execution blocks
  code: (props: any) => <code className="bg-[#0B0F19] border border-tone-boundary rounded-md px-1.5 py-0.5 text-sm text-tone-cyan font-mono mx-1" {...props} />,
  pre: (props: any) => <pre className="bg-[#0B0F19] border border-tone-boundary rounded-xl p-5 overflow-x-auto mb-6 text-sm text-gray-300 font-mono leading-relaxed" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-4 border-tone-violet bg-tone-surface/60 p-5 rounded-r-xl my-6 text-gray-300 italic text-base leading-relaxed" {...props} />,
  
  // Tabular Layouts
  table: (props: any) => <div className="w-full overflow-x-auto mb-6 border border-tone-boundary rounded-xl bg-tone-surface"><table className="w-full text-left border-collapse min-w-[600px]" {...props} /></div>,
  th: (props: any) => <th className="uppercase tracking-wider text-xs font-semibold text-gray-500 bg-[#0B0F19] p-4 border-b border-tone-boundary" {...props} />,
  td: (props: any) => <td className="p-4 border-b border-tone-boundary/50 text-sm text-gray-300 font-mono" {...props} />,
  a: (props: any) => <a className="text-tone-cyan hover:underline hover:text-white transition-colors" {...props} />,

  // Layouts
  Dashboard,
  Grid,
  TwoColumn,
  StepSection,

  // UI Standard Elements
  MetricCard,
  DataChart,
  ArchitectureTree,
  InteractiveTabs,
  
  // Phase 2 Infographic Primitives
  DataArray,
  ValueStack,
  ProcessPipeline,
  SystemLoop,
  EditorialCallout,
  HeroStat,
  Marker,
  Badge
};
