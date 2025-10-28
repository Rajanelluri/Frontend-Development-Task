# Earthquake Visualizer

**Project:** Earthquake Visualizer — Vite + React + TypeScript  
**Purpose:** Fetch USGS CSV (past 30 days) and visualize earthquakes as an interactive scatter chart + data table.

---

## Repository
https://github.com/Rajanelluri/Frontend-Development-Task

---

## Quick start — install & run

1. Clone
```bash
git clone https://github.com/Rajanelluri/Frontend-Development-Task
cd https://github.com/Rajanelluri/Frontend-Development-Task


Install

npm install


If Tailwind v4+ errors appear:

npm install -D @tailwindcss/postcss autoprefixer postcss


Run dev server

npm run dev


Open the Vite URL printed in terminal (usually http://localhost:5173
).

Build for production

npm run build
npm run preview

Project structure (important files)
src/
  components/
    ChartPanel.tsx
    DataTable.tsx
    Controls.tsx
  context/
    SelectionContext.tsx
  hooks/
    useEarthquakeData.ts
  store/
    useSelectionStore.ts
  utils/
    parseCsv.ts
  types.d.ts
  main.tsx
  App.tsx
styles/index.css
tailwind.config.cjs
postcss.config.cjs
package.json
README.md

External dependencies & their purposes

react, react-dom — UI rendering

vite — dev server / bundler

typescript — type safety

tailwindcss — styling utilities

@tailwindcss/postcss, postcss, autoprefixer — PostCSS pipeline for Tailwind

axios — HTTP requests (fetch USGS CSV)

papaparse — parse CSV to JSON

recharts — charts (ScatterChart)

zustand — lightweight global state store

@tanstack/react-query — fetching/caching UI data

react-icons — icons (optional)

Additional features implemented & reasoning

Two-way interaction — table ↔ chart highlight on hover/click.
Reason: Makes data exploration easier and shows event-driven UI.

Dynamic axis selection (dropdowns for X/Y): choose which numeric fields to plot.
Reason: User-driven analysis; flexible visualizations for different analyses.

Robust CSV parsing — numeric conversion and filtering invalid rows.
Reason: Prevent runtime errors (e.g., toFixed on strings), ensure charts work.

Responsive layout & dark theme — grid layout with min-w-0 and min-h-0 to fix Recharts sizing.
Reason: Polished visuals and consistent display across viewports.

Chart re-render strategy — using key={${xKey}-${yKey}} on the chart to force recalculation when axes change.
Reason: Recharts can cache scales; remounting avoids stale axes.

Helpful code comments (where to add)

src/utils/parseCsv.ts — explain numeric conversion and filtering:

// Convert CSV fields to numbers to avoid runtime errors with toFixed / chart scales
latitude: Number(row.latitude) || 0


src/hooks/useEarthquakeData.ts — describe Query client behavior:

// useQuery v5 object signature: queryKey + queryFn, staleTime to cache for 5 minutes


src/components/ChartPanel.tsx — explain remount trick:

// Using key={`${xKey}-${yKey}`} forces a remount so Recharts recalculates scales.


src/components/DataTable.tsx — explain scroll into view:

// When selectedId changes, scroll the table row into view for better UX.

How AI was used in development

I used ChatGPT to:

scaffold the project & generate boilerplate code (components, hooks).

help troubleshoot environment issues (Tailwind/PostCSS, line endings, dependency errors).

iterate chart visuals and interactivity (dynamic domains, color scale).

draft this README and helpful commit messages.

AI helped accelerate development; all final code was reviewed and tested locally.
Branching:

git checkout -b dev
# work
git commit -m "feat: ... "
git push origin dev
# when ready
git checkout main
git merge dev
git push origin main


output images:

<img width="1920" height="1080" alt="Screenshot (145)" src="https://github.com/user-attachments/assets/580f591a-5cd3-4759-b71b-a106e9ff23ab" />

<img width="1920" height="1080" alt="Screenshot (147)" src="https://github.com/user-attachments/assets/fe61bd09-b608-4c4a-a5d6-271d98aca90a" />























