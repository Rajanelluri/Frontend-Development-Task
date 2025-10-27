import React, { useRef, useEffect } from 'react';
import type { EarthquakeRow } from '../types';
import { useSelectionStore } from '../store/useSelectionStore';
import { useSelection } from '../context/SelectionContext';

export const DataTable: React.FC<{ data: EarthquakeRow[] }> = ({ data }) => {
  const { selectedId, setSelectedId, filterText } = useSelectionStore();
  const { selected, setSelected } = useSelection();
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = data.filter(d => (d.place || '').toLowerCase().includes((filterText || '').toLowerCase()));

  useEffect(() => {
    // Scroll selected into view
    if (!selectedId) return;
    const el = containerRef.current?.querySelector(`[data-id="${selectedId}"]`);
    if (el && containerRef.current) {
      (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedId]);

  return (
    <div className="h-full overflow-auto" ref={containerRef}>
      <table className="min-w-full text-sm">
        <thead className="sticky top-0 bg-white">
          <tr>
            <th className="p-2">Time</th>
            <th className="p-2">Place</th>
            <th className="p-2">Mag</th>
            <th className="p-2">Depth</th>
            <th className="p-2">Lat</th>
            <th className="p-2">Lon</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((r) => {
            const isSel = r.id === selectedId;
            return (
              <tr
                key={r.id}
                data-id={r.id}
                onMouseEnter={() => { setSelectedId(r.id); setSelected(r.id); }}
                onClick={() => { setSelectedId(r.id); setSelected(r.id); }}
                className={`cursor-pointer ${isSel ? 'bg-orange-100' : ''}`}
              >
                <td className="p-2">{r.time}</td>
                <td className="p-2">{r.place}</td>
                <td className="p-2">{r.mag}</td>
                <td className="p-2">{r.depth}</td>
                <td className="p-2">{r.latitude.toFixed(3)}</td>
                <td className="p-2">{r.longitude.toFixed(3)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
