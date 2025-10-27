import create from 'zustand';
import type { EarthquakeRow } from '../types';

type State = {
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  filterText: string;
  setFilterText: (s: string) => void;
};

export const useSelectionStore = create<State>((set) => ({
  selectedId: null,
  setSelectedId: (id) => set({ selectedId: id }),
  filterText: '',
  setFilterText: (filterText) => set({ filterText }),
}));
