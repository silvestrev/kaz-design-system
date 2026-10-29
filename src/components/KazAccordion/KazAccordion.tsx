import { useId, type HTMLAttributes, type ReactNode } from 'react';
import { cx, useControllable } from '../../utils';
import { KazIcon } from '../KazIcon/KazIcon';

export interface KazAccordionItem {
  id: string;
  title: ReactNode;
  content: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface KazAccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  items: KazAccordionItem[];
  /** `single` abre um por vez; `multiple` permite vários abertos. */
  type?: 'single' | 'multiple';
  /** `contained` (bloco único), `separated` (cartões soltos) ou `flush` (só divisórias). */
  variant?: 'contained' | 'separated' | 'flush';
  value?: string[];
  defaultValue?: string[];
  onChange?: (openIds: string[]) => void;
  /** Nível do título de cada item, para manter a hierarquia da página. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}

export function KazAccordion({
  items,
  type = 'single',
  variant = 'contained',
  value,
  defaultValue = [],
  onChange,
  headingLevel = 3,
  className,
  ...rest
}: KazAccordionProps) {
  const [open, setOpen] = useControllable(value, defaultValue, onChange);
  const baseId = useId();
  const Heading = `h${headingLevel}` as 'h3';

  const toggle = (id: string) => {
    const isOpen = open.includes(id);
    if (type === 'single') setOpen(isOpen ? [] : [id]);
    else setOpen(isOpen ? open.filter((x) => x !== id) : [...open, id]);
  };

  return (
    <div className={cx('kaz-accordion', `kaz-accordion--${variant}`, className)} {...rest}>
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        const triggerId = `${baseId}-t-${item.id}`;
        const panelId = `${baseId}-p-${item.id}`;
        return (
          <div key={item.id} className={cx('kaz-accordion__item', isOpen && 'kaz-accordion__item--open')}>
            <Heading className="kaz-accordion__heading">
              <button
                type="button"
                id={triggerId}
                className="kaz-accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                disabled={item.disabled}
                onClick={() => toggle(item.id)}
              >
                {item.icon && <span className="kaz-accordion__icon">{item.icon}</span>}
                <span className="kaz-accordion__title">{item.title}</span>
                <KazIcon name="chevron-down" className="kaz-accordion__chevron" />
              </button>
            </Heading>
            <div id={panelId} role="region" aria-labelledby={triggerId} hidden={!isOpen} className="kaz-accordion__panel">
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
