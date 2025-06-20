import { DailySchedule, ScheduledPlace } from "../types/schedule.type";
import { DetailSchedule } from "../types/travelPlan.type";

/** 백엔드 배열(DetailSchedule[]) → 프론트 맵 구조({[daySeq]: DailySchedule}) 변환 */
export function parseDetailSchedule(detail: DetailSchedule[]): {
  [daySeq: number]: DailySchedule;
} {
  const out: { [d: number]: DailySchedule } = {};

  detail.forEach(({ daySeq, scheduleByDay }) => {
    /* 하루치 초기화 */
    if (!out[daySeq]) out[daySeq] = {};

    scheduleByDay.forEach((item) => {
      /** 1) HH / mm 추출 & 0 패딩 */
      const [shh, smm] = item.startTime.slice(0, 5).split(":");
      const [ehh, emm] = item.endTime.slice(0, 5).split(":");
      const startHour = shh.padStart(2, "0");
      const endHour = ehh.padStart(2, "0");

      /** 2) 타임라인 key → "09 : 00" */
      const timeKey = `${startHour} : 00`;

      /** 3) 카드 객체 */
      const card: ScheduledPlace = {
        placeName: item.placeName,
        placeType: item.placeType ?? "",
        period: `${startHour}:${smm.padStart(
          2,
          "0"
        )} ~ ${endHour}:${emm.padStart(2, "0")}`, // 공백 없는 “HH:mm ~ HH:mm”
        placeId: item.placeId ?? "",
        address: item.address ?? "",
        latitude: item.latitude ?? 0,
        longitude: item.longitude ?? 0,
      };

      /** 4) push */
      (out[daySeq][timeKey] ??= []).push(card);
    });
  });

  return out;
}
