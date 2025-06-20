import { ScheduledPlace } from "../types/schedule.type";

export const buildDropPlaceHandler =
  (
    dayNum: number,
    addPlaceToSchedule: (
      daySeq: number,
      time: string,
      place: ScheduledPlace
    ) => void
  ) =>
  (
    time: string,
    placeName: string,
    placeType: string,
    placeId: string,
    address: string,
    latitude: number,
    longitude: number
  ) => {
    /* ① "07 : 00" → "07" */
    const [startHour] = time.split(" : ");

    /* ② period = "07:00 ~ 08:00" (띄어쓰기 없음) */
    const start = `${startHour.padStart(2, "0")}:00`;
    const end = `${(parseInt(startHour, 10) + 1)
      .toString()
      .padStart(2, "0")}:00`;
    const period = `${start} ~ ${end}`;

    /* ③ 카드 객체 생성 */
    addPlaceToSchedule(dayNum, time, {
      placeName,
      placeType,
      period,
      placeId,
      address,
      latitude,
      longitude,
    });
  };
