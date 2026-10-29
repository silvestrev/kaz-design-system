import type { Meta, StoryObj } from '@storybook/react';
import { KazSpinner } from './KazSpinner';

const meta = {
  title: 'Feedback/KazSpinner',
  component: KazSpinner,
  args: { size: 'md', variant: 'ring' },
  parameters: { docs: { description: { component: 'Indicador de carregamento. Com "reduzir movimento" ativo no sistema, gira bem mais devagar.' } } },
} satisfies Meta<typeof KazSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Galeria: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      {(['ring', 'arc'] as const).map((variant) => (
        <div key={variant} style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <KazSpinner key={size} size={size} variant={variant} />
          ))}
          <KazSpinner size="md" variant={variant} tone="neutral" />
          <KazSpinner size="md" variant={variant} tone="success" />
        </div>
      ))}
    </div>
  ),
};
