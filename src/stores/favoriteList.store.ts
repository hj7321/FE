import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type FavoriteItem = {
  placeName: string;
  placeImg: string;
};

interface FavoriteListState {
  favoriteList: FavoriteItem[];
  addFavoriteList: (placeName: string, placeImg: string) => void;
  deleteFavoriteList: (placeName: string, placeImg: string) => void;
  resetFavoriteList: () => void;
}

export const useFavoriteListStore = create<FavoriteListState>()(
  persist(
    (set, get) => ({
      favoriteList: [],
      addFavoriteList: (placeName: string, placeImg: string) => {
        const currentList = get().favoriteList;

        // 중복 추가 방지
        const isDuplicate = currentList.some(
          (item) => item.placeName === placeName && item.placeImg === placeImg
        );
        if (isDuplicate) return;

        set({ favoriteList: [...currentList, { placeName, placeImg }] });
      },
      deleteFavoriteList: (placeName: string, placeImg: string) => {
        const currentList = get().favoriteList;

        set({
          favoriteList: currentList.filter(
            (item) => item.placeName !== placeName && item.placeImg !== placeImg
          ),
        });
      },
      resetFavoriteList: () => set({ favoriteList: [] }),
    }),
    {
      name: "favorite-list",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
