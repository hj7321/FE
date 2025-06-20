import { create } from "zustand";

interface DaySelectionState {
  selectedDay: number; // 1, 2, 3 …
  setSelectedDay: (d: number) => void;
}
export const useDaySelectionStore = create<DaySelectionState>()((set) => ({
  selectedDay: 1,
  setSelectedDay: (d) => set({ selectedDay: d }),
}));
