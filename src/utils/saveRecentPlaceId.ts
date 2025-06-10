import { countryCodeMap, regionCodeMap } from "../constants/numCodeMaps";

export const saveRecentPlaceId = (
  placeId: string,
  countryName: string,
  regionName: string
): void => {
  const cookieName = "recent_places"; // 저장할 쿠키의 이름을 정의함
  const maxItems = 30; // 최대 저장 가능한 장소 개수: 30개
  const maxAgeSeconds = 60 * 60 * 12; // 쿠키 유효 시간: 12시간(초 단위)

  // 국가명/지역명을 숫자 코드로 변환
  const countryCode = countryCodeMap[countryName];
  const regionCode = regionCodeMap[regionName];

  // 유효한 코드가 없으면 경고 로그 출력 후 함수 종료
  if (!countryCode || !regionCode) {
    console.warn("국가 또는 지역 코드가 없습니다:", countryName, regionName);
    return;
  }

  // 장소 ID와 국가/지역 코드를 조합해 하나의 고유한 문자열로 구성
  const fullId = `${placeId}:${countryCode}:${regionCode}`;

  // 🍪 쿠키 파싱: string → Record<string, string>
  // 현재 브라우저 쿠키 문자열을 파싱해서 객체 형태로 변환
  const cookies: Record<string, string> = document.cookie
    .split("; ")
    .reduce((acc, curr) => {
      const [key, value] = curr.split("=");
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

  // 쿠키에 recent_places 값이 있으면 디코딩해서 배열로 변환하고, 없으면 빈 배열로 초기화
  let placeList: string[] = cookies[cookieName]
    ? decodeURIComponent(cookies[cookieName]).split(",")
    : [];

  // 중복 제거 후 최신 항목 맨 앞에 추가
  placeList = placeList.filter((id) => id !== fullId);
  placeList.unshift(fullId);

  // 최대 저장 개수 초과 시 잘라냄
  if (placeList.length > maxItems) {
    placeList = placeList.slice(0, maxItems);
  }

  // recent_places 쿠키를 업데이트함: 목록을 ,로 join해서 저장함
  // 경로는 모든 경로(/)로 설정, 유효 시간도 설정(max-age)
  document.cookie = `${cookieName}=${encodeURIComponent(
    placeList.join(",")
  )}; path=/; max-age=${maxAgeSeconds}`;
};
