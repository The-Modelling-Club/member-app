import { format } from "date-fns";

export function formatDate(dateString: string, dateFormat = "PPP") {
  const date = new Date(dateString);
  return format(date, dateFormat);
}
