export function getRoEuro(word: string): "로" | "으로" {
  if (!word) return "으로"; // 빈 값 보호 (기본값은 '으로')

  const last = word[word.length - 1];
  const code = last.charCodeAt(0);

  // 한글 음절 범위가 아니면 안전하게 '으로' 선택
  if (code < 0xac00 || code > 0xd7a3) return "으로";

  // 종성(받침) 번호: 0이면 받침 없음, 8이면 받침 ㄹ
  const jong = (code - 0xac00) % 28;

  return jong === 0 || jong === 8 ? "로" : "으로";
}
