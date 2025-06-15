// 교통수단 타입
export type Transportation = "버스" | "택시" | "지하철" | "렌트카" | "도보";

// 여행 목적, 숙소, 음식점 선호도 구조
export type PreferenceCategory = {
  prefer: string[];
  nonPrefer: string[];
};

// 전체 Preference 구조
export type TravelPreference = {
  travelPurpose: PreferenceCategory;
  accommodation: PreferenceCategory;
  restaurant: PreferenceCategory;
};

// 여행 기간 구조
export type TravelPeriod = {
  startDate: string; // "YYYY-MM-DD"
  endDate: string; // "YYYY-MM-DD"
};

// 전체 여행 계획 타입
export type TravelPlanPreferences = {
  numOfPeople: number;
  travelPeriod: TravelPeriod;
  travelBudget: number;
  transportation: Transportation[];
  preference: TravelPreference;
};
