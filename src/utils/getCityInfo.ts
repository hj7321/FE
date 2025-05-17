import { CityInfo, NestedCityInfo } from "../types/cityInfo.type";

// 도시 이름과 키를 기반으로 해당 여행 정보를 안전하게 추출하는 함수
export const getCityInfo = <K extends keyof CityInfo>(
  city: string,
  countryData: CityInfo | NestedCityInfo,
  key: K
): CityInfo[K] | null => {
  if (typeof countryData === "object" && !("항공" in countryData)) {
    if (city && countryData[city]) return countryData[city][key];
    else return null;
  }

  if ("비자" in countryData) return (countryData as CityInfo)[key];

  return null;
};
