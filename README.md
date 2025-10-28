# 🌍 Earthquake Visualization Dashboard

An interactive **React + Vite + TypeScript** web application that visualizes earthquake data from CSV files using beautiful bar charts, filters, and tables.  
Built as part of the **Frontend Developer Assessment**, this project demonstrates real-world data visualization, state management, and UI responsiveness.

---

## 🚀 Project Overview

This application fetches and parses earthquake datasets (in CSV format) and visualizes them using **Recharts**.  
It allows users to explore the relationship between earthquake **magnitude**, **depth**, and **location** through:

- **Interactive bar charts**
- **Dynamic filters for axes selection**
- **Responsive tables for raw data**
- **Selection highlighting** between chart and table

The design emphasizes **clarity**, **performance**, and **responsiveness**, following best practices in modern React development.

---

##Key Features

1. Fetches and parses CSV earthquake datasets  
2. Interactive chart (BarChart using Recharts)  
3. Real-time axis switching (e.g., Depth vs. Magnitude)  
4. Click-to-select and highlight specific records  
5. Clean UI built with TailwindCSS  
6. State management with Zustand + Context  
7. Error boundaries and loading states  
8. Modular, reusable component architecture  

---

## Project File Structure
earthquake-visual/
├─ package.json
├─ index.html
├─ tailwind.config.cjs
├─ postcss.config.cjs
├─ README.md
├─ src/
│ ├─ main.tsx # Application entry point
│ ├─ App.tsx # Root component integrating layout and logic
│ ├─ styles/
│ │ └─ index.css # Global styles (Tailwind setup)
│ ├─ components/
│ │ ├─ ChartPanel.tsx # Displays interactive BarChart visualization
│ │ ├─ DataTable.tsx # Displays raw earthquake data with filtering
│ │ └─ Controls.tsx # Dropdowns to switch chart axes (X/Y)
│ ├─ context/
│ │ └─ SelectionContext.tsx # Global selection context for interactivity
│ ├─ store/
│ │ └─ useSelectionStore.ts # Zustand store for shared state management
│ ├─ hooks/
│ │ └─ useEarthquakeData.ts # Custom React Query hook to fetch + cache data
│ ├─ utils/
│ │ └─ parseCsv.ts # Utility for CSV parsing and data transformation
│ └─ types.d.ts # TypeScript interfaces for dataset typing


<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/345a370f-e40e-48a5-bb38-a55c068b2342" />


---

##  Setup and Installation

### 1️ Clone the Repository
```bash
git clone https://github.com/Rajanelluri/Frontend-Development-Task.git
cd Frontend-Development-Task

2  Install Dependencies
npm install
Run the Development Server:
npm run dev
Visit the app at:
👉 http://localhost:5174

External Dependencies and Their Purpose:
| Dependency                 | Purpose                                               |
| -------------------------- | ----------------------------------------------------- |
| **React**                  | Core UI library                                       |
| **TypeScript**             | Adds strong typing to improve maintainability         |
| **Vite**                   | Modern development server and build tool              |
| **TailwindCSS**            | Utility-first CSS framework for styling               |
| **Recharts**               | Data visualization (BarChart, Tooltip, Axes, Grid)    |
| **Zustand**                | Lightweight global state management for selected rows |
| **@tanstack/react-query**  | Data fetching and caching                             |
| **PostCSS / Autoprefixer** | For TailwindCSS and cross-browser support             |



Visual Components:

BarChart Panel — Displays earthquake depth or magnitude comparison for top 20 entries.

DataTable — Shows parsed data with sorting and selection sync.

Controls — Dropdowns to dynamically switch X/Y axes (e.g., “Magnitude” vs “Depth”).


Known Issues & Fixes:
| Issue                               | Root Cause                        | Fix Applied                                                       |
| ----------------------------------- | --------------------------------- | ----------------------------------------------------------------- |
| `row.mag.toFixed is not a function` | Some CSV values parsed as strings | Added type conversion with `Number()` and value checks            |
| `useQuery bad argument type`        | TanStack Query v5 API changed     | Updated `useQuery` usage to object syntax                         |
| Chart width/height warning          | Missing container dimensions      | Wrapped chart with `ResponsiveContainer` and added `aspect` ratio |
| Hooks order warning                 | Conditional hooks execution       | Refactored to maintain consistent hook order                      |
| CRLF vs LF warnings                 | Git line ending differences       | Added `.gitattributes` to normalize line endings                  |





How AI Helped in Development:

AI tools (ChatGPT GPT-5) were used thoughtfully during development for:

Debugging complex React errors — such as hook order violations and useQuery migration to v5 syntax.

Optimizing chart interactivity — improved onClick handlers and highlighting behavior.

Improving visual appeal — TailwindCSS adjustments and Recharts styling suggestions.

Error analysis and code refactoring — AI explanations for common console warnings.

Documentation generation — this README was co-authored with ChatGPT for clarity and completeness.

All code was tested, reviewed, and manually verified before committing to ensure understanding and correctness.



Lessons Learned:

Handling real-time CSV parsing and ensuring correct data types is critical.

Maintaining consistent React hook order avoids render crashes.

Zustand and React Query work elegantly together for state + data fetching.

Tailwind’s ResponsiveContainer simplifies making Recharts graphs fully responsive.



