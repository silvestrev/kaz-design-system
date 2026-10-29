import type { Meta, StoryObj } from '@storybook/react';
import { KazSparkline } from './KazSparkline';

const data = [12, 14, 13, 18, 24, 22, 19, 17, 16, 21, 23, 20, 18];

const meta = {
  title: 'Dados/KazSparkline',
  component: KazSparkline,
  args: { data, label: 'Atendimentos nas últimas 13 semanas, tendência de alta', height: 64 },
  argTypes: { tone: { control: 'inline-radio', options: ['primary', 'success', 'warning', 'danger', 'info', 'neutral'] } },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
} satisfies Meta<typeof KazSparkline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Linha: Story = {};
export const Area: Story = { name: 'Área', args: { area: true, tone: 'warning' } };
export const Retas: Story = { args: { smooth: false, tone: 'success' } };
export const Miniatura: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14 }}>
      <strong>128 sessões</strong>
      <div style={{ width: 96 }}>
        <KazSparkline data={data} height={24} label="Tendência de alta" strokeWidth={1.5} />
      </div>
    </div>
  ),
};
