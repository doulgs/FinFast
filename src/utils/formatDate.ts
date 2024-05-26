import { format, parseISO } from "date-fns";

export const formatDateTime = (dateTimeString: string): string => {
  const date = parseISO(dateTimeString);
  return format(date, "dd/MM/yyyy");
};
