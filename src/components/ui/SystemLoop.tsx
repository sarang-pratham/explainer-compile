import React, { useEffect, useState } from 'react';
import Xarrow from 'react-xarrows';
import { SemanticVariant, getVariantStyles } from '../../theme/variants';

export interface SystemLoopProps {
  nodes: { id: string; title: string; description?: string }[];
  connections: { from: string; to: string }[];
  variant?: SemanticVariant;
}

export const SystemLoop: React.FC<SystemLoopProps> = ({ nodes, connections, variant = 'system' }) => {
  const vStyle = getVariantStyles(variant);
  // React-xarrows requires the DOM to be fully painted before drawing arrows smoothly
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // Slight delay ensures layout calculation is complete
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full p-10 my-8 flex flex-wrap justify-around gap-16 bg-[#0B0F19] rounded-xl border border-slate-800 shadow-inner">
      {nodes.map(n => (
        <div key={n.id} id={n.id} className={`flex flex-col p-5 rounded-xl border ${vStyle.borderSubtle} ${vStyle.bgSubtle} w-56 z-10 backdrop-blur-sm shadow-xl`}>
          <span className={`font-mono font-bold tracking-widest text-xs uppercase ${vStyle.textAccent} mb-3`}>{n.title}</span>
          {n.description && <span className="text-xs text-slate-400 font-['Geist'] leading-relaxed">{n.description}</span>}
        </div>
      ))}
      {mounted && connections.map((c, i) => (
        <Xarrow 
          key={i} 
          start={c.from} 
          end={c.to} 
          color="rgba(167, 139, 250, 0.4)" // Subtle default stroke
          strokeWidth={2}
          path="smooth"
          curveness={0.8}
          headSize={4}
          animateDrawing={1.5}
        />
      ))}
    </div>
  );
};
