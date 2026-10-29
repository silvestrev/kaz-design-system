import type { Meta, StoryObj } from '@storybook/react';
import { KazProgress } from './KazProgress';

const tones = ['primary', 'success', 'warning', 'danger', 'info', 'neutral'] as const;

const meta = {
  title: 'Feedback/KazProgress',
  component: KazProgress,
  args: { value: 60, label: 'Plano terapêutico' },
  argTypes: { tone: { control: 'inline-radio', options: tones }, size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
  decorators: [(Story) => <div style={{ maxWidth: 420 }}><Story /></div>],
} satisfies Meta<typeof KazProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Galeria: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 32, maxWidth: 'none' }}>
      {tones.map((tone) => (
        <div key={tone} style={{ display: 'grid', gap: 12 }}>
          {[100, 75, 50, 25].map((value) => (
            <KazProgress key={value} value={value} tone={tone} aria-label={`${tone} ${value}%`} />
          ))}
        </div>
      ))}
    </div>
  ),
};

export const RotuloNoInicio: Story = { name: 'Valor no início', args: { label: undefined, labelAlign: 'start', 'aria-label': 'Progresso' } };
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <KazProgress value={40} size="sm" label="Pequeno" />
      <KazProgress value={55} size="md" label="Médio" />
      <KazProgress value={70} size="lg" label="Grande" />
    </div>
  ),
};
