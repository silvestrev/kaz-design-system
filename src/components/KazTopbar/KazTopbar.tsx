import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils';
import { KazAvatar } from '../KazAvatar/KazAvatar';
import { KazDropdown, type KazDropdownItem } from '../KazDropdown/KazDropdown';
import { KazIcon } from '../KazIcon/KazIcon';

export interface KazTopbarUser {
  name: string;
  email?: string;
  avatarSrc?: string;
  /** Itens do menu do usuário (perfil, configurações, sair...). */
  menu?: KazDropdownItem[];
}

export interface KazTopbarProps extends HTMLAttributes<HTMLElement> {
  /** Logo ou nome do produto. */
  brand?: ReactNode;
  /** Se informado, mostra o botão de menu (para abrir a KazSidebar no celular). */
  onMenuClick?: () => void;
  menuLabel?: string;
  /** Navegação principal (links). */
  nav?: ReactNode;
  /** Campo de busca, normalmente um KazInput ou KazAutocomplete. */
  search?: ReactNode;
  /** Ações à direita: botões, notificações etc. */
  actions?: ReactNode;
  user?: KazTopbarUser;
  /** `light` (padrão), `dark` ou `brand` (roxo). */
  tone?: 'light' | 'dark' | 'brand';
  /** Fixa no topo ao rolar. */
  sticky?: boolean;
}

export function KazTopbar({ brand, onMenuClick, menuLabel = 'Abrir menu', nav, search, actions, user, tone = 'light', sticky, className, ...rest }: KazTopbarProps) {
  return (
    <header className={cx('kaz-topbar', `kaz-topbar--${tone}`, sticky && 'kaz-topbar--sticky', className)} {...rest}>
      <div className="kaz-topbar__start">
        {onMenuClick && (
          <button type="button" className="kaz-topbar__icon-btn" aria-label={menuLabel} onClick={onMenuClick}>
            <KazIcon name="menu" />
          </button>
        )}
        {brand && <div className="kaz-topbar__brand">{brand}</div>}
        {nav && <nav className="kaz-topbar__nav">{nav}</nav>}
        {search && <div className="kaz-topbar__search">{search}</div>}
      </div>
      <div className="kaz-topbar__end">
        {actions}
        {user && (
          <KazDropdown
            align="end"
            items={user.menu ?? []}
            header={
              <>
                <div className="kaz-topbar__user-name">{user.name}</div>
                {user.email && <div className="kaz-topbar__user-email">{user.email}</div>}
              </>
            }
            trigger={(props) => (
              <button type="button" className="kaz-topbar__user" aria-label={`Menu de ${user.name}`} {...props}>
                <KazAvatar name={user.name} src={user.avatarSrc} size="sm" />
              </button>
            )}
          />
        )}
      </div>
    </header>
  );
}

export interface KazTopbarIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
  /** Número no canto (ex.: notificações). */
  count?: number;
}

/** Botão de ícone para a barra (notificações, apps...). */
export function KazTopbarIconButton({ count, className, children, ...rest }: KazTopbarIconButtonProps) {
  return (
    <button type="button" className={cx('kaz-topbar__icon-btn', className)} {...rest}>
      {children}
      {count !== undefined && count > 0 && <span className="kaz-topbar__count">{count > 99 ? '99+' : count}</span>}
    </button>
  );
}

export interface KazTopbarLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
}

export function KazTopbarLink({ active, className, ...rest }: KazTopbarLinkProps) {
  return <a aria-current={active ? 'page' : undefined} className={cx('kaz-topbar__link', active && 'kaz-topbar__link--active', className)} {...rest} />;
}
