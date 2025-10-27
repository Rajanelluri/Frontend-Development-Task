import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEarthquakeData } from "./hooks/useEarthquakeData";
import { ChartPanel } from "./components/ChartPanel";
import { DataTable }   from "./components/DataTable";
import { Controls } from "./components/Controls";
import { SelectionProvider } from "./context/SelectionContext";
import { useSelectionStore } from "./store/useSelectionStore";

const queryClient = new QueryClient();

function AppContent() {
  const { data, isLoading, error } = useEarthquakeData();
  const [xKey, setXKey] = useState("mag");
  const [yKey, setYKey] = useState("depth");
  useSelectionStore();

  if (isLoading) return <div className="p-8">Loading dataset...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error.message}</div>;
  if (!data) return <div className="p-8">No data</div>;

  return (
    <div className="h-screen grid grid-cols-2 gap-2">
      <div className="border rounded flex flex-col">
        <Controls xKey={xKey} yKey={yKey} setX={setXKey} setY={setYKey} />
        <div className="flex-1">
          <ChartPanel data={data} xKey={xKey} yKey={yKey} />
        </div>
      </div>
      <div className="border rounded flex flex-col">
        <div className="p-2 font-semibold">Data Table</div>
        <div className="flex-1">
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
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
