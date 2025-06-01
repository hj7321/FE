import { format } from "date-fns";
import { ko } from "date-fns/locale";

export const formatDate = (date: Date | null): string => {
  if (!date) return "-";
  return format(date, "MM/dd (EEE)", { locale: ko });
};
