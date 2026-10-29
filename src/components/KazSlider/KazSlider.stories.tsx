import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { KazSlider } from './KazSlider';

const meta = {
  title: 'Formulários/KazSlider',
  component: KazSlider,
  decorators: [(Story) => <div style={{ maxWidth: 480, paddingTop: 16 }}><Story /></div>],
} satisfies Meta<typeof KazSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simples: Story = { args: { label: 'Volume', defaultValue: 30 } };
export const TooltipSempre: Story = { name: 'Valor sempre visível', args: { label: 'Duração da sessão', defaultValue: 50, min: 30, max: 90, step: 5, showTooltip: 'always', formatValue: (v) => `${v} min` } };

export const Intervalo: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number]>([4, 8]);
    return (
      <div style={{ display: 'grid', gap: 12 }}>
        <KazSlider label="Faixa etária" min={0} max={18} value={value} onChange={setValue} formatValue={(v) => `${v} anos`} />
        <small>
          De {value[0]} a {value[1]} anos
        </small>
      </div>
    );
  },
};

export const Desabilitado: Story = { args: { 'aria-label': 'Brilho', defaultValue: 60, disabled: true } };
