import type { ReactNode } from 'react';
import { cx } from '../../utils';

export interface KazFieldMessageProps {
  /** Texto de ajuda abaixo do campo. */
  hint?: ReactNode;
  /** Mensagem de erro. Deixa o campo em estado inválido. */
  error?: ReactNode;
  /** Mensagem de sucesso. */
  success?: ReactNode;
}

export type KazFieldStatus = 'default' | 'error' | 'success';

export function getFieldStatus({ error, success }: KazFieldMessageProps): KazFieldStatus {
  if (error) return 'error';
  if (success) return 'success';
  return 'default';
}

export function describedBy(id: string, props: KazFieldMessageProps) {
  return props.error || props.success || props.hint ? `${id}-msg` : undefined;
}

interface KazFieldProps extends KazFieldMessageProps {
  id: string;
  label?: ReactNode;
  required?: boolean;
  className?: string;
  children: ReactNode;
}

/** Estrutura comum: rótulo, controle e mensagem. Usado por KazInput, KazSelect e KazTextarea. */
export function KazField({ id, label, required, hint, error, success, className, children }: KazFieldProps) {
  const message = error || success || hint;
  return (
    <div className={cx('kaz-field', className)}>
      {label && (
        <label htmlFor={id} className="kaz-field__label">
          {label}
          {required && (
            <span className="kaz-field__required" aria-hidden="true">
              {' '}
              *
            </span>
          )}
        </label>
      )}
      {children}
      {message && (
        <p
          id={`${id}-msg`}
          className={cx('kaz-field__msg', error ? 'kaz-field__msg--error' : success ? 'kaz-field__msg--success' : undefined)}
        >
          {message}
        </p>
      )}
    </div>
  );
}
