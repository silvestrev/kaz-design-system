import { useCallback, useId, useMemo, useRef, useState, type ReactNode } from 'react';
import { cx, useDismiss, type KazSize } from '../../utils';
import { KazIcon } from '../KazIcon/KazIcon';

export interface KazAutocompleteOption {
  id: string;
  label: string;
  icon?: ReactNode;
  /** Grupo exibido como título (ex.: "Recentes", "Clientes"). */
  group?: string;
  /** Mostra botão para remover (ex.: limpar uma busca recente). */
  removable?: boolean;
}

export interface KazAutocompleteProps {
  options: KazAutocompleteOption[];
  /** Chamado ao escolher uma opção (clique ou Enter). */
  onSelect: (option: KazAutocompleteOption) => void;
  /** Texto digitado (controlado). */
  value?: string;
  onInputChange?: (value: string) => void;
  /** Filtra as opções localmente pelo texto. Desligue quando o filtro vier do servidor. */
  filter?: boolean;
  onRemove?: (option: KazAutocompleteOption) => void;
  placeholder?: string;
  /** Nome acessível do campo. */
  label: string;
  /** Mostra o rótulo visualmente (padrão: só para leitores de tela). */
  showLabel?: boolean;
  /** Rodapé da lista, ex.: botão "Adicionar novo". */
  footer?: ReactNode;
  emptyText?: ReactNode;
  /** `default` (lista simples) ou `cards` (itens destacados com atalho Enter). */
  variant?: 'default' | 'cards';
  size?: KazSize;
  className?: string;
}

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, index)}
      <mark className="kaz-autocomplete__match">{text.slice(index, index + query.length)}</mark>
      {text.slice(index + query.length)}
    </>
  );
}

export function KazAutocomplete({
  options,
  onSelect,
  value,
  onInputChange,
  filter = true,
  onRemove,
  placeholder = 'Busca rápida',
  label,
  showLabel,
  footer,
  emptyText = 'Nenhum resultado',
  variant = 'default',
  size = 'md',
  className,
}: KazAutocompleteProps) {
  const id = useId();
  const [internal, setInternal] = useState('');
  const query = value ?? internal;
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const refs = useMemo(() => [rootRef], []);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(refs, open, close);

  const visible = useMemo(
    () => (filter && query ? options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase())) : options),
    [filter, options, query],
  );

  const groups = useMemo(() => {
    const map = new Map<string, { option: KazAutocompleteOption; index: number }[]>();
    visible.forEach((option, index) => {
      const key = option.group ?? '';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push({ option, index });
    });
    return Array.from(map.entries());
  }, [visible]);

  const setQuery = (next: string) => {
    if (value === undefined) setInternal(next);
    onInputChange?.(next);
    setActiveIndex(-1);
    setOpen(true);
  };

  const choose = (option: KazAutocompleteOption) => {
    onSelect(option);
    setOpen(false);
    setActiveIndex(-1);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((i) => Math.min(i + 1, visible.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (event.key === 'Enter' && open && activeIndex >= 0 && visible[activeIndex]) {
      event.preventDefault();
      choose(visible[activeIndex]);
    } else if (event.key === 'Escape') {
      if (open) setOpen(false);
      else if (query) setQuery('');
    }
  };

  const listId = `${id}-list`;
  const optionId = (index: number) => `${id}-opt-${index}`;
  const showList = open && (visible.length > 0 || Boolean(query) || Boolean(footer));

  return (
    <div ref={rootRef} className={cx('kaz-autocomplete', `kaz-autocomplete--${variant}`, className)}>
      <label htmlFor={id} className={cx('kaz-field__label', !showLabel && 'kaz-sr-only')}>
        {label}
      </label>
      <div className={cx('kaz-control', `kaz-control--${size}`)}>
        <span className="kaz-control__adorn kaz-control__adorn--start">
          <KazIcon name="search" />
        </span>
        <input
          ref={inputRef}
          id={id}
          type="text"
          role="combobox"
          autoComplete="off"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={activeIndex >= 0 ? optionId(activeIndex) : undefined}
          placeholder={placeholder}
          value={query}
          className="kaz-control__input"
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
        />
        {query && (
          <span className="kaz-control__adorn kaz-control__adorn--end">
            <button
              type="button"
              className="kaz-control__clear"
              aria-label="Limpar busca"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
            >
              <KazIcon name="x-circle" />
            </button>
          </span>
        )}
      </div>
      {showList && (
        <div className="kaz-autocomplete__popover">
          <ul id={listId} role="listbox" aria-label={label} className="kaz-autocomplete__list">
            {visible.length === 0 && <li className="kaz-autocomplete__empty">{emptyText}</li>}
            {groups.map(([group, entries]) => (
              <li key={group || '_'} role="presentation">
                {group && <div className="kaz-autocomplete__group">{group}</div>}
                <ul role="group" aria-label={group || undefined} className="kaz-autocomplete__group-list">
                  {entries.map(({ option, index }) => (
                    <li
                      key={option.id}
                      id={optionId(index)}
                      role="option"
                      aria-selected={index === activeIndex}
                      className={cx('kaz-autocomplete__option', index === activeIndex && 'kaz-autocomplete__option--active')}
                      onMouseDown={(event) => event.preventDefault()}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => choose(option)}
                    >
                      <span className="kaz-autocomplete__icon">{option.icon ?? <KazIcon name="search" />}</span>
                      <span className="kaz-autocomplete__label">
                        <Highlight text={option.label} query={query} />
                      </span>
                      {option.removable && onRemove ? (
                        <button
                          type="button"
                          tabIndex={-1}
                          className="kaz-autocomplete__remove"
                          aria-label={`Remover ${option.label}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            onRemove(option);
                          }}
                        >
                          <KazIcon name="x" />
                        </button>
                      ) : (
                        variant === 'cards' && <KazIcon name="corner-down-left" className="kaz-autocomplete__enter" />
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          {footer && <div className="kaz-autocomplete__footer">{footer}</div>}
        </div>
      )}
    </div>
  );
}
