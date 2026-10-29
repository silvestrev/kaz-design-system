import type { HTMLAttributes, ReactNode } from 'react';
import { cx, type KazTone } from '../../utils';

export interface KazBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: KazTone;
  size?: 'sm' | 'md';
  /** `soft` (padrão), `solid` para mais destaque, `outline` para menos. */
  variant?: 'soft' | 'solid' | 'outline';
  icon?: ReactNode;
  /** Formato circular, para contadores (ex.: 3 mensagens). */
  circle?: boolean;
  /** Ponto colorido antes do texto, bom para status. */
  dot?: boolean;
}

export function KazBadge({
  tone = 'neutral',
  size = 'sm',
  variant = 'soft',
  icon,
  circle,
  dot,
  className,
  children,
  ...rest
}: KazBadgeProps) {
  return (
    <span
      className={cx(
        'kaz-badge',
        `kaz-badge--${size}`,
        `kaz-badge--${variant}`,
        `kaz-tone-${tone}`,
        circle && 'kaz-badge--circle',
        className,
      )}
      {...rest}
    >
      {dot && <span className="kaz-badge__dot" aria-hidden="true" />}
      {icon && <span className="kaz-badge__icon">{icon}</span>}
      {children}
    </span>
  );
}
