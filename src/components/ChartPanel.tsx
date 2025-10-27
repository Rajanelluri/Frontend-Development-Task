import React, { useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { EarthquakeRow } from '../types';
import { useSelectionStore } from '../store/useSelectionStore';
import { useSelection } from '../context/SelectionContext';

export const ChartPanel: React.FC<{ data: EarthquakeRow[]; xKey: string; yKey: string; onPointClick?: (id:string)=>void }> = ({ data, xKey, yKey, onPointClick }) => {
  const { selectedId, setSelectedId } = useSelectionStore();
  const { setSelected } = useSelection();

  const points = useMemo(() => data.map(d => ({ x: d[xKey as keyof EarthquakeRow] as number, y: d[yKey as keyof EarthquakeRow] as number, id: d.id, mag: d.mag })), [data, xKey, yKey]);

  return (
    <div className="h-full p-3">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart>
          <XAxis type="number" dataKey="x" name={xKey} />
          <YAxis type="number" dataKey="y" name={yKey} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter
            data={points}
            fill="#8884d8"
            onClick={(e) => {
              // e has payload with id
              const id = (e as any).id;
              setSelectedId(id);
              setSelected(id);
              onPointClick?.(id);
            }}
            shape={(props: any) => {
              const isSelected = props.payload.id === selectedId;
              const r = isSelected ? 8 : Math.max(3, Math.min(12, (props.payload.mag || 1) * 2));
              return <circle cx={props.cx} cy={props.cy} r={r} fill={isSelected ? '#f97316' : '#60a5fa'} />;
            }}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};
