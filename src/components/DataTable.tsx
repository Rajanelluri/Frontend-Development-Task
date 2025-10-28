import React, { useState, useMemo } from "react";
import type { EarthquakeRow } from "../types";
import { useSelectionStore } from "../store/useSelectionStore";

export const DataTable: React.FC<{ data: EarthquakeRow[] }> = ({ data }) => {
  const { selectedId, setSelectedId } = useSelectionStore();
  const [filter, setFilter] = useState("");

  // Filter logic (case-insensitive)
  const filteredData = useMemo(() => {
    const lower = filter.toLowerCase();
    return data.filter((row) =>
      row.place.toLowerCase().includes(lower)
    );
  }, [filter, data]);

  return (
    <div className="h-full overflow-y-auto text-gray-100 bg-gray-900 p-3 rounded-lg shadow-inner">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">Data Table</h2>
        <input
          type="text"
          placeholder="filter place..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 text-sm bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-sky-500"
        />
      </div>

      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="text-gray-400 border-b border-gray-700">
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
                className={`cursor-pointer ${
                  isSelected ? "bg-sky-700/40" : "hover:bg-sky-800/30"
                }`}
              >
                <td className="p-2">{row.time}</td>
                <td className="p-2">{row.place}</td>
                <td className="p-2 text-right">
                   {Number(row.mag).toFixed(2)}
                </td>

                <td className="p-2 text-right">{row.depth}</td>
                <td className="p-2 text-right">{row.latitude}</td>
                <td className="p-2 text-right">{row.longitude}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
