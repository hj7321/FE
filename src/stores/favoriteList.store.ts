import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Place, PlaceId } from "../types/place.type";
interface FavoriteListState {
  countryName: string | null;
  regionName: string | null;
  addList: Place[]; // 장바구니 추가 api 요청할 목록 (새롭게 추가한 장소 카드들)
  deleteList: PlaceId[]; // 장바구니 삭제 api 요청할 목록 (기존에 있던 장소 카드들 중에서 삭제한 장소 카드들)
  oldFavoriteList: Place[]; // 기존 장바구니
  newFavoriteList: Place[]; // 새롭게 추가한 장바구니
  setCountryName: (country: string) => void;
  setRegionName: (region: string) => void;
  updateAddList: (place: Place) => void;
  updateDeleteList: (placeId: PlaceId) => void;
  addOldFavoriteList: (place: Place) => void; // 기존 장바구니에 장소 추가 함수
  addNewFavoriteList: (place: Place) => void; // 새롭게 추가한 장바구니에 장소 추가 함수
  deleteOldFavoriteList: (placeId: string) => void; // 기존 장바구니에서 장소 삭제 함수
  deleteNewFavoriteList: (placeId: string) => void; // 새롭게 추가한 장바구니에서 장소 삭제 함수
  resetName: () => void;
  resetAllList: () => void;
}

// Zustand 스토어 생성
export const useFavoriteListStore = create<FavoriteListState>()(
  persist(
    (set, get) => ({
      // 상태 변경(set), 현재 상태(get)를 받을 수 있음
      countryName: null,
      regionName: null,
      addList: [],
      deleteList: [],
      oldFavoriteList: [],
      newFavoriteList: [],
      setCountryName: (country) => set({ countryName: country }),
      setRegionName: (region) => set({ regionName: region }),
      updateAddList: (place) => {
        const updated = [...get().addList, place];
        set({ addList: updated });
      },
      updateDeleteList: (placeId) => {
        const updated = [...get().deleteList, placeId];
        set({ deleteList: updated });
      },
      addOldFavoriteList: (place) => {
        const currentList = get().oldFavoriteList;
        const isDuplicate = currentList.some(
          (item) => item.placeId === place.placeId
        );
        if (isDuplicate) return;

        set({ oldFavoriteList: [...currentList, place] }); // 새로운 배열로 대체
      },
      addNewFavoriteList: (place) => {
        const currentList = get().newFavoriteList;
        const isDuplicate = currentList.some(
          (item) => item.placeId === place.placeId
        );
        if (isDuplicate) return;

        set({ newFavoriteList: [...currentList, place] }); // 새로운 배열로 대체
      },
      deleteOldFavoriteList: (placeId) => {
        const currentList = get().oldFavoriteList;

        // 해당 placeId를 가진 항목 제거
        const filteredList = currentList.filter(
          (item) => item.placeId !== placeId
        );

        set({ oldFavoriteList: filteredList }); // 상태 업데이트
      },
      deleteNewFavoriteList: (placeId) => {
        const currentList = get().newFavoriteList;

        // 해당 placeId를 가진 항목 제거
        const filteredList = currentList.filter(
          (item) => item.placeId !== placeId
        );

        set({ newFavoriteList: filteredList }); // 상태 업데이트
      },
      resetName: () => set({ countryName: null, regionName: null }),
      resetAllList: () =>
        set({
          addList: [],
          deleteList: [],
          oldFavoriteList: [],
          newFavoriteList: [],
        }),
    }),
    {
      name: "favorite-list",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
