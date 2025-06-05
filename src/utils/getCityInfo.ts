import { CityInfo, NestedCityInfo } from "../types/cityInfo.type";

// 도시 이름과 키를 기반으로 해당 도시 기본 정보를 안전하게 추출하는 함수
export const getCityInfo = <K extends keyof CityInfo>(
  city: string, // 조회할 도시 이름 (예: "서울", "로마")
  countryData: CityInfo | NestedCityInfo, // 도시 정보를 담고 있는 객체 (단일 계층 또는 중첩 구조)
  key: K // 조회할 정보의 키 (예: "항공", "비자")
): CityInfo[K] | null => {
  // 반환 타입은 CityInfo의 키에 해당하는 값 또는 null

  // countryData가 객체이고, "항공"이라는 키가 없다면 => NestedCityInfo 구조로 간주함
  if (typeof countryData === "object" && !("항공" in countryData)) {
    // city가 존재하고, countryData에 해당 도시(city)의 정보가 있을 경우,
    // 해당 도시의 key에 해당하는 정보를 반환함
    if (city && countryData[city]) return countryData[city][key];
    else return null; // 도시 정보가 없으면 null을 반환함
  }

  // "비자"라는 키가 존재한다면 => 단일 CityInfo 구조로 간주함
  // 단일 CityInfo로 간주하고 key 값을 반환함
  if ("비자" in countryData) return (countryData as CityInfo)[key];

  return null; // 위 조건에 모두 해당하지 않으면 null을 반환함
};
