import type { HTMLAttributes } from 'react';
import { cx, type KazTone } from '../../utils';

export interface KazSpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** `ring` mostra o trilho completo; `arc` mostra só o arco. */
  variant?: 'ring' | 'arc';
  /** `current` herda a cor do texto ao redor. */
  tone?: KazTone | 'current';
  /** Texto para leitores de tela. Passe "" quando o contexto já anuncia o carregamento. */
  label?: string;
}

export function KazSpinner({
  size = 'md',
  variant = 'ring',
  tone = 'primary',
  label = 'Carregando',
  className,
  ...rest
}: KazSpinnerProps) {
  return (
    <span
      role={label ? 'status' : undefined}
      className={cx('kaz-spinner-wrap', `kaz-spinner--${size}`, tone !== 'current' && `kaz-tone-${tone}`, className)}
      {...rest}
    >
      <svg className={cx('kaz-spinner', `kaz-spinner--${variant}`)} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        {variant === 'ring' && <circle className="kaz-spinner__track" cx="12" cy="12" r="9.5" />}
        <circle className="kaz-spinner__arc" cx="12" cy="12" r="9.5" pathLength="100" />
      </svg>
      {label && <span className="kaz-sr-only">{label}</span>}
    </span>
  );
}
