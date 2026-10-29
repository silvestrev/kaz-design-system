import type { HTMLAttributes, ReactNode } from 'react';
import { cx, type KazTone } from '../../utils';
import { KazIcon, type KazIconName } from '../KazIcon/KazIcon';

export type KazAlertTone = Exclude<KazTone, 'primary'>;

const defaultIcons: Record<KazAlertTone, KazIconName> = {
  info: 'info',
  success: 'check-circle',
  danger: 'x-circle',
  warning: 'alert',
  neutral: 'info',
};

export interface KazAlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: KazAlertTone;
  title?: ReactNode;
  /** Ícone personalizado, ou `false` para esconder. */
  icon?: ReactNode | false;
  /** Mostra o botão de fechar. */
  onClose?: () => void;
  closeLabel?: string;
  /** Ações abaixo do texto (ex.: um KazButton pequeno). */
  actions?: ReactNode;
}

export function KazAlert({
  tone = 'info',
  title,
  icon,
  onClose,
  closeLabel = 'Fechar aviso',
  actions,
  className,
  children,
  ...rest
}: KazAlertProps) {
  const urgent = tone === 'danger' || tone === 'warning';
  const iconNode = icon === false ? null : icon ?? <KazIcon name={defaultIcons[tone]} />;
  return (
    <div
      role={urgent ? 'alert' : 'status'}
      className={cx('kaz-alert', `kaz-tone-${tone}`, Boolean(children) && Boolean(title) && 'kaz-alert--stacked', className)}
      {...rest}
    >
      {iconNode && <span className="kaz-alert__icon">{iconNode}</span>}
      <div className="kaz-alert__body">
        {title && <p className="kaz-alert__title">{title}</p>}
        {children && <div className="kaz-alert__content">{children}</div>}
        {actions && <div className="kaz-alert__actions">{actions}</div>}
      </div>
      {onClose && (
        <button type="button" className="kaz-alert__close" aria-label={closeLabel} onClick={onClose}>
          <KazIcon name="x" />
        </button>
      )}
    </div>
  );
}
