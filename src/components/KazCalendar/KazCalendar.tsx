import { useEffect, useMemo, useRef, useState } from 'react';
import { cx } from '../../utils';
import { KazIcon } from '../KazIcon/KazIcon';
import { addDays, addMonths, getMonthGrid, isBetween, isSameDay, isSameMonth, startOfDay } from './dateUtils';

export interface KazDateRange {
  start: Date | null;
  end: Date | null;
}

interface KazCalendarBaseProps {
  /** Idioma das datas. Padrão: pt-BR. */
  locale?: string;
  /** 0 = domingo, 1 = segunda. */
  weekStartsOn?: 0 | 1;
  minDate?: Date;
  maxDate?: Date;
  /** Desabilita dias específicos (ex.: fins de semana). */
  isDateDisabled?: (date: Date) => boolean;
  /** Quantos meses lado a lado. */
  numberOfMonths?: 1 | 2;
  /** Mês exibido inicialmente. */
  defaultMonth?: Date;
  className?: string;
}

export interface KazCalendarSingleProps extends KazCalendarBaseProps {
  mode?: 'single';
  value: Date | null;
  onChange: (date: Date) => void;
}

export interface KazCalendarRangeProps extends KazCalendarBaseProps {
  mode: 'range';
  value: KazDateRange;
  onChange: (range: KazDateRange) => void;
}

export type KazCalendarProps = KazCalendarSingleProps | KazCalendarRangeProps;

type View = 'days' | 'months' | 'years';

