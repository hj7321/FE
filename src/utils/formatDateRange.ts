import { eachDayOfInterval, format } from "date-fns";
import { ko } from "date-fns/locale";

export const getDateMap = (
  startDate: Date,
  endDate: Date
): Record<number, string> => {
  const dates = eachDayOfInterval({ start: startDate, end: endDate });

  const result: Record<number, string> = {};

  dates.forEach((date, index) => {
    const formatted = format(date, "MM/dd (EEE)", { locale: ko });
    result[index + 1] = formatted;
  });

  return result;
};
