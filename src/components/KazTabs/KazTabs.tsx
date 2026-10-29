import { useId, useRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx, useControllable } from '../../utils';

export interface KazTabItem {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  content?: ReactNode;
  disabled?: boolean;
}

export interface KazTabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  items: KazTabItem[];
  /** `underline` (padrão), `pill` ou `segmented` (ocupa a largura toda). */
  variant?: 'underline' | 'pill' | 'segmented';
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  /** Rótulo da lista de abas para leitores de tela. */
  label?: string;
}

export function KazTabs({ items, variant = 'underline', value, defaultValue, onChange, label, className, ...rest }: KazTabsProps) {
  const firstEnabled = items.find((item) => !item.disabled)?.id ?? '';
  const [active, setActive] = useControllable(value, defaultValue ?? firstEnabled, onChange);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const enabled = items.map((item, index) => ({ item, index })).filter(({ item }) => !item.disabled);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const position = enabled.findIndex(({ item }) => item.id === active);
    let next = -1;
    if (event.key === 'ArrowRight') next = (position + 1) % enabled.length;
    else if (event.key === 'ArrowLeft') next = (position - 1 + enabled.length) % enabled.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = enabled.length - 1;
    if (next < 0) return;
    event.preventDefault();
    const target = enabled[next];
    setActive(target.item.id);
    tabRefs.current[target.index]?.focus();
  };

  const activeItem = items.find((item) => item.id === active);
  const hasPanels = items.some((item) => item.content !== undefined);

  return (
    <div className={cx('kaz-tabs', `kaz-tabs--${variant}`, className)} {...rest}>
      <div role="tablist" aria-label={label} className="kaz-tabs__list" onKeyDown={onKeyDown}>
        {items.map((item, index) => {
          const selected = item.id === active;
          return (
            <button
              key={item.id}
              ref={(node) => (tabRefs.current[index] = node)}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={hasPanels ? `${baseId}-panel-${item.id}` : undefined}
              tabIndex={selected ? 0 : -1}
              disabled={item.disabled}
              className={cx('kaz-tabs__tab', selected && 'kaz-tabs__tab--active')}
              onClick={() => setActive(item.id)}
            >
              {item.icon && <span className="kaz-tabs__icon">{item.icon}</span>}
              {item.label}
            </button>
          );
        })}
      </div>
      {hasPanels && activeItem && (
        <div role="tabpanel" id={`${baseId}-panel-${activeItem.id}`} aria-labelledby={`${baseId}-tab-${activeItem.id}`} tabIndex={0} className="kaz-tabs__panel">
          {activeItem.content}
        </div>
      )}
    </div>
  );
}
