import type { Meta, StoryObj } from '@storybook/react';
import { KazIcon } from '../KazIcon/KazIcon';
import { KazTabs } from './KazTabs';

const items = [
  { id: 'conta', label: 'Minha conta', icon: <KazIcon name="user" />, content: 'Dados pessoais e senha.' },
  { id: 'config', label: 'Configurações', icon: <KazIcon name="settings" />, content: 'Preferências da clínica.' },
  { id: 'downloads', label: 'Downloads', icon: <KazIcon name="download" />, content: 'Relatórios exportados.' },
  { id: 'faturas', label: 'Faturas', icon: <KazIcon name="file" />, content: 'Histórico de pagamentos.', disabled: true },
];

const meta = {
  title: 'Navegação/KazTabs',
  component: KazTabs,
  args: { items, label: 'Perfil', defaultValue: 'config' },
  argTypes: { variant: { control: 'inline-radio', options: ['underline', 'pill', 'segmented'] } },
  decorators: [(Story) => <div style={{ maxWidth: 720 }}><Story /></div>],
} satisfies Meta<typeof KazTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sublinhado: Story = {};
export const Pilula: Story = { name: 'Pílula', args: { variant: 'pill' } };
export const Segmentado: Story = { args: { variant: 'segmented' } };
export const SemIcones: Story = { name: 'Sem ícones', args: { items: items.map(({ icon: _icon, ...item }) => item) } };
