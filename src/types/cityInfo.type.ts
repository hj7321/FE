// 공통 정보 타입
export type CityInfo = {
  항공: string;
  시차: string;
  비자: string;
  여권만료조건: string;
  전압: string;
  변환: "필수" | "선택" | "불필요";
};

export type NestedCityInfo = {
  [cityName: string]: CityInfo;
};

// 전체 국가 정보 타입
export type CountryCityInfo = {
  [countryName: string]: CityInfo | NestedCityInfo;
};
