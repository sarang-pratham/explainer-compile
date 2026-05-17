#!/usr/bin/env node

import { program } from 'commander';
import { resolve, basename, extname } from 'path';
import { exec } from 'child_process';
import { compileMdx } from './compiler.js';

program
  .name('explainer-compile')
  .description('Compiles agent-generated MDX files into static interactive dashboards')
  .version('0.1.0');

program
  .command('build')
  .description('Build an MDX file into explaining output directory')
  .argument('<file>', 'path to the .mdx file')
  .option('--open', 'Open the compiled dashboard in the default browser')
  .action(async (file, opts) => {
    try {
      const targetPath = resolve(process.cwd(), file);
      console.log(`Compiling MDX from: ${targetPath}`);
      await compileMdx(targetPath);
      console.log('Build complete!');

      if (opts.open) {
        const topic = basename(file, extname(file));
        const htmlPath = resolve(process.cwd(), '.explainer-output', topic, 'index.html');
        const cmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
        exec(`${cmd} "${htmlPath}"`);
      }
    } catch (err) {
      console.error('Failed to compile:', err);
      process.exit(1);
    }
  });

program.parse();
