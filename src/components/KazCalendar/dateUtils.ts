export const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
export const addDays = (date: Date, days: number) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
export const addMonths = (date: Date, months: number) => new Date(date.getFullYear(), date.getMonth() + months, 1);
export const isSameDay = (a?: Date | null, b?: Date | null) =>
  Boolean(a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate());
export const isSameMonth = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();

/** 6 semanas completas a partir do mês de `month`. */
export function getMonthGrid(month: Date, weekStartsOn: number): Date[] {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const offset = (first.getDay() - weekStartsOn + 7) % 7;
  const start = addDays(first, -offset);
  return Array.from({ length: 42 }, (_, i) => addDays(start, i));
}

export function isBetween(day: Date, start?: Date | null, end?: Date | null) {
  if (!start || !end) return false;
  const t = startOfDay(day).getTime();
  return t > startOfDay(start).getTime() && t < startOfDay(end).getTime();
}
