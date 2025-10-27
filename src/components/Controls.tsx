import React from 'react';
import { useSelectionStore } from '../store/useSelectionStore';

export const Controls: React.FC<{ xKey: string; yKey: string; setX: (k:string)=>void; setY:(k:string)=>void }> = ({ xKey, yKey, setX, setY }) => {
  const { filterText, setFilterText } = useSelectionStore();
  return (
    <div className="flex gap-4 items-center p-2">
      <label> X:
        <select value={xKey} onChange={e => setX(e.target.value)} className="ml-2 p-1 border rounded">
          <option value="mag">Magnitude</option>
          <option value="depth">Depth</option>
          <option value="latitude">Latitude</option>
        </select>
      </label>
      <label> Y:
        <select value={yKey} onChange={e => setY(e.target.value)} className="ml-2 p-1 border rounded">
          <option value="depth">Depth</option>
          <option value="mag">Magnitude</option>
          <option value="longitude">Longitude</option>
        </select>
      </label>
      <input
        className="ml-auto p-1 border rounded"
        placeholder="filter place..."
        value={filterText}
        onChange={(e)=>setFilterText(e.target.value)}
      />
    </div>
  );
};
