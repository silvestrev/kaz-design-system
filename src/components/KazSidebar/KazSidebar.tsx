import { useState, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils';
import { KazIcon } from '../KazIcon/KazIcon';

export interface KazSidebarItem {
  id: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  /** Contador ou etiqueta à direita. */
  badge?: ReactNode;
  /** Subitens: o item vira um grupo expansível. */
  children?: KazSidebarItem[];
  /** Grupo começa aberto. */
  defaultOpen?: boolean;
}

export interface KazSidebarSection {
  title?: string;
  items: KazSidebarItem[];
}

export interface KazSidebarProps extends HTMLAttributes<HTMLElement> {
  sections: KazSidebarSection[];
  /** Topo da barra, ex.: logo. */
  header?: ReactNode;
  /** Rodapé, ex.: ações rápidas. */
  footer?: ReactNode;
  /** `light` (padrão), `dark` ou `brand` (roxo). */
  tone?: 'light' | 'dark' | 'brand';
  /** Modo compacto: só ícones (ou iniciais). Os rótulos ficam no `title` e para leitores de tela. */
  collapsed?: boolean;
  label?: string;
}

function SidebarEntry({ item, collapsed, depth }: { item: KazSidebarItem; collapsed?: boolean; depth: number }) {
  const hasChildren = Boolean(item.children?.length);
  const childActive = item.children?.some((child) => child.active);
  const [open, setOpen] = useState(item.defaultOpen ?? childActive ?? false);

  const visual = (
    <>
      <span className="kaz-sidebar__icon" aria-hidden={collapsed ? undefined : true}>
        {item.icon ?? (collapsed ? item.label[0]?.toUpperCase() : null)}
      </span>
      <span className={cx('kaz-sidebar__label', collapsed && 'kaz-sr-only')}>{item.label}</span>
      {item.badge !== undefined && !collapsed && <span className="kaz-sidebar__badge">{item.badge}</span>}
    </>
  );

  const cls = cx('kaz-sidebar__item', item.active && 'kaz-sidebar__item--active', depth > 0 && 'kaz-sidebar__item--nested', hasChildren && open && 'kaz-sidebar__item--open');

  if (hasChildren && !collapsed) {
    return (
      <li>
        <button type="button" className={cls} aria-expanded={open} onClick={() => setOpen(!open)}>
          {visual}
          <KazIcon name="chevron-down" className="kaz-sidebar__chevron" />
        </button>
        {open && (
          <ul className="kaz-sidebar__sublist">
            {item.children!.map((child) => (
              <SidebarEntry key={child.id} item={child} depth={depth + 1} />
            ))}
          </ul>
        )}
      </li>
    );
  }

  const target = hasChildren && collapsed ? item.children!.find((child) => child.active) ?? item.children![0] : item;
  return (
    <li>
      {target.href ? (
        <a href={target.href} onClick={target.onClick} title={collapsed ? item.label : undefined} aria-current={item.active || childActive ? 'page' : undefined} className={cx(cls, childActive && 'kaz-sidebar__item--active')}>
          {visual}
        </a>
      ) : (
        <button type="button" onClick={target.onClick} title={collapsed ? item.label : undefined} aria-current={item.active || childActive ? 'true' : undefined} className={cx(cls, childActive && 'kaz-sidebar__item--active')}>
          {visual}
        </button>
      )}
    </li>
  );
}

export function KazSidebar({ sections, header, footer, tone = 'light', collapsed, label = 'Navegação principal', className, ...rest }: KazSidebarProps) {
  return (
    <aside className={cx('kaz-sidebar', `kaz-sidebar--${tone}`, collapsed && 'kaz-sidebar--collapsed', className)} {...rest}>
      {header && <div className="kaz-sidebar__header">{header}</div>}
      <nav aria-label={label} className="kaz-sidebar__nav">
        {sections.map((section, index) => (
          <div key={index} className="kaz-sidebar__section">
            {section.title && <p className={cx('kaz-sidebar__section-title', collapsed && 'kaz-sr-only')}>{section.title}</p>}
            <ul className="kaz-sidebar__list">
              {section.items.map((item) => (
                <SidebarEntry key={item.id} item={item} collapsed={collapsed} depth={0} />
              ))}
            </ul>
          </div>
        ))}
      </nav>
      {footer && <div className="kaz-sidebar__footer">{footer}</div>}
    </aside>
  );
}
