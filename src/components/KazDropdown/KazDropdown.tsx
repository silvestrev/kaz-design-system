import { useCallback, useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react';
import { cx, useDismiss } from '../../utils';
import { KazButton, type KazButtonProps } from '../KazButton/KazButton';
import { KazIcon } from '../KazIcon/KazIcon';

export type KazDropdownItem =
  | {
      type?: 'item';
      label: ReactNode;
      icon?: ReactNode;
      onSelect?: () => void;
      href?: string;
      disabled?: boolean;
      /** `danger` para ações destrutivas, como "Sair". */
      tone?: 'default' | 'danger';
    }
  | { type: 'divider' }
  | { type: 'header'; label: ReactNode };

export interface KazDropdownProps {
  /** Texto do botão gatilho. Use `trigger` para um gatilho próprio. */
  label?: ReactNode;
  /** Gatilho personalizado. Recebe as props de acessibilidade a aplicar. */
  trigger?: (props: { ref: React.Ref<HTMLButtonElement>; onClick: () => void; 'aria-expanded': boolean; 'aria-haspopup': 'menu'; 'aria-controls': string; onKeyDown: (e: React.KeyboardEvent) => void }) => ReactNode;
  items: KazDropdownItem[];
  align?: 'start' | 'end';
  /** Props repassadas ao KazButton gatilho padrão. */
  buttonProps?: Omit<KazButtonProps, 'onClick'>;
  /** Conteúdo acima dos itens, ex.: nome e e-mail do usuário. */
  header?: ReactNode;
  className?: string;
}

export function KazDropdown({ label, trigger, items, align = 'start', buttonProps, header, className }: KazDropdownProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const refs = useMemo(() => [rootRef], []);

  const close = useCallback(() => setOpen(false), []);
  useDismiss(refs, open, close);

  const actionable = items
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => (item.type ?? 'item') === 'item' && !('disabled' in item && item.disabled));

  const focusAt = (position: number) => {
    const target = actionable[(position + actionable.length) % actionable.length];
    if (target) itemRefs.current[target.index]?.focus();
  };

  const [pendingFocus, setPendingFocus] = useState<'first' | 'last' | null>(null);
  useEffect(() => {
    if (open && pendingFocus) {
      focusAt(pendingFocus === 'first' ? 0 : actionable.length - 1);
      setPendingFocus(null);
    }
  });

  const openMenu = (focus: 'first' | 'last' = 'first') => {
    setOpen(true);
    setPendingFocus(focus);
  };

  const onTriggerKey = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      openMenu('first');
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      openMenu('last');
    }
  };

  const onMenuKey = (event: React.KeyboardEvent) => {
    const current = actionable.findIndex(({ index }) => itemRefs.current[index] === document.activeElement);
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusAt(current + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusAt(current - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      focusAt(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      focusAt(actionable.length - 1);
    } else if (event.key === 'Escape' || event.key === 'Tab') {
      setOpen(false);
      if (event.key === 'Escape') triggerRef.current?.focus();
    }
  };

  const triggerProps = {
    ref: triggerRef,
    onClick: () => (open ? setOpen(false) : openMenu('first')),
    'aria-expanded': open,
    'aria-haspopup': 'menu' as const,
    'aria-controls': menuId,
    onKeyDown: onTriggerKey,
  };

  return (
    <div ref={rootRef} className={cx('kaz-dropdown', className)}>
      {trigger ? (
        trigger(triggerProps)
      ) : (
        <KazButton rightIcon={<KazIcon name="chevron-down" />} {...buttonProps} {...triggerProps}>
          {label}
        </KazButton>
      )}
      {open && (
        <div className={cx('kaz-dropdown__menu', `kaz-dropdown__menu--${align}`)}>
          {header && <div className="kaz-dropdown__header">{header}</div>}
          <div id={menuId} role="menu" onKeyDown={onMenuKey}>
            {items.map((item, index) => {
              if (item.type === 'divider') return <div key={index} role="separator" className="kaz-dropdown__divider" />;
              if (item.type === 'header')
                return (
                  <div key={index} role="presentation" className="kaz-dropdown__group">
                    {item.label}
                  </div>
                );
              const common = {
                role: 'menuitem',
                tabIndex: -1,
                className: cx('kaz-dropdown__item', item.tone === 'danger' && 'kaz-dropdown__item--danger'),
                'aria-disabled': item.disabled || undefined,
                onClick: () => {
                  if (item.disabled) return;
                  item.onSelect?.();
                  setOpen(false);
                  triggerRef.current?.focus();
                },
              };
              const inner = (
                <>
                  {item.icon && <span className="kaz-dropdown__icon">{item.icon}</span>}
                  <span>{item.label}</span>
                </>
              );
              return item.href && !item.disabled ? (
                <a key={index} href={item.href} ref={(node) => (itemRefs.current[index] = node)} {...common}>
                  {inner}
                </a>
              ) : (
                <button key={index} type="button" ref={(node) => (itemRefs.current[index] = node)} {...common}>
                  {inner}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
