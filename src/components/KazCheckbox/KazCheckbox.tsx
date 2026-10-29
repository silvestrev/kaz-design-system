import { forwardRef, useEffect, useId, useRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils';

interface KazChoiceBaseProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
  /** Texto de apoio abaixo do rótulo. */
  description?: ReactNode;
  size?: 'sm' | 'md';
}

function Choice({
  type,
  role,
  inputRef,
  label,
  description,
  size = 'md',
  id,
  className,
  ...rest
}: KazChoiceBaseProps & { type: 'checkbox' | 'radio'; role?: string; inputRef: React.Ref<HTMLInputElement> }) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const descId = description ? `${inputId}-desc` : undefined;
  const kind = role === 'switch' ? 'switch' : type;
  return (
    <div className={cx('kaz-choice', `kaz-choice--${kind}`, `kaz-choice--${size}`, rest.disabled && 'kaz-choice--disabled', className)}>
      <span className="kaz-choice__control">
        <input ref={inputRef} id={inputId} type={type} role={role} aria-describedby={descId} className="kaz-choice__input" {...rest} />
        <span className="kaz-choice__visual" aria-hidden="true" />
      </span>
      {(label || description) && (
        <span className="kaz-choice__text">
          {label && (
            <label htmlFor={inputId} className="kaz-choice__label">
              {label}
            </label>
          )}
          {description && (
            <span id={descId} className="kaz-choice__desc">
              {description}
            </span>
          )}
        </span>
      )}
    </div>
  );
}

export interface KazCheckboxProps extends KazChoiceBaseProps {
  /** Estado parcial (ex.: "selecionar todos" com alguns marcados). */
  indeterminate?: boolean;
}

export const KazCheckbox = forwardRef<HTMLInputElement, KazCheckboxProps>(function KazCheckbox({ indeterminate, ...props }, ref) {
  const local = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (local.current) local.current.indeterminate = Boolean(indeterminate);
  }, [indeterminate]);
  const setRef = (node: HTMLInputElement | null) => {
    local.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };
  return <Choice type="checkbox" inputRef={setRef} {...props} />;
});

export type KazRadioProps = KazChoiceBaseProps;

export const KazRadio = forwardRef<HTMLInputElement, KazRadioProps>(function KazRadio(props, ref) {
  return <Choice type="radio" inputRef={ref} {...props} />;
});

export type KazSwitchProps = KazChoiceBaseProps;

/** Liga/desliga com efeito imediato. Para escolhas que dependem de "Salvar", prefira KazCheckbox. */
export const KazSwitch = forwardRef<HTMLInputElement, KazSwitchProps>(function KazSwitch(props, ref) {
  return <Choice type="checkbox" role="switch" inputRef={ref} {...props} />;
});

export interface KazRadioGroupOption {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

export interface KazRadioGroupProps {
  name: string;
  label: ReactNode;
  options: KazRadioGroupOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  orientation?: 'vertical' | 'horizontal';
  size?: 'sm' | 'md';
  className?: string;
}

export function KazRadioGroup({ name, label, options, value, defaultValue, onChange, orientation = 'vertical', size, className }: KazRadioGroupProps) {
  return (
    <fieldset className={cx('kaz-radio-group', `kaz-radio-group--${orientation}`, className)}>
      <legend className="kaz-radio-group__legend">{label}</legend>
      <div className="kaz-radio-group__options">
        {options.map((option) => (
          <KazRadio
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            description={option.description}
            disabled={option.disabled}
            size={size}
            {...(value !== undefined ? { checked: value === option.value } : { defaultChecked: defaultValue === option.value })}
            onChange={(event) => event.target.checked && onChange?.(option.value)}
          />
        ))}
      </div>
    </fieldset>
  );
}
