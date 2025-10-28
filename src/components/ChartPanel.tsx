import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import type { EarthquakeRow } from "../types";
import { useSelectionStore } from "../store/useSelectionStore";
import { useSelection } from "../context/SelectionContext";

/**
 * ChartPanel Component
 * --------------------
 * Displays a responsive Bar Chart of earthquake data
 * with dynamic coloring, hover tooltips, and selection highlighting.
 */
export const ChartPanel: React.FC<{
  data: EarthquakeRow[];
  xKey: string;
  yKey: string;
  onPointClick?: (id: string) => void;
}> = ({ data, xKey, yKey, onPointClick }) => {
  const { selectedId, setSelectedId } = useSelectionStore();
  const { setSelected } = useSelection();

  // Prepare and clean data for the chart
  const chartData = useMemo(() => {
    return (
      data
        // ensure the selected Y field is numeric
        .filter((d) => !isNaN(Number(d[yKey as keyof EarthquakeRow])))
        // take top 20 records for readability
        .slice(0, 20)
        .map((d) => ({
          id: d.id,
          name: d.place?.length > 18 ? d.place.slice(0, 18) + "…" : d.place || "Unknown",
          value: Number(d[yKey as keyof EarthquakeRow]) || 0,
          mag: Number(d.mag) || 0,
        }))
    );
  }, [data, yKey]);

  return (
    <div className="flex-1 min-h-[350px] p-3 bg-gray-900 rounded-lg shadow-inner">
      <ResponsiveContainer width="100%" aspect={2}>
        <BarChart
          data={chartData}
          key={yKey}
          margin={{ top: 20, right: 30, bottom: 60, left: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            interval={0}
            height={70}
            tick={{ fill: "#94a3b8", fontSize: 11 }}
          />
          <YAxis
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            label={{
              value: yKey.toUpperCase(),
              angle: -90,
              position: "insideLeft",
              fill: "#cbd5e1",
            }}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.05)" }}
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #475569",
              color: "#f8fafc",
              borderRadius: "0.5rem",
            }}
            formatter={(value, name) => [
              Number(value).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              }),
              yKey,
            ]}
          />
          <Bar
            dataKey="value"
            radius={[6, 6, 0, 0]}
            onClick={(entry) => {
              setSelectedId(entry.id);
              setSelected(entry.id);
              onPointClick?.(entry.id);
            }}
          >
            {chartData.map((entry) => {
              // Dynamic bar colors based on magnitude
              const color =
                entry.mag >= 5
                  ? "#ef4444" // red for high magnitude
                  : entry.mag >= 3
                  ? "#facc15" // yellow for medium
                  : "#38bdf8"; // blue for low
              const isSelected = entry.id === selectedId;

              return (
                <Cell
                  key={`cell-${entry.id}`}
                  fill={isSelected ? "#f97316" : color}
                  stroke={isSelected ? "#fbbf24" : "none"}
                  strokeWidth={isSelected ? 2 : 0}
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
