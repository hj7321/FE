import { DailySchedule, ScheduledPlace } from "../types/schedule.type";
import { DetailSchedule } from "../types/travelPlan.type";

/** 백엔드 배열(DetailSchedule[]) → 프론트 맵 구조({[daySeq]: DailySchedule}) 변환 */
export function parseDetailSchedule(
  detail: DetailSchedule[] // 백엔드에서 받은 detailSchedule 배열
): { [daySeq: number]: DailySchedule } {
  const out: { [daySeq: number]: DailySchedule } = {}; // 변환 결과를 담을 객체

  detail.forEach(({ daySeq, scheduleByDay }) => {
    // detailSchedule 배열 순회
    const d = daySeq;
    out[d] = {}; // 날짜별 초기 맵 생성

    scheduleByDay.forEach((item) => {
      // 하루의 시간표 배열 순회
      const startRaw = item.startTime.slice(0, 5); // "HH:mm:ss" → "HH:mm" (시작)
      const endRaw = item.endTime.slice(0, 5); // "HH:mm:ss" → "HH:mm" (종료)
      const start = startRaw.replace(":", " : "); // "08 : 00"
      const end = endRaw.replace(":", " : "); // "09 : 00"
      const timeKey = start; // 내부 키로 시작 시각 사용

      // 프론트에서 사용할 카드 객체 생성
      const card: ScheduledPlace = {
        placeName: item.placeName, // 장소 이름
        placeType: item.placeType ?? "", // 장소 타입(없으면 빈문자)
        period: `${start} ~ ${end}`, // "HH:mm ~ HH:mm" 형태
        placeId: item.placeId ?? "", // Google placeId(옵션)
        address: item.address ?? "", // 주소(옵션)
        latitude: item.latitude ?? 0, // 위도(없으면 0)
        longitude: item.longitude ?? 0, // 경도(없으면 0)
      };

      // 같은 시간대 배열이 없으면 초기화 후 push
      (out[d][timeKey] ??= []).push(card);
    });
  });

  return out; // 최종 변환된 맵 반환
}
