# AGENTS.md

## Project Purpose
Random Walk Lab is a small interactive educational website for exploring one-dimensional simple random walks.

## Technology
- HTML5
- CSS3
- Vanilla JavaScript
- Canvas
- GitHub Pages

Do not add a backend, framework, build system, or external dependency unless explicitly requested.

## Project Structure
- `index.html`: Single-page website and content structure.
- `css/style.css`: All visual styles and responsive layout.
- `js/simulator.js`: Random walk simulation, statistics, and Canvas rendering.
- `README.md`: Project overview and usage instructions.
- `AGENTS.md`: AI development rules.

## Design Rules
- Keep the dark navy scientific visual style.
- Blue lines represent sample paths.
- Orange represents the empirical average path.
- Teal dashed line represents the theoretical mean path.
- Preserve responsive behavior on desktop and mobile.
- Keep labels and explanations clear and concise.

## Mathematical Rules
The walk starts at zero. Each independent step is +1 with probability p and -1 with probability 1-p.
- E[X_n] = n(2p - 1)
- Var(X_n) = 4np(1-p)

Do not change these formulas without explaining the changed model assumptions. Distinguish sample statistics from theoretical quantities.

## Simulation Rules
- Default to 20 sample paths.
- Keep simulation logic separate from drawing logic.
- Update the chart and displayed statistics when controls change.
- Use sample variance with denominator M-1.
- Handle responsive Canvas sizing.

## AI Change Workflow
1. Read this file before editing.
2. Inspect the existing files and reuse their conventions.
3. Make the smallest change that satisfies the request.
4. Do not rewrite unrelated sections.
5. Check navigation, controls, chart rendering, and mobile layout after changes.
6. Update README.md when project usage or structure changes.

## Adding Content
For a new topic, preserve the existing page style, explain assumptions and formulas, and avoid adding dependencies. Keep the project simple and compatible with GitHub Pages.
