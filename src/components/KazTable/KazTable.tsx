import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils';

export interface KazTableColumn<T> {
  key: string;
  header: ReactNode;
  /** Conteúdo da célula. Padrão: `row[key]`. */
  render?: (row: T, index: number) => ReactNode;
  align?: 'start' | 'center' | 'end';
  width?: string | number;
  /** Marca a coluna como cabeçalho da linha (melhora leitores de tela). */
  rowHeader?: boolean;
}

export interface KazTableProps<T> extends Omit<HTMLAttributes<HTMLTableElement>, 'children'> {
  columns: KazTableColumn<T>[];
  data: T[];
  /** Chave única de cada linha. */
  getRowKey?: (row: T, index: number) => string | number;
  /** Linhas zebradas. */
  striped?: boolean;
  /** Destaque ao passar o mouse. */
  hoverable?: boolean;
  /** Título da tabela (visível ou só para leitores de tela). */
  caption?: ReactNode;
  captionHidden?: boolean;
  /** Exibido quando `data` está vazio. */
  emptyState?: ReactNode;
  density?: 'compact' | 'comfortable';
  onRowClick?: (row: T) => void;
}

export function KazTable<T extends object>({
  columns,
  data,
  getRowKey = (_, index) => index,
  striped,
  hoverable = true,
  caption,
  captionHidden,
  emptyState = 'Nenhum registro encontrado.',
  density = 'comfortable',
  onRowClick,
  className,
  ...rest
}: KazTableProps<T>) {
  return (
    <div className="kaz-table-wrap">
      <table className={cx('kaz-table', `kaz-table--${density}`, striped && 'kaz-table--striped', hoverable && 'kaz-table--hover', onRowClick && 'kaz-table--clickable', className)} {...rest}>
        {caption && <caption className={cx('kaz-table__caption', captionHidden && 'kaz-sr-only')}>{caption}</caption>}
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col" style={{ width: column.width, textAlign: column.align }} className="kaz-table__th">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="kaz-table__empty">
                {emptyState}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={getRowKey(row, index)} onClick={onRowClick ? () => onRowClick(row) : undefined}>
                {columns.map((column) => {
                  const content = column.render ? column.render(row, index) : ((row as Record<string, unknown>)[column.key] as ReactNode);
                  const Cell = column.rowHeader ? 'th' : 'td';
                  return (
                    <Cell key={column.key} scope={column.rowHeader ? 'row' : undefined} style={{ textAlign: column.align }} className="kaz-table__td">
                      {content}
                    </Cell>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
