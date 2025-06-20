import { create } from "zustand";

interface EssentialSurveyState {
  people: number | null;
  startDate: string | null;
  endDate: string | null;
  budget: number | null;
  region: string | null;
  setPeople: (num: number | null) => void;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  setBudget: (budget: number | null) => void;
  setRegion: (region: string | null) => void;
  reset: () => void;
}

export const useEssentialSurveyStore = create<EssentialSurveyState>()(
  (set) => ({
    people: null,
    startDate: null,
    endDate: null,
    budget: null,
    region: null,
    setPeople: (num: number | null) => set({ people: num }),
    setStartDate: (date: string) => set({ startDate: date }),
    setEndDate: (date: string) => set({ endDate: date }),
    setBudget: (budget: number | null) => set({ budget }),
    setRegion: (region: string | null) => set({ region }),
    reset: () =>
      set({
        people: null,
        startDate: null,
        endDate: null,
        budget: null,
      }),
  })
);
