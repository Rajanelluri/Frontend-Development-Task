import React, { createContext, useState, useContext } from 'react';
import type { EarthquakeRow } from '../types';

type Ctx = {
  selected: string | null;
  setSelected: (id: string | null) => void;
};
const SelectionContext = createContext<Ctx | undefined>(undefined);

export const SelectionProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [selected, setSelected] = useState<string | null>(null);
  return <SelectionContext.Provider value={{ selected, setSelected }}>{children}</SelectionContext.Provider>;
};

export const useSelection = () => {
  const c = useContext(SelectionContext);
  if (!c) throw new Error('useSelection must be used within SelectionProvider');
  return c;
};
