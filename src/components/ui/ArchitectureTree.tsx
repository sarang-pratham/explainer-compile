import React from 'react';
import { Box, File, Folder, Link as LinkIcon } from 'lucide-react';

interface NodeItem {
  name: string;
  type: 'folder' | 'file' | 'link';
  desc?: string;
  children?: NodeItem[];
}

export interface ArchitectureTreeProps {
  rootName: string;
  nodes: NodeItem[];
}

const renderNodes = (nodes: NodeItem[], depth: number = 0) => {
  return nodes.map((n, i) => (
    <div key={i} className="flex flex-col">
      <div className="flex items-center group mb-2 hover:bg-tone-surface/80 rounded px-2 py-1.5 -ml-2 transition-colors cursor-default">
        <div className="flex items-center" style={{ paddingLeft: depth * 24 }}>
          {n.type === 'folder' ? <Folder size={16} className="text-tone-emerald mr-3 shrink-0" /> : 
           n.type === 'link' ? <LinkIcon size={16} className="text-tone-cyan mr-3 shrink-0" /> :
           <File size={16} className="text-gray-400 mr-3 shrink-0" />}
          <span className="font-medium text-sm text-gray-200 tracking-wide font-mono">{n.name}</span>
        </div>
        {n.desc && (
          <span className="ml-4 text-xs text-gray-500 font-mono hidden md:block opacity-60 group-hover:opacity-100 transition-opacity whitespace-nowrap">/* {n.desc} */</span>
        )}
      </div>
      {n.children && n.children.length > 0 && renderNodes(n.children, depth + 1)}
    </div>
  ));
};

export const ArchitectureTree: React.FC<ArchitectureTreeProps> = ({ rootName, nodes }) => {
  return (
    <div className="w-full bg-[#0B0F19] border border-tone-boundary rounded-xl p-5 md:p-6 mb-6 overflow-x-auto">
      <div className="flex items-center mb-5 pb-4 border-b border-tone-boundary">
        <Box size={18} className="text-tone-violet mr-3 shrink-0" />
        <span className="font-bold text-tone-violet tracking-widest uppercase text-xs">{rootName}</span>
      </div>
      <div className="w-full min-w-max">
        {renderNodes(nodes)}
      </div>
    </div>
  );
};
