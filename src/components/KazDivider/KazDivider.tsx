import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils';

export interface KazDividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  /** Texto no meio da linha, ex.: "ou". */
  label?: ReactNode;
  /** Espaço ao redor. */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
}

export function KazDivider({ orientation = 'horizontal', label, spacing = 'md', className, ...rest }: KazDividerProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cx('kaz-divider', `kaz-divider--${orientation}`, `kaz-divider--space-${spacing}`, label !== undefined && 'kaz-divider--labeled', className)}
      {...rest}
    >
      {label !== undefined && <span className="kaz-divider__label">{label}</span>}
    </div>
  );
}
