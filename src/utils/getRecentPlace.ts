import { CookieSavePlace } from "../types/place.type";

export const getRecentPlaces = (): CookieSavePlace[] => {
  const cookieName = "recent_places";

  const cookies = document.cookie.split("; ").reduce((acc, curr) => {
    const [key, value] = curr.split("=");
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  if (cookies[cookieName]) {
    try {
      return JSON.parse(decodeURIComponent(cookies[cookieName]));
    } catch (e) {
      console.error("❌ 쿠키 파싱 에러:", e);
      return [];
    }
  }

  return [];
};
