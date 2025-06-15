export const getEulReul = (word: string): "을" | "를" => {
  if (!word) return "를";
  const lastChar = word[word.length - 1];
  const code = lastChar.charCodeAt(0) - 0xac00;
  if (code < 0 || code > 11171) return "를"; // 한글 아님
  const hasBatchim = code % 28 !== 0;
  return hasBatchim ? "을" : "를";
};
