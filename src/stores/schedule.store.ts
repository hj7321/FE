import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { DailySchedule, ScheduledPlace } from "../types/schedule.type";
import { Schedule } from "../types/travelPlan.type";
import { MarkerDTO } from "../types/map.type";
import { persist } from "zustand/middleware";

interface ScheduleStore {
  isEditMode: boolean;
  setEditModeOn: () => void;
  setEditModeOff: () => void;
  isAIMode: boolean;
  setAIModeOn: () => void;
  setAIModeOff: () => void;
  meta: Schedule | null;
  setMeta: (meta: Schedule) => void;
  schedule: {
    [daySeq: number]: DailySchedule; // daySeq는 일자 번호 (예: 0, 1, 2), 그 안에 시간별 스케줄이 있음
  };
  setSchedule: (newSchedule: ScheduleStore["schedule"]) => void; // 전체 스케줄 통째로 설정 (사용자가 저장한 여행 데이터를 백엔드에서 받아올 때 사용)
  addPlaceToSchedule: (
    daySeq: number,
    time: string,
    place: ScheduledPlace
  ) => void; // 특정 날짜, 시간대에 장소(일정) 하나 추가
  updatePlacePeriod: (
    daySeq: number,
    oldTime: string,
    newPeriod: string,
    index: number
  ) => void; // 기존 일정의 시간을 이동
  removePlaceFromSchedule: (
    daySeq: number,
    time: string,
    index: number
  ) => void; // 특정 날짜, 시간대에서 일정 하나 삭제
  moveScheduleCard: (
    daySeq: number,
    fromTime: string,
    toTime: string,
    fromIndex: number,
    toIndex: number,
    newPeriod?: string
  ) => void; // 시간대 간 이동
  reorderScheduleCard: (
    daySeq: number,
    time: string,
    fromIndex: number,
    toIndex: number
  ) => void; // 같은 시간대 내 순서 변경
  resetAll: () => void;
}

