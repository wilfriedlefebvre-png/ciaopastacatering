import { addHours, isBefore } from "date-fns";

import { MIN_LEAD_TIME_HOURS } from "./config";

export function enforceLeadTime(selected: Date, now = new Date()) {
  const min = addHours(now, MIN_LEAD_TIME_HOURS);
  return !isBefore(selected, min); // true if OK
}

