import { forwardRef, useId, useRef, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cx, type KazSize } from '../../utils';
import { KazIcon } from '../KazIcon/KazIcon';
import { KazField, describedBy, getFieldStatus, type KazFieldMessageProps } from '../KazField/KazField';

interface KazFieldBaseProps extends KazFieldMessageProps {
  label?: ReactNode;
  size?: KazSize;
  /** Classe do wrapper externo (o `className` vai para o elemento nativo). */
  wrapperClassName?: string;
}

export interface KazInputProps extends KazFieldBaseProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  /** Mostra um botão para limpar quando há valor. */
  onClear?: () => void;
  clearLabel?: string;
}

function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (node: T) => {
    for (const ref of refs) {
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<T>).current = node;
    }
  };
}

export const KazInput = forwardRef<HTMLInputElement, KazInputProps>(function KazInput(
  { label, hint, error, success, size = 'md', leftIcon, rightIcon, onClear, clearLabel = 'Limpar', wrapperClassName, id, className, disabled, required, value, ...rest },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const status = getFieldStatus({ error, success });
  const innerRef = useRef<HTMLInputElement>(null);
  const hasValue = value !== undefined && value !== '';

  return (
    <KazField id={inputId} label={label} hint={hint} error={error} success={success} required={required} className={wrapperClassName}>
      <div className={cx('kaz-control', `kaz-control--${size}`, status !== 'default' && `kaz-control--${status}`, disabled && 'kaz-control--disabled')}>
        {leftIcon && <span className="kaz-control__adorn kaz-control__adorn--start">{leftIcon}</span>}
        <input
          ref={mergeRefs(ref, innerRef)}
          id={inputId}
          className={cx('kaz-control__input', className)}
          disabled={disabled}
          required={required}
          value={value}
          aria-invalid={status === 'error' || undefined}
          aria-describedby={describedBy(inputId, { hint, error, success })}
          {...rest}
        />
        {(rightIcon || status !== 'default' || (onClear && hasValue)) && (
          <span className="kaz-control__adorn kaz-control__adorn--end">
            {onClear && hasValue && !disabled && (
              <button
                type="button"
                className="kaz-control__clear"
                aria-label={clearLabel}
                onClick={() => {
                  onClear();
                  innerRef.current?.focus();
                }}
              >
                <KazIcon name="x-circle" />
              </button>
            )}
            {status === 'error' && <KazIcon name="alert" className="kaz-control__status" />}
            {status === 'success' && <KazIcon name="check" className="kaz-control__status" />}
            {rightIcon}
          </span>
        )}
      </div>
    </KazField>
  );
});

export interface KazTextareaProps extends KazFieldBaseProps, TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const KazTextarea = forwardRef<HTMLTextAreaElement, KazTextareaProps>(function KazTextarea(
  { label, hint, error, success, size = 'md', wrapperClassName, id, className, disabled, required, rows = 4, ...rest },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const status = getFieldStatus({ error, success });
  return (
    <KazField id={inputId} label={label} hint={hint} error={error} success={success} required={required} className={wrapperClassName}>
      <div className={cx('kaz-control', 'kaz-control--textarea', `kaz-control--${size}`, status !== 'default' && `kaz-control--${status}`, disabled && 'kaz-control--disabled')}>
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          className={cx('kaz-control__textarea', className)}
          disabled={disabled}
          required={required}
          aria-invalid={status === 'error' || undefined}
          aria-describedby={describedBy(inputId, { hint, error, success })}
          {...rest}
        />
      </div>
    </KazField>
  );
});

export interface KazSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface KazSelectProps extends KazFieldBaseProps, Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options?: KazSelectOption[];
  /** Opção vazia inicial, ex.: "Selecione". */
  placeholder?: string;
}

/** Select nativo estilizado: melhor acessibilidade e teclado no celular. */
export const KazSelect = forwardRef<HTMLSelectElement, KazSelectProps>(function KazSelect(
  { label, hint, error, success, size = 'md', wrapperClassName, id, className, disabled, required, options, placeholder, children, ...rest },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const status = getFieldStatus({ error, success });
  return (
    <KazField id={inputId} label={label} hint={hint} error={error} success={success} required={required} className={wrapperClassName}>
      <div className={cx('kaz-control', `kaz-control--${size}`, status !== 'default' && `kaz-control--${status}`, disabled && 'kaz-control--disabled')}>
        <select
          ref={ref}
          id={inputId}
          className={cx('kaz-control__select', className)}
          disabled={disabled}
          required={required}
          aria-invalid={status === 'error' || undefined}
          aria-describedby={describedBy(inputId, { hint, error, success })}
          {...rest}
        >
          {placeholder !== undefined && (
            <option value="" disabled={required}>
              {placeholder}
            </option>
          )}
          {options?.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
          {children}
        </select>
        <KazIcon name="chevron-down" className="kaz-control__chevron" />
      </div>
    </KazField>
  );
});
