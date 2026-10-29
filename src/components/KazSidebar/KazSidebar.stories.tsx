import type { Meta, StoryObj } from '@storybook/react';
import { KazIcon } from '../KazIcon/KazIcon';
import { KazSidebar, type KazSidebarSection } from './KazSidebar';

const sections: KazSidebarSection[] = [
  {
    items: [
      { id: 'overview', label: 'Visão geral', icon: <KazIcon name="chart" />, href: '#' },
      { id: 'agenda', label: 'Agenda', icon: <KazIcon name="calendar" />, href: '#' },
      {
        id: 'financeiro',
        label: 'Financeiro',
        icon: <KazIcon name="file" />,
        children: [
          { id: 'faturas', label: 'Faturas', href: '#', active: true },
          { id: 'cobranca', label: 'Cobrança', href: '#' },
          { id: 'convenios', label: 'Convênios', href: '#' },
        ],
      },
      { id: 'mensagens', label: 'Mensagens', icon: <KazIcon name="inbox" />, href: '#', badge: 3 },
      { id: 'acesso', label: 'Acessos', icon: <KazIcon name="lock" />, children: [{ id: 'usuarios', label: 'Usuários', href: '#' }] },
    ],
  },
  {
    title: 'Ajuda',
    items: [
      { id: 'docs', label: 'Documentação', icon: <KazIcon name="file" />, href: '#' },
      { id: 'componentes', label: 'Componentes', icon: <KazIcon name="grid" />, href: '#' },
      { id: 'suporte', label: 'Suporte', icon: <KazIcon name="help" />, href: '#' },
    ],
  },
];

const footer = (
  <>
    {(['settings', 'bell', 'user'] as const).map((name) => (
      <button key={name} type="button" aria-label={name} style={{ display: 'inline-flex', padding: 8, border: 0, background: 'transparent', color: 'inherit', borderRadius: 8, cursor: 'pointer' }}>
        <KazIcon name={name} />
      </button>
    ))}
  </>
);

const meta = {
  title: 'Navegação/KazSidebar',
  component: KazSidebar,
  args: { sections, footer, header: 'bloo' },
  argTypes: { tone: { control: 'inline-radio', options: ['light', 'dark', 'brand'] } },
  parameters: { noPadding: true },
  decorators: [(Story) => <div style={{ height: 640, display: 'flex' }}><Story /></div>],
} satisfies Meta<typeof KazSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Clara: Story = {};
export const Escura: Story = { args: { tone: 'dark' } };
export const Marca: Story = { args: { tone: 'brand' } };
export const Compacta: Story = {
  name: 'Compacta (só ícones)',
  render: (args) => (
    <div style={{ display: 'flex', gap: 24 }}>
      <KazSidebar {...args} collapsed header="b" />
      <KazSidebar {...args} collapsed tone="brand" header="b" />
      <KazSidebar {...args} collapsed tone="dark" header="b" sections={sections.map((s) => ({ ...s, items: s.items.map(({ icon: _icon, ...i }) => i) }))} />
    </div>
  ),
};
