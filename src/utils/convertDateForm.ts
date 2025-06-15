export const convertDateToISO = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

export const convertISOToDate = (isoString: string): Date => {
  return new Date(isoString);
};
