import { type ClassValue, clsx } from "clsx";
import { format, startOfDay } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function dateTimeMerge(date: Date, time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  const merged = new Date(date);
  merged.setHours(hours, minutes);
  return merged.toISOString();
}

export function dateTimeSplit(datetime: string) {
  const dateObj = new Date(datetime);
  const date = startOfDay(dateObj);
  const time = format(dateObj, "HH:mm");
  return { date, time };
}
