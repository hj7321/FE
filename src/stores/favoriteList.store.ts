import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Place, PlaceId } from "../types/place.type";

// 지역별로 old/new 장바구니을 구분해서 관리할 수 있도록 하는 타입 정의
interface PlaceList {
  oldFavoriteList: Place[]; // 기존 장바구니
  newFavoriteList: Place[]; // 새롭게 추가한 장바구니
}
interface FavoriteListState {
  regionMap: Record<string, PlaceList>; // 지역명을 key로 한 장바구니 객체
  addList: Place[];
  deleteList: PlaceId[];
  updateAddList: (place: Place) => void;
  updateDeleteList: (placeId: PlaceId) => void;
  addOldFavoriteList: (region: string, place: Place) => void; // 기존 장바구니에 장소 추가 함수
  addNewFavoriteList: (region: string, place: Place) => void; // 새롭게 추가한 장바구니에 장소 추가 함수
  deleteOldFavoriteList: (region: string, placeId: string) => void; // 기존 장바구니에서 장소 삭제 함수
  deleteNewFavoriteList: (region: string, placeId: string) => void; // 새롭게 추가한 장바구니에서 장소 삭제 함수
  resetFavoriteList: (region: string) => void; // 특정 지역 장바구니 초기화
  resetAllList: () => void;
  resetAllFavoriteList: () => void; // 전체 지역 장바구니 초기화
}

// Zustand 스토어 생성
export const useFavoriteListStore = create<FavoriteListState>()(
  persist(
    (set, get) => ({
      // 상태 변경(set), 현재 상태(get)를 받을 수 있음
      regionMap: {}, // 초기 상태: 지역별 장바구니를 저장하는 빈 객체
      addList: [],
      deleteList: [],
      updateAddList: (place) => get().addList.push(place),
      updateDeleteList: (placeId) => get().deleteList.push(placeId),
      addOldFavoriteList: (region, place) => {
        const regionMap = { ...get().regionMap }; // 기존 상태 복사
        // 해당 지역이 없으면 기본 구조로 초기화
        const currentList = regionMap[region] ?? {
          oldFavoriteList: [],
          newFavoriteList: [],
        };

        // 중복 추가 방지 (기존 장바구니에 이미 존재하는 경우 무시)
        const isDuplicate = currentList.oldFavoriteList.some(
          (item) => item.placeId === place.placeId
        );
        if (isDuplicate) return;

        // 중복이 아니면 기존 장바구니에 장소 추가
        currentList.oldFavoriteList.push(place);

        regionMap[region] = currentList; // 업데이트된 지역 데이터 저장
        set({ regionMap }); // 전체 상태 업데이트
      },
      addNewFavoriteList: (region, place) => {
        const regionMap = { ...get().regionMap }; // 기존 상태 복사
        // 해당 지역이 없으면 기본 구조로 초기화
        const currentList = regionMap[region] ?? {
          oldFavoriteList: [],
          newFavoriteList: [],
        };

        // 중복 추가 방지 (새롭게 추가한 장바구니에 이미 존재하는 경우 무시)
        const isDuplicate = currentList.newFavoriteList.some(
          (item) => item.placeId === place.placeId
        );
        if (isDuplicate) return;

        // 중복이 아니면 새롭게 추가한 장바구니에 장소 추가
        currentList.newFavoriteList.push(place);

        regionMap[region] = currentList; // 업데이트된 지역 데이터 저장
        set({ regionMap }); // 전체 상태 업데이트
      },
      deleteOldFavoriteList: (region, placeId) => {
        const regionMap = { ...get().regionMap }; // 기존 상태 복사
        const currentList = regionMap[region]; // 해당 지역의 목록 가져오기
        if (!currentList) return; // 지역 정보 없으면 종료

        // 해당 placeId를 가진 항목 제거
        currentList.oldFavoriteList = currentList.oldFavoriteList.filter(
          (item) => item.placeId !== placeId
        );

        regionMap[region] = currentList; // 업데이트된 지역 데이터 저장
        set({ regionMap }); // 상태 업데이트
      },
      deleteNewFavoriteList: (region, placeId) => {
        const regionMap = { ...get().regionMap }; // 기존 상태 복사
        const currentList = regionMap[region]; // 해당 지역의 목록 가져오기
        if (!currentList) return; // 지역 정보 없으면 종료

        // 해당 placeId를 가진 항목 제거
        currentList.newFavoriteList = currentList.newFavoriteList.filter(
          (item) => item.placeId !== placeId
        );

        regionMap[region] = currentList; // 업데이트된 지역 데이터 저장
        set({ regionMap }); // 상태 업데이트
      },
      resetFavoriteList: (region) => {
        const regionMap = { ...get().regionMap }; // 기존 상태 복사
        regionMap[region] = { oldFavoriteList: [], newFavoriteList: [] }; // 특정 지역 장바구니 리셋
        set({ regionMap }); // 상태 업데이트
      },
      resetAllList: () => set({ addList: [], deleteList: [] }),
      resetAllFavoriteList: () => set({ regionMap: {} }),
    }),
    {
      name: "favorite-list",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
