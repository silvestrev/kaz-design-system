export type ClassValue = string | false | null | undefined | 0;

/** Junta classes ignorando valores falsos. */
export function cx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ');
}
