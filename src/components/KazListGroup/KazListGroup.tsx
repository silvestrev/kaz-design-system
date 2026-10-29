import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils';

export interface KazListGroupItem {
  label: ReactNode;
  icon?: ReactNode;
  /** Conteúdo à direita, ex.: um KazBadge. */
  end?: ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
}

export interface KazListGroupProps extends HTMLAttributes<HTMLUListElement> {
  items: KazListGroupItem[];
  /** Rótulo para leitores de tela quando a lista é navegação. */
  label?: string;
}

export function KazListGroup({ items, label, className, ...rest }: KazListGroupProps) {
  return (
    <ul aria-label={label} className={cx('kaz-list-group', className)} {...rest}>
      {items.map((item, index) => {
        const interactive = Boolean(item.href || item.onClick);
        const inner = (
          <>
            {item.icon && <span className="kaz-list-group__icon">{item.icon}</span>}
            <span className="kaz-list-group__label">{item.label}</span>
            {item.end && <span className="kaz-list-group__end">{item.end}</span>}
          </>
        );
        const cls = cx('kaz-list-group__item', interactive && 'kaz-list-group__item--interactive', item.active && 'kaz-list-group__item--active', item.disabled && 'kaz-list-group__item--disabled');
        return (
          <li key={index}>
            {item.href && !item.disabled ? (
              <a href={item.href} onClick={item.onClick} aria-current={item.active ? 'page' : undefined} className={cls}>
                {inner}
              </a>
            ) : item.onClick ? (
              <button type="button" onClick={item.onClick} disabled={item.disabled} aria-current={item.active ? 'true' : undefined} className={cls}>
                {inner}
              </button>
            ) : (
              <div className={cls}>{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
