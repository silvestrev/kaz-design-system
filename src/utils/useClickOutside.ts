import { useEffect, type RefObject } from 'react';

/** Chama `handler` em clique fora dos elementos ou ao pressionar Escape. */
export function useDismiss(
  refs: RefObject<HTMLElement | null>[],
  open: boolean,
  handler: () => void,
) {
  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (refs.some((ref) => ref.current?.contains(target))) return;
      handler();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handler();
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('touchstart', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('touchstart', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, handler, refs]);
}
