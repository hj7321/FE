import { create } from "zustand";

interface ScheduleItem {
  placeName: string;
  time: string;
}

interface ScheduleState {
  schedule: { [key: string]: ScheduleItem[] };
  addItem: (time: string, item: ScheduleItem) => void;
}

export const useScheduleStore = create<ScheduleState>()((set) => ({
  schedule: {},
  addItem: (time: string, item: ScheduleItem) =>
    set((state) => ({
      schedule: {
        ...state.schedule,
        [time]: [...(state.schedule[time] || []), item],
      },
    })),
}));
