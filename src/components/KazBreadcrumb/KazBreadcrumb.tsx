import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils';
import { KazIcon } from '../KazIcon/KazIcon';

export interface KazBreadcrumbItem {
  label: ReactNode;
  href?: string;
  icon?: ReactNode;
  onClick?: () => void;
}

export interface KazBreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: KazBreadcrumbItem[];
  /** `plain` (padrão) ou `contained` com fundo e borda. */
  variant?: 'plain' | 'contained';
  separator?: ReactNode;
  label?: string;
}

export function KazBreadcrumb({
  items,
  variant = 'plain',
  separator = <KazIcon name="chevron-right" />,
  label = 'Você está em',
  className,
  ...rest
}: KazBreadcrumbProps) {
  return (
    <nav aria-label={label} className={cx('kaz-breadcrumb', `kaz-breadcrumb--${variant}`, className)} {...rest}>
      <ol className="kaz-breadcrumb__list">
        {items.map((item, index) => {
          const current = index === items.length - 1;
          const inner = (
            <>
              {item.icon && <span className="kaz-breadcrumb__icon">{item.icon}</span>}
              {item.label}
            </>
          );
          return (
            <li key={index} className="kaz-breadcrumb__item">
              {current ? (
                <span aria-current="page" className="kaz-breadcrumb__current">
                  {inner}
                </span>
              ) : item.href ? (
                <a href={item.href} onClick={item.onClick} className="kaz-breadcrumb__link">
                  {inner}
                </a>
              ) : (
                <button type="button" onClick={item.onClick} className="kaz-breadcrumb__link">
                  {inner}
                </button>
              )}
              {!current && (
                <span className="kaz-breadcrumb__sep" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
