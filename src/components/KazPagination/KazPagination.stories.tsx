import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { KazPagination } from './KazPagination';

const meta = {
  title: 'Navegação/KazPagination',
  component: KazPagination,
  args: { page: 2, totalPages: 10, onChange: () => undefined },
} satisfies Meta<typeof KazPagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variantes: Story = {
  render: () => {
    const [page, setPage] = useState(2);
    return (
      <div style={{ display: 'grid', gap: 28, justifyItems: 'start' }}>
        <KazPagination page={page} totalPages={10} onChange={setPage} />
        <KazPagination page={page} totalPages={10} onChange={setPage} variant="arrows" />
        <KazPagination page={page} totalPages={10} onChange={setPage} variant="simple" />
        <KazPagination page={page} totalPages={10} onChange={setPage} variant="simple" size="sm" summary={{ pageSize: 10, total: 100 }} />
      </div>
    );
  },
};

export const MuitasPaginas: Story = {
  name: 'Muitas páginas',
  render: () => {
    const [page, setPage] = useState(12);
    return <KazPagination page={page} totalPages={40} onChange={setPage} summary={{ pageSize: 25, total: 987 }} />;
  },
};
