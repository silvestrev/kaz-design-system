import type { Meta, StoryObj } from '@storybook/react';
import { KazIcon } from '../KazIcon/KazIcon';
import { KazDropdown, type KazDropdownItem } from './KazDropdown';

const items: KazDropdownItem[] = [
  { label: 'Novo paciente', icon: <KazIcon name="user" /> },
  { label: 'Exportar relatório', icon: <KazIcon name="download" /> },
  { label: 'Detalhes', icon: <KazIcon name="info" /> },
  { label: 'Editar', icon: <KazIcon name="edit" /> },
  { type: 'divider' },
  { label: 'Sair', icon: <KazIcon name="logout" />, tone: 'danger' },
];

const meta = {
  title: 'Ações/KazDropdown',
  component: KazDropdown,
  args: { label: 'Ações', items },
  decorators: [(Story) => <div style={{ minHeight: 320 }}><Story /></div>],
  parameters: {
    docs: { description: { component: 'Menu de ações. Teclado: setas navegam, Home/End vão ao início/fim, Esc fecha e devolve o foco ao botão.' } },
  },
} satisfies Meta<typeof KazDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: 'Padrão' };
export const SemIcones: Story = { name: 'Sem ícones', args: { items: items.map((item) => ('icon' in item ? { ...item, icon: undefined } : item)), buttonProps: { variant: 'outline', tone: 'neutral' } } };
export const SoIcone: Story = {
  name: 'Só ícone',
  args: { label: undefined, buttonProps: { iconOnly: true, 'aria-label': 'Mais ações', rightIcon: <KazIcon name="chevron-down" /> } },
};
