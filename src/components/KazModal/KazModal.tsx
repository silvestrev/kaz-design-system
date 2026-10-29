import { useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../utils';
import { KazIcon } from '../KazIcon/KazIcon';
import { useKazTheme } from '../KazProvider/KazProvider';

export interface KazModalProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  /** Texto de apoio abaixo do título. */
  description?: ReactNode;
  children?: ReactNode;
  /** Rodapé com ações. */
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Fecha ao clicar fora. Desligue em fluxos com dados que não podem se perder. */
  closeOnOverlayClick?: boolean;
  hideCloseButton?: boolean;
  closeLabel?: string;
  /** Centraliza o conteúdo (bom para confirmações curtas). */
  centered?: boolean;
  className?: string;
}

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export function KazModal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  hideCloseButton,
  closeLabel = 'Fechar',
  centered,
  className,
}: KazModalProps) {
  const titleId = useId();
  const descId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const theme = useKazTheme();
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>(FOCUSABLE);
    (first ?? panel)?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onCloseRef.current();
      }
      if (event.key === 'Tab' && panel) {
        const nodes = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (nodes.length === 0) return event.preventDefault();
        const firstNode = nodes[0];
        const lastNode = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === firstNode) {
          event.preventDefault();
          lastNode.focus();
        } else if (!event.shiftKey && document.activeElement === lastNode) {
          event.preventDefault();
          firstNode.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div data-kaz-theme={theme} className="kaz-root kaz-modal-root">
      <div className="kaz-modal__overlay" onMouseDown={closeOnOverlayClick ? onClose : undefined} aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        className={cx('kaz-modal', `kaz-modal--${size}`, centered && 'kaz-modal--centered', className)}
      >
        {(title || !hideCloseButton) && (
          <div className={cx('kaz-modal__header', !title && 'kaz-modal__header--bare')}>
            <div>
              {title && (
                <h2 id={titleId} className="kaz-modal__title">
                  {title}
                </h2>
              )}
              {description && (
                <p id={descId} className="kaz-modal__desc">
                  {description}
                </p>
              )}
            </div>
            {!hideCloseButton && (
              <button type="button" className="kaz-modal__close" aria-label={closeLabel} onClick={onClose}>
                <KazIcon name="x" />
              </button>
            )}
          </div>
        )}
        {children && <div className="kaz-modal__body">{children}</div>}
        {footer && <div className="kaz-modal__footer">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
