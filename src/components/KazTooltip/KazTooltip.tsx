import { cloneElement, isValidElement, useEffect, useId, useRef, useState, type ReactElement, type ReactNode } from 'react';
import { cx } from '../../utils';

export interface KazTooltipProps {
  content: ReactNode;
  /** Um único elemento focável (botão, link, ícone com tabIndex). */
  children: ReactElement;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** `dark` (padrão, inverte no tema escuro), `light` ou `subtle`. */
  variant?: 'dark' | 'light' | 'subtle';
  /** Atraso para abrir, em ms. Evita tooltips piscando ao passar o mouse. */
  delay?: number;
  /** Força aberto (útil em documentação). */
  open?: boolean;
  className?: string;
}

export function KazTooltip({ content, children, placement = 'top', variant = 'dark', delay = 300, open: forcedOpen, className }: KazTooltipProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const show = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(true), delay);
  };
  const hide = () => {
    clearTimeout(timer.current);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && hide();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const visible = forcedOpen ?? open;
  const trigger = isValidElement(children)
    ? cloneElement(children as ReactElement<Record<string, unknown>>, { 'aria-describedby': visible ? id : undefined })
    : children;

  return (
    <span className={cx('kaz-tooltip-anchor', className)} onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      {trigger}
      <span
        id={id}
        role="tooltip"
        className={cx('kaz-tooltip', `kaz-tooltip--${placement}`, `kaz-tooltip--${variant}`, visible && 'kaz-tooltip--open')}
      >
        {content}
      </span>
    </span>
  );
}
