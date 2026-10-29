import type { Meta, StoryObj } from '@storybook/react';
import { KazDivider } from './KazDivider';

const meta = {
  title: 'Navegação/KazDivider',
  component: KazDivider,
  decorators: [(Story) => <div style={{ maxWidth: 420 }}><Story /></div>],
} satisfies Meta<typeof KazDivider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};
export const ComTexto: Story = { name: 'Com texto', args: { label: 'ou' } };
export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', fontSize: 14 }}>
      Agenda <KazDivider orientation="vertical" /> Pacientes <KazDivider orientation="vertical" /> Relatórios
    </div>
  ),
};
