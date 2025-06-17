export type TravelPlanId = {
  id: number;
};

export type MiniSchedule = {
  [time: string]: {
    placeName: string;
    placeType: string;
    period: string;
    placeId?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
  }[];
};

export type Schedule = {
  scheduleId: number;
  scheduleName: string;
  startDate: string;
  endDate: string;
  howManyPeople: number;
  countryName: string;
  regionName: string;
};

export type Plan = {
  plans: Schedule[];
};

export type ScheduleByDay = {
  locationSeq: number;
  startTime: string;
  endTime: string;
  placeId?: string;
  placeName: string;
  placeType?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  memo?: string | null;
};

export type DetailSchedule = {
  daySeq: number;
  scheduleByDay: ScheduleByDay[];
};

export type CreateTravelSchedule = {
  scheduleName: string;
  startDate: string;
  endDate: string;
  howManyPeople: number;
  countryName: string;
  regionName: string;
  detailSchedule: DetailSchedule[];
};

export type UpdateTravelSchedule = CreateTravelSchedule & {
  scheduleId: number;
};
