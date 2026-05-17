import esbuild from 'esbuild';
import mdxesbuild from '@mdx-js/esbuild';
import fs from 'fs-extra';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function compileMdx(inputFilePath: string) {
  const cwd = process.cwd();
  
  // Derive topic name from input filename
  const inputBasename = path.basename(inputFilePath, path.extname(inputFilePath));
  const outputDir = path.join(cwd, '.explainer-output', inputBasename);
  
  await fs.ensureDir(outputDir);
  
  // Auto-manage .gitignore
  const gitignorePath = path.join(cwd, '.gitignore');
  if (await fs.pathExists(gitignorePath)) {
    const content = await fs.readFile(gitignorePath, 'utf-8');
    if (!content.includes('.explainer-output')) {
      await fs.appendFile(gitignorePath, '\n.explainer-output/\n');
    }
  } else {
    await fs.writeFile(gitignorePath, '.explainer-output/\n');
  }

  const packageRoot = path.join(__dirname, '..');
  const resolvedInputPath = path.resolve(inputFilePath).replace(/\\/g, '/');
  
  // 1. Generate Virtual Entry Point
  const virtualEntryPath = path.join(outputDir, '_entry.jsx');
  const componentsPath = path.join(packageRoot, 'dist', 'components', 'index.js').replace(/\\/g, '/');

  const tempMdxPath = path.join(outputDir, '_content.mdx');
  await fs.copyFile(resolvedInputPath, tempMdxPath);

  const virtualEntryCode = [
    "import React from 'react';",
    "import { createRoot } from 'react-dom/client';",
    "import MDXContent from './_content.mdx';",
    "import { mdxComponentsRegistry } from '" + componentsPath + "';",
    "",
    "const rootElement = document.getElementById('root');",
    "if (rootElement) {",
    "  const root = createRoot(rootElement);",
    "  root.render(React.createElement(MDXContent, { components: mdxComponentsRegistry }));",
    "}"
  ].join('\n');

  await fs.writeFile(virtualEntryPath, virtualEntryCode);

  // 2. Generate Tailwind Config Data
  const tempTailwindConfigPath = path.join(outputDir, 'tailwind.config.mjs');
  const componentsGlob = path.join(packageRoot, 'src', 'components', '**', '*.{tsx,ts,jsx,js}').replace(/\\/g, '/');
  
  const tailwindConfigCode = [
    "export default {",
    "  content: [",
    "    '" + resolvedInputPath + "',",
    "    '" + componentsGlob + "',",
    "    '" + virtualEntryPath.replace(/\\/g, '/') + "'",
    "  ],",
    "  theme: {",
    "    extend: {",
    "      colors: {",
    "        'tone-bg': 'var(--tone-bg, #0B0F19)',",
    "        'tone-surface': 'var(--tone-surface, #131926)',",
    "        'tone-boundary': 'var(--tone-boundary, rgba(255, 255, 255, 0.06))',",
    "        'tone-cyan': 'var(--tone-cyan, #22d3ee)',",
    "        'tone-violet': 'var(--tone-violet, #a78bfa)',",
    "        'tone-emerald': 'var(--tone-emerald, #34d399)',",
    "        'tone-rose': 'var(--tone-rose, #f43f5e)'",
    "      }",
    "    }",
    "  }",
    "};"
  ].join('\n');

  await fs.writeFile(tempTailwindConfigPath, tailwindConfigCode);

  // 3. Compile Tailwind
  console.log('Building Global CSS (Tailwind)...');
  const tokensPath = path.join(packageRoot, 'src', 'theme', 'tokens.css');
  const cssOutPath = path.join(outputDir, 'global.css');
  
  // Resolve the tailwindcss CLI entry directly using Node.js module resolution
  const tailwindCliPath = require.resolve('tailwindcss/lib/cli.js');
  try {
    await execAsync(`node "${tailwindCliPath}" -i "${tokensPath}" -o "${cssOutPath}" -c "${tempTailwindConfigPath}"`);
  } catch (err: any) {
    console.error('Tailwind build failed:', err.stdout || err.message);
    throw err;
  }

  // 4. Bundle with ESBuild
  console.log('Bundling Runtime JS (ESBuild + MDX)...');
  await esbuild.build({
    entryPoints: [virtualEntryPath],
    bundle: true,
    outfile: path.join(outputDir, 'runtime.js'),
    format: 'iife',
    plugins: [
      {
        name: 'npx-resolver',
        setup(build) {
          // Resolve React dependencies aggressively against package root
          build.onResolve({ filter: /^(react|react-dom(\/client)?|react\/jsx-runtime)$/ }, args => {
            try {
              return { path: require.resolve(args.path, { paths: [packageRoot] }) };
            } catch (e) {
              return null;
            }
          });
        }
      },
      mdxesbuild({ jsx: true })
    ],
    loader: {
      '.js': 'jsx',
    },
    define: {
      'process.env.NODE_ENV': '"production"'
    }
  });

  // 5. Generate index.html
  const htmlContent = [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="UTF-8">',
    '  <title>' + inputBasename + ' — Explainer</title>',
    '  <link rel="stylesheet" href="global.css">',
    '</head>',
    '<body class="antialiased">',
    '  <div id="root"></div>',
    '  <script src="runtime.js"></script>',
    '</body>',
    '</html>'
  ].join('\n');
  
  await fs.writeFile(path.join(outputDir, 'index.html'), htmlContent);

  // 6. Clean up temp build artifacts
  await fs.remove(virtualEntryPath);
  await fs.remove(tempTailwindConfigPath);
  await fs.remove(tempMdxPath);

  console.log('Compilation Complete! Output: .explainer-output/' + inputBasename + '/');
}
