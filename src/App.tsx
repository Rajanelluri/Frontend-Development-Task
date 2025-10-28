import React, { useState, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEarthquakeData } from "./hooks/useEarthquakeData";
import { ChartPanel } from "./components/ChartPanel";
import { DataTable } from "./components/DataTable";
import { Controls } from "./components/Controls";
import { SelectionProvider } from "./context/SelectionContext";
import { useSelectionStore } from "./store/useSelectionStore";

const queryClient = new QueryClient();

function AppContent() {
  const { data, isLoading, error } = useEarthquakeData();
  const [xKey, setXKey] = useState("mag");
  const [yKey, setYKey] = useState("depth");
  const [filter, setFilter] = useState("");
  useSelectionStore();

  // ⬇️ Always call hooks before conditional returns
  const filteredData = useMemo(() => {
    if (!data) return [];
    const lower = filter.toLowerCase();
    return data.filter((row) =>
      row.place.toLowerCase().includes(lower)
    );
  }, [data, filter]);

  // ⬇️ Now handle conditions via normal JSX
  let content: JSX.Element;
  if (isLoading) {
    content = <div className="p-8">Loading dataset...</div>;
  } else if (error) {
    content = <div className="p-8 text-red-600">Error: {(error as any).message}</div>;
  } else if (!data) {
    content = <div className="p-8">No data</div>;
  } else {
    content = (
      <div className="h-screen grid grid-cols-2 gap-2 bg-gray-950 text-gray-100">
        {/* Left: Chart */}
        <div className="border border-gray-700 rounded flex flex-col">
          <Controls xKey={xKey} yKey={yKey} setX={setXKey} setY={setYKey} />
          <div className="flex-1">
            <ChartPanel data={filteredData} xKey={xKey} yKey={yKey} />
          </div>
        </div>

        {/* Right: Table */}
        <div className="border border-gray-700 rounded flex flex-col">
          <div className="p-2 font-semibold flex justify-between items-center border-b border-gray-700">
            <span>Data Table</span>
            <input
              type="text"
              placeholder="Filter place..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-1 text-sm bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-sky-500"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            <DataTable data={filteredData} />
          </div>
        </div>
      </div>
    );
  }

  return content;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SelectionProvider>
        <AppContent />
      </SelectionProvider>
    </QueryClientProvider>
  );
}
