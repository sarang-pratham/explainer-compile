#!/usr/bin/env node

import { program } from 'commander';
import { resolve } from 'path';
import { compileMdx } from './compiler';

program
  .name('explainer-compile')
  .description('Compiles agent-generated MDX files into static interactive dashboards')
  .version('1.0.0');

program
  .command('build')
  .description('Build an MDX file into explaining output directory')
  .argument('<file>', 'path to the .mdx file')
  .action(async (file) => {
    try {
      const targetPath = resolve(process.cwd(), file);
      console.log(`Compiling MDX from: ${targetPath}`);
      await compileMdx(targetPath);
      console.log('Build complete!');
    } catch (err) {
      console.error('Failed to compile:', err);
      process.exit(1);
    }
  });

program.parse();
