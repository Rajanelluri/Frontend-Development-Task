import React from "react";

interface ControlsProps {
  xKey: string;
  yKey: string;
  setX: (key: string) => void;
  setY: (key: string) => void;
  filter: string;
  setFilter: (value: string) => void;
}

export const Controls: React.FC<ControlsProps> = ({ xKey, yKey, setX, setY, filter, setFilter }) => {
  const keys = ["mag", "depth", "lat", "lon"];

  return (
    <div className="flex gap-2 p-2 bg-gray-800 border-b border-gray-700">
      <label>
        X:
        <select value={xKey} onChange={(e) => setX(e.target.value)} className="ml-1 bg-gray-700 p-1 rounded">
          {keys.map((k) => (
            <option key={k} value={k}>
              {k.charAt(0).toUpperCase() + k.slice(1)}
            </option>
          ))}
        </select>
      </label>
      <label>
        Y:
        <select value={yKey} onChange={(e) => setY(e.target.value)} className="ml-1 bg-gray-700 p-1 rounded">
          {keys.map((k) => (
            <option key={k} value={k}>
              {k.charAt(0).toUpperCase() + k.slice(1)}
            </option>
          ))}
        </select>
      </label>

      <input
        type="text"
        placeholder="Filter place..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="ml-auto bg-gray-700 text-gray-100 px-2 py-1 rounded"
      />
    </div>
  );
};