export function KazCalendar(props: KazCalendarProps) {
  const { locale = 'pt-BR', weekStartsOn = 0, minDate, maxDate, isDateDisabled, numberOfMonths = 1, defaultMonth, className } = props;
  const anchor = props.mode === 'range' ? props.value.start : props.value;
  const [month, setMonth] = useState(() => {
    const base = defaultMonth ?? anchor ?? new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });
  const [view, setView] = useState<View>('days');
  const [focused, setFocused] = useState<Date>(() => startOfDay(anchor ?? new Date()));
  const [hovered, setHovered] = useState<Date | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const shouldFocus = useRef(false);

  const monthFmt = useMemo(() => new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }), [locale]);
  const monthShort = useMemo(() => new Intl.DateTimeFormat(locale, { month: 'long' }), [locale]);
  const weekdayFmt = useMemo(() => new Intl.DateTimeFormat(locale, { weekday: 'short' }), [locale]);
  const fullFmt = useMemo(() => new Intl.DateTimeFormat(locale, { dateStyle: 'full' }), [locale]);

  const weekdays = useMemo(() => {
    const sunday = new Date(2024, 0, 7);
    return Array.from({ length: 7 }, (_, i) => weekdayFmt.format(addDays(sunday, i + weekStartsOn)).replace('.', ''));
  }, [weekdayFmt, weekStartsOn]);

  const disabled = (date: Date) =>
    (minDate && startOfDay(date) < startOfDay(minDate)) || (maxDate && startOfDay(date) > startOfDay(maxDate)) || Boolean(isDateDisabled?.(date));

  useEffect(() => {
    if (!shouldFocus.current) return;
    shouldFocus.current = false;
    gridRef.current?.querySelector<HTMLButtonElement>('[data-focused="true"]')?.focus();
  });

  const select = (date: Date) => {
    if (disabled(date)) return;
    if (props.mode === 'range') {
      const { start, end } = props.value;
      if (!start || end || date < start) props.onChange({ start: date, end: null });
      else props.onChange({ start, end: date });
    } else {
      props.onChange(date);
    }
    setFocused(date);
  };

  const moveFocus = (date: Date) => {
    setFocused(date);
    const visibleEnd = addMonths(month, numberOfMonths);
    if (date < month) setMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    else if (date >= visibleEnd) setMonth(new Date(date.getFullYear(), date.getMonth() - numberOfMonths + 1, 1));
    shouldFocus.current = true;
  };

  const onDayKey = (event: React.KeyboardEvent) => {
    const map: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (event.key in map) {
      event.preventDefault();
      moveFocus(addDays(focused, map[event.key]));
    } else if (event.key === 'PageUp' || event.key === 'PageDown') {
      event.preventDefault();
      const delta = event.key === 'PageUp' ? -1 : 1;
      moveFocus(new Date(focused.getFullYear(), focused.getMonth() + delta, focused.getDate()));
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      const dow = (focused.getDay() - weekStartsOn + 7) % 7;
      moveFocus(addDays(focused, event.key === 'Home' ? -dow : 6 - dow));
    }
  };

  const rangeStart = props.mode === 'range' ? props.value.start : null;
  const rangeEnd = props.mode === 'range' ? props.value.end ?? (rangeStart && hovered && hovered > rangeStart ? hovered : null) : null;

  const renderMonth = (current: Date, index: number) => {
    const days = getMonthGrid(current, weekStartsOn);
    const weeks = Array.from({ length: 6 }, (_, w) => days.slice(w * 7, w * 7 + 7));
    return (
      <div key={index} className="kaz-calendar__month">
        <div className="kaz-calendar__header">
          {index === 0 ? (
            <button type="button" className="kaz-calendar__nav" aria-label="Mês anterior" onClick={() => setMonth(addMonths(month, -1))}>
              <KazIcon name="arrow-left" />
            </button>
          ) : (
            <span className="kaz-calendar__nav-spacer" />
          )}
          <button type="button" className="kaz-calendar__title" aria-live="polite" onClick={() => setView('months')}>
            {capitalize(monthFmt.format(current))}
          </button>
          {index === numberOfMonths - 1 ? (
            <button type="button" className="kaz-calendar__nav" aria-label="Próximo mês" onClick={() => setMonth(addMonths(month, 1))}>
              <KazIcon name="arrow-right" />
            </button>
          ) : (
            <span className="kaz-calendar__nav-spacer" />
          )}
        </div>
        <div role="grid" aria-label={monthFmt.format(current)} className="kaz-calendar__grid" onKeyDown={onDayKey}>
          <div role="row" className="kaz-calendar__row">
            {weekdays.map((weekday) => (
              <span key={weekday} role="columnheader" className="kaz-calendar__weekday">
                {capitalize(weekday)}
              </span>
            ))}
          </div>
          {weeks.map((week, w) => (
            <div key={w} role="row" className="kaz-calendar__row">
              {week.map((day) => {
                const outside = !isSameMonth(day, current);
                const isDisabled = disabled(day);
                const selected =
                  props.mode === 'range' ? isSameDay(day, rangeStart) || isSameDay(day, rangeEnd) : isSameDay(day, props.value);
                const inRange = props.mode === 'range' && isBetween(day, rangeStart, rangeEnd);
                const isFocused = isSameDay(day, focused) && isSameMonth(day, current);
                return (
                  <span key={day.toISOString()} role="gridcell" aria-selected={selected || inRange || undefined} className="kaz-calendar__cell">
                    <button
                      type="button"
                      tabIndex={isFocused ? 0 : -1}
                      data-focused={isFocused || undefined}
                      disabled={isDisabled}
                      aria-label={fullFmt.format(day)}
                      aria-current={isSameDay(day, new Date()) ? 'date' : undefined}
                      className={cx(
                        'kaz-calendar__day',
                        outside && 'kaz-calendar__day--outside',
                        selected && 'kaz-calendar__day--selected',
                        inRange && 'kaz-calendar__day--in-range',
                        props.mode === 'range' && isSameDay(day, rangeStart) && rangeEnd && 'kaz-calendar__day--range-start',
                        props.mode === 'range' && isSameDay(day, rangeEnd) && 'kaz-calendar__day--range-end',
                        isSameDay(day, new Date()) && 'kaz-calendar__day--today',
                      )}
                      onClick={() => select(day)}
                      onMouseEnter={() => setHovered(day)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      {day.getDate()}
                    </button>
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (view === 'months') {
    return (
      <div className={cx('kaz-calendar', className)}>
        <div className="kaz-calendar__month">
          <div className="kaz-calendar__header">
            <button type="button" className="kaz-calendar__nav" aria-label="Ano anterior" onClick={() => setMonth(new Date(month.getFullYear() - 1, month.getMonth(), 1))}>
              <KazIcon name="arrow-left" />
            </button>
            <button type="button" className="kaz-calendar__title" onClick={() => setView('years')}>
              {month.getFullYear()}
            </button>
            <button type="button" className="kaz-calendar__nav" aria-label="Próximo ano" onClick={() => setMonth(new Date(month.getFullYear() + 1, month.getMonth(), 1))}>
              <KazIcon name="arrow-right" />
            </button>
          </div>
          <div className="kaz-calendar__picker">
            {Array.from({ length: 12 }, (_, m) => (
              <button
                key={m}
                type="button"
                className={cx('kaz-calendar__pick', m === month.getMonth() && 'kaz-calendar__pick--selected')}
                onClick={() => {
                  setMonth(new Date(month.getFullYear(), m, 1));
                  setView('days');
                }}
              >
                {capitalize(monthShort.format(new Date(2024, m, 1)))}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (view === 'years') {
    const decade = Math.floor(month.getFullYear() / 12) * 12;
    return (
      <div className={cx('kaz-calendar', className)}>
        <div className="kaz-calendar__month">
          <div className="kaz-calendar__header">
            <button type="button" className="kaz-calendar__nav" aria-label="Anos anteriores" onClick={() => setMonth(new Date(month.getFullYear() - 12, month.getMonth(), 1))}>
              <KazIcon name="arrow-left" />
            </button>
            <span className="kaz-calendar__title kaz-calendar__title--static">
              {decade}–{decade + 11}
            </span>
            <button type="button" className="kaz-calendar__nav" aria-label="Próximos anos" onClick={() => setMonth(new Date(month.getFullYear() + 12, month.getMonth(), 1))}>
              <KazIcon name="arrow-right" />
            </button>
          </div>
          <div className="kaz-calendar__picker">
            {Array.from({ length: 12 }, (_, i) => decade + i).map((year) => (
              <button
                key={year}
                type="button"
                className={cx('kaz-calendar__pick', year === month.getFullYear() && 'kaz-calendar__pick--selected')}
                onClick={() => {
                  setMonth(new Date(year, month.getMonth(), 1));
                  setView('months');
                }}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={gridRef} className={cx('kaz-calendar', numberOfMonths === 2 && 'kaz-calendar--double', className)}>
      {Array.from({ length: numberOfMonths }, (_, i) => renderMonth(addMonths(month, i), i))}
    </div>
  );
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
