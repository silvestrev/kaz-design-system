import { useCallback, useId, useMemo, useRef, useState, type ReactNode } from 'react';
import { cx, useDismiss } from '../../utils';
import { KazButton } from '../KazButton/KazButton';
import { KazCalendar, type KazDateRange } from '../KazCalendar/KazCalendar';
import { KazIcon } from '../KazIcon/KazIcon';

interface KazDatepickerBaseProps {
  label?: ReactNode;
  placeholder?: string;
  locale?: string;
  weekStartsOn?: 0 | 1;
  minDate?: Date;
  maxDate?: Date;
  isDateDisabled?: (date: Date) => boolean;
  disabled?: boolean;
  /** Pede confirmação (Ok/Cancelar). Desligue para aplicar ao clicar no dia. */
  confirm?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
  error?: ReactNode;
  hint?: ReactNode;
  className?: string;
}

export interface KazDatepickerSingleProps extends KazDatepickerBaseProps {
  mode?: 'single';
  value: Date | null;
  onChange: (date: Date | null) => void;
}

export interface KazDatepickerRangeProps extends KazDatepickerBaseProps {
  mode: 'range';
  value: KazDateRange;
  onChange: (range: KazDateRange) => void;
}

export type KazDatepickerProps = KazDatepickerSingleProps | KazDatepickerRangeProps;

export function KazDatepicker(props: KazDatepickerProps) {
  const {
    label,
    placeholder = props.mode === 'range' ? 'Escolha o período' : 'Selecione a data',
    locale = 'pt-BR',
    weekStartsOn,
    minDate,
    maxDate,
    isDateDisabled,
    disabled,
    confirm = true,
    confirmLabel = 'Ok',
    cancelLabel = 'Cancelar',
    error,
    hint,
    className,
  } = props;
  const id = useId();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Date | null | KazDateRange>(props.value);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const refs = useMemo(() => [rootRef], []);
  const fmt = useMemo(() => new Intl.DateTimeFormat(locale, { day: '2-digit', month: '2-digit', year: 'numeric' }), [locale]);

  const close = useCallback(() => setOpen(false), []);
  useDismiss(refs, open, close);

  const display = (() => {
    if (props.mode === 'range') {
      const { start, end } = props.value;
      if (!start) return '';
      return end ? `${fmt.format(start)} – ${fmt.format(end)}` : `${fmt.format(start)} – …`;
    }
    return props.value ? fmt.format(props.value) : '';
  })();

  const commit = (next: Date | null | KazDateRange) => {
    if (props.mode === 'range') props.onChange(next as KazDateRange);
    else props.onChange(next as Date | null);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const onPick = (next: Date | KazDateRange) => {
    setDraft(next);
    if (confirm) return;
    if (props.mode === 'range') {
      if ((next as KazDateRange).end) commit(next);
    } else commit(next);
  };

  const calendarCommon = { locale, weekStartsOn, minDate, maxDate, isDateDisabled };

  return (
    <div ref={rootRef} className={cx('kaz-field', 'kaz-datepicker', className)}>
      {label && (
        <label htmlFor={id} className="kaz-field__label">
          {label}
        </label>
      )}
      <button
        ref={triggerRef}
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error || hint ? `${id}-msg` : undefined}
        className={cx('kaz-control', 'kaz-datepicker__trigger', error && 'kaz-control--error', disabled && 'kaz-control--disabled')}
        onClick={() => {
          setDraft(props.value);
          setOpen(!open);
        }}
      >
        <span className="kaz-control__adorn kaz-control__adorn--start">
          <KazIcon name="calendar" />
        </span>
        <span className={cx('kaz-datepicker__value', !display && 'kaz-datepicker__value--placeholder')}>{display || placeholder}</span>
      </button>
      {(error || hint) && (
        <p id={`${id}-msg`} className={cx('kaz-field__msg', error && 'kaz-field__msg--error')}>
          {error || hint}
        </p>
      )}
      {open && (
        <div role="dialog" aria-label={typeof label === 'string' ? label : placeholder} className="kaz-datepicker__popover">
          {props.mode === 'range' ? (
            <KazCalendar mode="range" numberOfMonths={2} value={draft as KazDateRange} onChange={onPick} {...calendarCommon} />
          ) : (
            <KazCalendar value={draft as Date | null} onChange={onPick} {...calendarCommon} />
          )}
          {confirm && (
            <div className="kaz-datepicker__actions">
              <KazButton fullWidth onClick={() => commit(draft)}>
                {confirmLabel}
              </KazButton>
              <KazButton fullWidth variant="outline" tone="neutral" onClick={() => setOpen(false)}>
                {cancelLabel}
              </KazButton>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
