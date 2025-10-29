import React, { useState, useMemo } from "react";
import type { EarthquakeRow } from "../types";
import { useSelectionStore } from "../store/useSelectionStore";

/**
 * DataTable Component
 * -------------------
 * Displays earthquake data in a sortable, filterable table.
 * Includes CSV download, selection highlighting, and improved formatting.
 */
export const DataTable: React.FC<{ data: EarthquakeRow[] }> = ({ data }) => {
  const { selectedId, setSelectedId } = useSelectionStore();
  const [filter, setFilter] = useState("");

  // ⬇️ Filter data based on user input
  const filteredData = useMemo(() => {
    const lower = filter.toLowerCase();
    return data.filter((row) => row.place?.toLowerCase().includes(lower));
  }, [filter, data]);

  // ⬇️ CSV Export feature
  const handleDownloadCSV = () => {
    const headers = ["Time", "Place", "Magnitude", "Depth", "Latitude", "Longitude"];
    const csvRows = [
      headers.join(","),
      ...filteredData.map((row) =>
        [
          `"${row.time}"`,
          `"${row.place}"`,
          row.mag,
          row.depth,
          row.latitude,
          row.longitude,
        ].join(",")
      ),
    ];
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "earthquake_data.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full overflow-y-auto text-gray-100 bg-gray-900 p-3 rounded-lg shadow-inner">
      {/* Header and Controls */}
      <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
        <h2 className="text-lg font-semibold">Data Table</h2>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Filter by place..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 text-sm bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-sky-500"
          />
          <button
            onClick={handleDownloadCSV}
            className="p-2 text-sm bg-sky-600 hover:bg-sky-700 rounded text-white font-medium transition-colors"
          >
            ⬇️ Export CSV
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="sticky top-0 bg-gray-800 text-gray-300">
            <tr className="border-b border-gray-700">
              <th className="p-2 text-left">Time</th>
              <th className="p-2 text-left">Place</th>
              <th className="p-2 text-right">Mag</th>
              <th className="p-2 text-right">Depth</th>
              <th className="p-2 text-right">Lat</th>
              <th className="p-2 text-right">Lon</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((row) => {
              const isSelected = row.id === selectedId;
              return (
                <tr
                  key={row.id}
                  onClick={() => setSelectedId(row.id)}
                  className={`cursor-pointer transition-colors duration-150 ${
                    isSelected
                      ? "bg-sky-700/40 animate-pulse"
                      : "hover:bg-sky-800/30"
                  }`}
                >
                  <td className="p-2">{new Date(row.time).toLocaleString()}</td>
                  <td className="p-2">{row.place}</td>
                  <td className="p-2 text-right">
                    {isNaN(Number(row.mag))
                      ? "-"
                      : Number(row.mag).toFixed(2)}
                  </td>
                  <td className="p-2 text-right">
                    {isNaN(Number(row.depth))
                      ? "-"
                      : Number(row.depth).toFixed(2)}
                  </td>
                  <td className="p-2 text-right">
                    {isNaN(Number(row.latitude))
                      ? "-"
                      : Number(row.latitude).toFixed(3)}
                  </td>
                  <td className="p-2 text-right">
                    {isNaN(Number(row.longitude))
                      ? "-"
                      : Number(row.longitude).toFixed(3)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* No Data Message */}
      {filteredData.length === 0 && (
        <div className="text-center text-gray-400 mt-4">
          No matching results found.
        </div>
      )}
    </div>
  );
};
