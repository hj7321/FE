export type ScheduledPlace = {
  placeName: string;
  placeType: string;
  period: string; // 예: "09:00 ~ 10:00"
  placeId: string;
  address: string;
  latitude: number;
  longitude: number;
};

export type DailySchedule = {
  [time: string]: ScheduledPlace[];
};

export interface ScheduleStore {
  schedule: {
    [daySeq: number]: DailySchedule;
  };
  setSchedule: (newSchedule: ScheduleStore["schedule"]) => void;
  addPlaceToSchedule: (
    daySeq: number,
    time: string,
    place: ScheduledPlace
  ) => void;
  updatePlacePeriod: (
    daySeq: number,
    oldTime: string,
    newPeriod: string,
    index: number
  ) => void;
}
