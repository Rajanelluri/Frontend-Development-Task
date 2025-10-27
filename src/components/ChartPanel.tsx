import React, { useMemo } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  ZAxis,
} from "recharts";
import type { EarthquakeRow } from "../types";
import { useSelectionStore } from "../store/useSelectionStore";
import { useSelection } from "../context/SelectionContext";

export const ChartPanel: React.FC<{
  data: EarthquakeRow[];
  xKey: string;
  yKey: string;
  onPointClick?: (id: string) => void;
}> = ({ data, xKey, yKey, onPointClick }) => {
  const { selectedId, setSelectedId } = useSelectionStore();
  const { setSelected } = useSelection();

  // Map chart data
  const points = useMemo(
    () =>
      data
        .map((d) => ({
          x: Number(d[xKey as keyof EarthquakeRow]),
          y: Number(d[yKey as keyof EarthquakeRow]),
          id: d.id,
          mag: Number(d.mag) || 0,
          place: d.place,
        }))
        .filter((d) => !isNaN(d.x) && !isNaN(d.y)),
    [data, xKey, yKey]
  );

  // Compute dynamic domains for both axes
  const xDomain = [
    Math.min(...points.map((p) => p.x)),
    Math.max(...points.map((p) => p.x)),
  ];
  const yDomain = [
    Math.min(...points.map((p) => p.y)),
    Math.max(...points.map((p) => p.y)),
  ];

  return (
    <div className="h-full min-w-0 min-h-0 p-3 bg-gray-900 rounded-lg shadow-inner">
      <ResponsiveContainer width="100%" height="100%">
        {/* Key forces chart to re-render when X or Y variable changes */}
        <ScatterChart
          key={`${xKey}-${yKey}`}
          margin={{ top: 20, right: 20, bottom: 40, left: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            type="number"
            dataKey="x"
            name={xKey}
            domain={xDomain}
            label={{
              value: xKey.toUpperCase(),
              position: "insideBottom",
              offset: -10,
              fill: "#e2e8f0",
            }}
            tick={{ fill: "#94a3b8" }}
          />
          <YAxis
            type="number"
            dataKey="y"
            name={yKey}
            domain={yDomain}
            label={{
              value: yKey.toUpperCase(),
              angle: -90,
              position: "insideLeft",
              fill: "#e2e8f0",
            }}
            tick={{ fill: "#94a3b8" }}
          />
          <ZAxis type="number" dataKey="mag" range={[100, 800]} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #475569",
              color: "#f8fafc",
              borderRadius: "0.5rem",
            }}
            formatter={(value: any, name: any, props: any) => [
              value,
              name === "x"
                ? xKey
                : name === "y"
                ? yKey
                : name === "mag"
                ? "Magnitude"
                : name,
            ]}
          />

          {/* Data points */}
          <Scatter
            data={points}
            onClick={(e) => {
              const id = (e as any).id;
              setSelectedId(id);
              setSelected(id);
              onPointClick?.(id);
            }}
            shape={(props: any) => {
              const isSelected = props.payload.id === selectedId;
              const magnitude = props.payload.mag || 1;
              const radius = isSelected ? 10 : Math.max(4, magnitude * 2);
              const color = isSelected
                ? "#f97316" // orange
                : magnitude >= 5
                ? "#ef4444" // red for high magnitude
                : magnitude >= 3
                ? "#facc15" // yellow mid
                : "#38bdf8"; // blue for low magnitude
              return (
                <circle
                  cx={props.cx}
                  cy={props.cy}
                  r={radius}
                  fill={color}
                  stroke="#0f172a"
                  strokeWidth={1.5}
                />
              );
            }}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};
