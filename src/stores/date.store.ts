import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";

interface DateState {
  travelStartDate: Date | null;
  travelEndDate: Date | null;
  setDates: (startDate: Date, endDate: Date) => void;
  // resetDates: () => void;
}

export const useDateStore = create<DateState>()(
  // persist(
  (set) => ({
    travelStartDate: null,
    travelEndDate: null,
    setDates: (startDate: Date, endDate: Date) =>
      set({
        travelStartDate: startDate,
        travelEndDate: endDate,
      }),
    // resetDates: () => set({ travelStartDate: null, travelEndDate: null }),
  })
  //   {
  //     name: "travelDate-storage",
  //     storage: createJSONStorage(() => sessionStorage),
  //   }
  // )
);
