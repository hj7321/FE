export const getRecentPlaceIds = (): string[] => {
  const cookieName = "recent_places";

  const cookies = document.cookie.split("; ").reduce((acc, curr) => {
    const [key, value] = curr.split("=");
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  if (cookies[cookieName]) {
    try {
      return decodeURIComponent(cookies[cookieName]).split(",");
    } catch (e) {
      console.error("❌ 쿠키 디코딩 에러:", e);
      return [];
    }
  }

  return [];
};