export const useScheduleStore = create<ScheduleStore>()(
  persist(
    (set) => ({
      isEditMode: false,
      setEditModeOn: () => set({ isEditMode: true }),
      setEditModeOff: () => set({ isEditMode: false }),
      isAIMode: false,
      setAIModeOn: () => set({ isAIMode: true }),
      setAIModeOff: () => set({ isAIMode: false }),
      meta: null,
      setMeta: (meta) => set({ meta }),
      schedule: {}, // 초기 스케줄은 빈 객체

      // 전체 스케줄을 통째로 새로운 객체로 교체
      setSchedule: (newSchedule) => set({ schedule: newSchedule }),

      // 특정 날짜(daySeq)의 특정 시간(time)에 장소(place)를 추가하는 함수
      addPlaceToSchedule: (daySeq, time, place) =>
        set((state) => ({
          schedule: {
            ...state.schedule, // 기존 전체 schedule 복사
            [daySeq]: {
              ...state.schedule[daySeq], // 해당 날짜의 기존 스케줄 복사
              [time]: [
                ...(state.schedule[daySeq]?.[time] || []), // 해당 시간에 이미 있는 장소 목록 (없으면 빈 배열)
                place, // 새로 추가할 장소
              ],
            },
          },
        })),

      // 특정 날짜(daySeq)의 특정 시간대(oldTime)에 있는 장소(index)의 period를 newPeriod로 변경하는 함수
      updatePlacePeriod: (daySeq, oldTime, newPeriod, index) =>
        set((state) => {
          // 유효성 검사
          const match = newPeriod.match(/^(\d{2}):(\d{2}) ~ (\d{2}):(\d{2})$/);
          if (!match) return state;
          const [, sh, sm, eh, em] = match;
          const start = Number(sh) * 60 + Number(sm);
          const end = Number(eh) * 60 + Number(em);
          if (start >= end) return state;

          const current = state.schedule[daySeq]?.[oldTime];
          if (!current || !current[index]) return state;

          const newTime = oldTime.includes(" : ")
            ? `${sh} : ${sm}`
            : `${sh}:${sm}`;
          const placeToMove = { ...current[index], period: newPeriod };

          // 새로운 스케줄 객체 생성 (불변성 유지)
          const newSchedule = { ...state.schedule };

          // 1. 해당 날짜의 스케줄 복사
          newSchedule[daySeq] = { ...newSchedule[daySeq] };

          // 2. 기존 시간대에서 항목 제거
          newSchedule[daySeq][oldTime] = current.filter((_, i) => i !== index);

          // 3. 기존 시간대가 비었으면 삭제
          if (newSchedule[daySeq][oldTime].length === 0) {
            delete newSchedule[daySeq][oldTime];
          }

          // 4. 새 시간대에 항목 추가
          newSchedule[daySeq][newTime] = [
            ...(newSchedule[daySeq][newTime] || []),
            placeToMove,
          ];

          return { schedule: newSchedule };
        }),

      // 특정 날짜(daySeq), 특정 시간대(time)의 일정에서 특정 장소(index)를 삭제하는 함수
      removePlaceFromSchedule: (daySeq, time, index) =>
        set((state) => {
          const current = state.schedule[daySeq]?.[time];
          if (!current) return state;

          const updated = [...current];
          updated.splice(index, 1); // 해당 index의 장소를 제거

          const newDaySchedule = {
            ...state.schedule[daySeq],
            [time]: updated,
          };

          // 만약 삭제 후 해당 시간대에 아무 장소도 없다면 시간대 자체 제거
          if (updated.length === 0) {
            delete newDaySchedule[time];
          }

          return {
            schedule: {
              ...state.schedule,
              [daySeq]: newDaySchedule,
            },
          };
        }),

      moveScheduleCard: (
        daySeq,
        fromTime,
        toTime,
        fromIndex,
        toIndex,
        newPeriod
      ) =>
        set((state) => {
          /* 시간대가 같으면 reorder 로 처리하므로 여기선 무시 */
          if (fromTime === toTime) return state;

          /* 1️⃣ 하루치 스케줄 깊은 복사 */
          const day = { ...(state.schedule[daySeq] ?? {}) };

          /* 2️⃣ source 배열에서 카드 꺼내기 */
          const fromArr = [...(day[fromTime] ?? [])];
          const target = fromArr.splice(fromIndex, 1)[0];
          if (!target) return state; // 잘못된 인덱스 guard

          /* 3️⃣ period 수정 (필요할 때만) */
          const movedCard = { ...target, period: newPeriod ?? target.period };

          /* 4️⃣ fromTime 배열이 비면 key 제거 */
          if (fromArr.length) day[fromTime] = fromArr;
          else delete day[fromTime];

          /* 5️⃣ dest 배열에 삽입 */
          const toArr = [...(day[toTime] ?? [])];
          const safeIndex = Math.max(0, Math.min(toArr.length, toIndex)); // 범위 보정
          toArr.splice(safeIndex, 0, movedCard);
          day[toTime] = toArr;

          /* 6️⃣ 최종 상태 반환 */
          return {
            schedule: {
              ...state.schedule,
              [daySeq]: day,
            },
          };
        }),

      reorderScheduleCard: (daySeq, time, fromIndex, toIndex) =>
        set((state) => {
          if (fromIndex === toIndex) return state; // 같은 위치면 아무것도 안 함
          const list = [...(state.schedule[daySeq]?.[time] || [])];
          if (!list[fromIndex]) return state;
          const [moved] = list.splice(fromIndex, 1);
          list.splice(toIndex, 0, moved);

          return {
            schedule: {
              ...state.schedule,
              [daySeq]: {
                ...state.schedule[daySeq],
                [time]: list,
              },
            },
          };
        }),

      resetAll: () =>
        set({
          isEditMode: false,
          meta: null,
          schedule: {}, // ✨ 핵심: 스케줄 비우기
        }),
    }),
    {
      name: "schedule-storage", // localStorage에 저장될 key
      // 필요하다면 partialize, version 등 옵션 추가 가능
    }
  )
);
export const useScheduleMarkers: () => MarkerDTO[] = () =>
  useScheduleStore(
    (state) => {
      const out: MarkerDTO[] = [];

      Object.entries(state.schedule).forEach(([dayKey, byTime]) => {
        const daySeq = Number(dayKey);
        let order = 1;

        Object.keys(byTime)
          .sort() // 시간 순서
          .forEach((t) => {
            byTime[t].forEach((p) => {
              if (p.latitude === 0 && p.longitude === 0) return; // 좌표 없는 카드 skip
              out.push({
                id: `${daySeq}-${t}-${order}`,
                daySeq,
                order: order++,
                lat: p.latitude,
                lng: p.longitude,
                placeName: p.placeName,
              });
            });
          });
      });

      return out;
    },
    //@ts-ignore
    shallow // equality 함수는 여기서 한 번만!
  );
