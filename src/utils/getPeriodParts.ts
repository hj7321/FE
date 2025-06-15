export const getPeriodParts = (period?: string) => {
  if (
    typeof period === "string" &&
    /^(\d{2}):(\d{2}) ~ (\d{2}):(\d{2})$/.test(period)
  ) {
    const [start, end] = period.split(" ~ ");
    const [startHour, startMin] = start.split(":");
    const [endHour, endMin] = end.split(":");
    return { startHour, startMin, endHour, endMin };
  }
  // 기본값: 00:00 ~ 01:00
  return { startHour: "00", startMin: "00", endHour: "01", endMin: "00" };
};
