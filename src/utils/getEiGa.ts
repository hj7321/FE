export const getEiGa = (word: string): "이" | "가" => {
  if (!word) return "이"; // 빈 문자열 방어

  const lastChar = word.trim().slice(-1); // 마지막 글자
  const code = lastChar.charCodeAt(0);

  // 한글 완성형 범위(0xAC00 ~ 0xD7A3)가 아니면 기본적으로 '가'
  if (code < 0xac00 || code > 0xd7a3) return "가";

  // '가'(0xAC00)부터의 거리로 종성 유무 계산 (총 28가지 종성)
  const jong = (code - 0xac00) % 28;
  return jong === 0 ? "가" : "이";
};
