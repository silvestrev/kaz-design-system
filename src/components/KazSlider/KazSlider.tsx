import { useId, useState, type ReactNode } from 'react';
import { cx } from '../../utils';

type SliderValue = number | [number, number];

export interface KazSliderProps<V extends SliderValue = SliderValue> {
  /** Número para um valor; par [mín, máx] para intervalo. */
  value?: V;
  defaultValue?: V;
  onChange?: (value: V) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Rótulo visível. Também nomeia os controles para leitores de tela. */
  label?: ReactNode;
  /** Nome acessível quando não há rótulo visível. */
  'aria-label'?: string;
  /** Balão com o valor: ao interagir (`auto`), sempre ou nunca. */
  showTooltip?: 'auto' | 'always' | 'never';
  /** Formata o valor exibido, ex.: (v) => `R$ ${v}`. */
  formatValue?: (value: number) => string;
  disabled?: boolean;
  className?: string;
}

export function KazSlider<V extends SliderValue>({
  value,
  defaultValue,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  'aria-label': ariaLabel,
  showTooltip = 'auto',
  formatValue = String,
  disabled,
  className,
}: KazSliderProps<V>) {
  const id = useId();
  const [internal, setInternal] = useState<SliderValue>(defaultValue ?? value ?? min);
  const current = (value ?? internal) as SliderValue;
  const isRange = Array.isArray(current);
  const [low, high] = isRange ? current : [min, current];
  const pct = (n: number) => ((n - min) / (max - min)) * 100;

  const emit = (next: SliderValue) => {
    if (value === undefined) setInternal(next);
    onChange?.(next as V);
  };

  const thumbs = isRange
    ? [
        { key: 'low', val: low, name: 'mínimo', set: (n: number) => emit([Math.min(n, high), high]) },
        { key: 'high', val: high, name: 'máximo', set: (n: number) => emit([low, Math.max(n, low)]) },
      ]
    : [{ key: 'single', val: high, name: '', set: (n: number) => emit(n) }];

  const labelText = typeof label === 'string' ? label : ariaLabel;

  return (
    <div className={cx('kaz-slider', `kaz-slider--tooltip-${showTooltip}`, disabled && 'kaz-slider--disabled', className)}>
      {label && (
        <div id={`${id}-label`} className="kaz-slider__label">
          {label}
        </div>
      )}
      <div className="kaz-slider__rail">
        <div className="kaz-slider__track" />
        <div className="kaz-slider__fill" style={{ left: `${isRange ? pct(low) : 0}%`, right: `${100 - pct(high)}%` }} />
        {thumbs.map((thumb) => (
          <div key={thumb.key} className="kaz-slider__thumb-wrap">
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={thumb.val}
              disabled={disabled}
              aria-label={labelText ? `${labelText}${thumb.name ? ` (${thumb.name})` : ''}` : undefined}
              aria-labelledby={!labelText && label ? `${id}-label` : undefined}
              aria-valuetext={formatValue(thumb.val)}
              className="kaz-slider__input"
              onChange={(event) => thumb.set(Number(event.target.value))}
            />
            <span className="kaz-slider__tooltip" style={{ left: `${pct(thumb.val)}%` }} aria-hidden="true">
              {formatValue(thumb.val)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
