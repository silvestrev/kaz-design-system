import type { HTMLAttributes, ReactNode } from 'react';
import { cx, type KazTone } from '../../utils';

export interface KazProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  tone?: KazTone;
  size?: 'sm' | 'md' | 'lg';
  /** Rótulo visível acima da barra (também usado pelos leitores de tela). */
  label?: ReactNode;
  /** Mostra a porcentagem. */
  showValue?: boolean;
  /** Posição do texto: `end` (padrão) ou `start`. */
  labelAlign?: 'start' | 'end';
  /** Texto acessível quando não há `label` visível. */
  'aria-label'?: string;
}

export function KazProgress({ value, max = 100, tone = 'primary', size = 'md', label, showValue = true, labelAlign = 'end', className, ...rest }: KazProgressProps) {
  const percent = Math.round((Math.min(Math.max(value, 0), max) / max) * 100);
  return (
    <div className={cx('kaz-progress', `kaz-progress--${size}`, `kaz-tone-${tone}`, className)}>
      {(label || showValue) && (
        <div className={cx('kaz-progress__meta', `kaz-progress__meta--${labelAlign}`)}>
          {label && <span className="kaz-progress__label">{label}</span>}
          {showValue && <span className="kaz-progress__value">{percent}%</span>}
        </div>
      )}
      <div role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} aria-valuetext={`${percent}%`} className="kaz-progress__track" {...rest}>
        <div className="kaz-progress__bar" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
