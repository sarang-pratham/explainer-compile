# explainer-compile

A headless MDX compiler that turns `.mdx` files into interactive static dashboards. Built for coding agents — the agent writes the MDX, the compiler handles everything else.

> **Experimental / Vibe-Coded**
>
> This repository is an exploratory project, treat this as a proof of concept rather than a finished product.


## What it does

You (or your coding agent) write a `.mdx` file using a set of layout and data primitives. Run the compiler, and it spits out a self-contained folder with `index.html`, `global.css`, and `runtime.js`. Open the HTML file and you've got a styled, interactive technical explainer. No framework setup, no config files, no design decisions.

The styling, fonts, colors, and responsive behavior are all baked into the compiler. The MDX author only picks components and passes data.

## Prerequisites

- **Node.js** >= 18
- **npm** >= 9

That's it. Everything else is handled by `npx`.

## Usage

```bash
npx @sarang-pratham/explainer-compile build ./my-topic.mdx
```

Output lands in `.explainer-output/my-topic/`:

```
.explainer-output/
└── my-topic/
    ├── index.html
    ├── global.css
    └── runtime.js
```

Add `--open` to launch the dashboard in your browser immediately:

```bash
npx @sarang-pratham/explainer-compile build ./my-topic.mdx --open
```

The compiler automatically adds `.explainer-output/` to your `.gitignore`.

## Available components

### Layouts

- `<Dashboard>` — root wrapper, always required
- `<Grid>` — multi-column card layout (1–4 columns)
- `<TwoColumn>` — asymmetric split (70/30 or 50/50)
- `<StepSection>` — numbered narrative section (❶ ❷ ❸)
- `<InteractiveTabs>` — tabbed content switcher

### Data & metrics

- `<MetricCard>` — single KPI with trend indicator
- `<HeroStat>` — large editorial number callout
- `<DataChart>` — line, bar, or area charts (recharts under the hood)
- `<DataArray>` — token sequences and memory slot visualizers
- `<ValueStack>` — proportionally sized stacked layers

### Diagrams

- `<ProcessPipeline>` — horizontal step chain with arrows
- `<SystemLoop>` — cyclic node graph with animated connections
- `<ArchitectureTree>` — file trees and dependency hierarchies

### Editorial

- `<EditorialCallout>` — thesis statements, warnings, key insights
- `<HighlightBox>` — bordered content highlight
- `<Marker>` — inline text highlight
- `<Badge>` — inline status label

All layout and data components accept a `variant` prop for semantic coloring: `default`, `info`, `system`, `success`, `critical`, `insight`.

## How it works

1. Generates a virtual React entry point that imports your MDX and the component registry
2. Runs Tailwind CSS against the MDX file and the internal component source to produce `global.css`
3. Bundles everything with esbuild + `@mdx-js/esbuild` into a single `runtime.js`
4. Writes a minimal `index.html` shell

The output is fully self-contained. No server required — works from `file://`.

## For agent skill authors

This compiler is designed to pair with an agent skill. The skill tells the coding agent which components exist and what props they take. The agent writes the `.mdx`. The compiler does the rest.

The skill files live in a separate repo `https://github.com/sarang-pratham/explainer` and reference this package via `npx @sarang-pratham/explainer-compile`.

## Development

```bash
git clone https://github.com/sarang-pratham/explainer-compile.git
cd explainer-compile
npm install
npm run build
node dist/cli.js build test-agent/explanation.mdx --open
```

## License

MIT
