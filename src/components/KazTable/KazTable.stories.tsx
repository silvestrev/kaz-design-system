import type { Meta, StoryObj } from '@storybook/react';
import { KazBadge } from '../KazBadge/KazBadge';
import { KazTable, type KazTableColumn } from './KazTable';

interface Payment {
  id: string;
  who: string;
  prefix: string;
  date: string;
  amount: string;
  status: 'pago' | 'cancelado' | 'pendente';
}

const data: Payment[] = [
  { id: '1', prefix: 'Pagamento de', who: 'Ana Souza', date: '23/04/2026', amount: 'R$ 2.300,00', status: 'pago' },
  { id: '2', prefix: 'Reembolso para', who: '#00910', date: '23/04/2026', amount: '-R$ 670,00', status: 'pago' },
  { id: '3', prefix: 'Falha no pagamento de', who: '#087651', date: '18/04/2026', amount: 'R$ 234,00', status: 'cancelado' },
  { id: '4', prefix: 'Pagamento de', who: 'Bruno Lima', date: '15/04/2026', amount: 'R$ 5.000,00', status: 'pendente' },
  { id: '5', prefix: 'Pagamento de', who: 'Carla Mendes', date: '15/04/2026', amount: 'R$ 2.300,00', status: 'pago' },
  { id: '6', prefix: 'Pagamento de', who: 'Instituto Raízes', date: '11/04/2026', amount: 'R$ 560,00', status: 'pago' },
];

const statusTone = { pago: 'success', cancelado: 'danger', pendente: 'primary' } as const;
const statusText = { pago: 'Pago', cancelado: 'Cancelado', pendente: 'Em andamento' };

const columns: KazTableColumn<Payment>[] = [
  { key: 'who', header: 'Transação', rowHeader: true, render: (row) => <span style={{ fontWeight: 400 }}>{row.prefix} <strong>{row.who}</strong></span> },
  { key: 'date', header: 'Data', render: (row) => <span style={{ color: 'var(--kaz-color-text-subtle)' }}>{row.date}</span> },
  { key: 'amount', header: 'Valor', align: 'end', render: (row) => <strong>{row.amount}</strong> },
  { key: 'status', header: 'Status', render: (row) => <KazBadge tone={statusTone[row.status]} dot>{statusText[row.status]}</KazBadge> },
];

const meta = {
  title: 'Dados/KazTable',
  component: KazTable<Payment>,
  args: { columns, data, caption: 'Pagamentos de abril', captionHidden: true, getRowKey: (row: Payment) => row.id },
} satisfies Meta<typeof KazTable<Payment>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: 'Padrão' };
export const Zebrada: Story = { args: { striped: true } };
export const Compacta: Story = { args: { density: 'compact' } };
export const Vazia: Story = { args: { data: [], emptyState: 'Nenhum pagamento neste período.' } };
