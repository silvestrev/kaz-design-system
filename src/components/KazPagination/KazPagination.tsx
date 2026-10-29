import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils';
import { KazIcon } from '../KazIcon/KazIcon';

export interface KazPaginationLabels {
  previous: string;
  next: string;
  page: (page: number) => string;
  nav: string;
  summary: (from: number, to: number, total: number) => ReactNode;
}

const defaultLabels: KazPaginationLabels = {
  previous: 'Anterior',
  next: 'Próxima',
  page: (page) => `Página ${page}`,
  nav: 'Paginação',
  summary: (from, to, total) => (
    <>
      Mostrando <strong>{from}</strong> a <strong>{to}</strong> de <strong>{total}</strong> registros
    </>
  ),
};

export interface KazPaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  /** `numbers` (padrão, com texto), `arrows` (números com setas) ou `simple` (só anterior/próxima). */
  variant?: 'numbers' | 'arrows' | 'simple';
  /** Quantas páginas mostrar de cada lado da atual antes das reticências. */
  siblings?: number;
  /** Para mostrar "Mostrando 1 a 10 de 100 registros". */
  summary?: { pageSize: number; total: number };
  size?: 'sm' | 'md';
  labels?: Partial<KazPaginationLabels>;
}

export function getPageRange(page: number, totalPages: number, siblings: number): (number | 'gap')[] {
  const total = siblings * 2 + 5;
  if (totalPages <= total) return Array.from({ length: totalPages }, (_, i) => i + 1);
  const start = Math.max(2, page - siblings);
  const end = Math.min(totalPages - 1, page + siblings);
  const range: (number | 'gap')[] = [1];
  if (start > 2) range.push('gap');
  for (let i = start; i <= end; i++) range.push(i);
  if (end < totalPages - 1) range.push('gap');
  range.push(totalPages);
  return range;
}

export function KazPagination({ page, totalPages, onChange, variant = 'numbers', siblings = 1, summary, size = 'md', labels: labelOverrides, className, ...rest }: KazPaginationProps) {
  const labels = { ...defaultLabels, ...labelOverrides };
  const go = (target: number) => target >= 1 && target <= totalPages && target !== page && onChange(target);
  const arrows = variant === 'arrows';

  return (
    <nav aria-label={labels.nav} className={cx('kaz-pagination', `kaz-pagination--${size}`, className)} {...rest}>
      {summary && (
        <p className="kaz-pagination__summary">
          {labels.summary(Math.min((page - 1) * summary.pageSize + 1, summary.total), Math.min(page * summary.pageSize, summary.total), summary.total)}
        </p>
      )}
      <ul className="kaz-pagination__list">
        <li>
          <button type="button" className="kaz-pagination__btn" disabled={page <= 1} onClick={() => go(page - 1)} aria-label={arrows ? labels.previous : undefined}>
            {arrows ? <KazIcon name="chevron-left" /> : labels.previous}
          </button>
        </li>
        {variant !== 'simple' &&
          getPageRange(page, totalPages, siblings).map((entry, index) =>
            entry === 'gap' ? (
              <li key={`gap-${index}`} className="kaz-pagination__gap" aria-hidden="true">
                …
              </li>
            ) : (
              <li key={entry}>
                <button
                  type="button"
                  className={cx('kaz-pagination__btn', entry === page && 'kaz-pagination__btn--active')}
                  aria-current={entry === page ? 'page' : undefined}
                  aria-label={labels.page(entry)}
                  onClick={() => go(entry)}
                >
                  {entry}
                </button>
              </li>
            ),
          )}
        <li>
          <button type="button" className="kaz-pagination__btn" disabled={page >= totalPages} onClick={() => go(page + 1)} aria-label={arrows ? labels.next : undefined}>
            {arrows ? <KazIcon name="chevron-right" /> : labels.next}
          </button>
        </li>
      </ul>
    </nav>
  );
}
