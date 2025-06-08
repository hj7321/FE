import { CookieSavePlace } from "../types/place.type";

export const saveRecentPlace = (place: CookieSavePlace) => {
  const cookieName = "recent_places";
  const maxItems = 30;
  const maxAgeSeconds = 60 * 60 * 12; // 12시간

  // 쿠키 파싱
  const cookies = document.cookie.split("; ").reduce((acc, curr) => {
    const [key, value] = curr.split("=");
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  // 기존 목록 읽기
  let placeList: CookieSavePlace[] = [];

  try {
    const raw = cookies[cookieName];
    // JSON 포맷으로 저장된 것만 파싱 시도
    if (raw && raw.startsWith("%5B")) {
      // "%5B" = "[" → JSON 배열 시작임을 의미 (encodeURIComponent된 값)
      placeList = JSON.parse(decodeURIComponent(raw));
    }
  } catch (err) {
    console.error("❌ recent_places 쿠키 파싱 실패: 초기화합니다.", err);
    placeList = [];
  }
  // 중복 제거
  placeList = placeList.filter((p) => p.placeId !== place.placeId);

  // 맨 앞에 추가
  placeList.unshift(place);

  // 최대 개수 유지
  if (placeList.length > maxItems) {
    placeList = placeList.slice(0, maxItems);
  }

  // 쿠키로 저장
  document.cookie = `${cookieName}=${encodeURIComponent(
    JSON.stringify(placeList)
  )}; path=/; max-age=${maxAgeSeconds}`;
};
