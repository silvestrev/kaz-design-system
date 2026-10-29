import type { Meta, StoryObj } from '@storybook/react';
import { KazAvatar } from './KazAvatar';

const meta = {
  title: 'Dados/KazAvatar',
  component: KazAvatar,
  args: { name: 'Ana Souza' },
} satisfies Meta<typeof KazAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Iniciais: Story = {};
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <KazAvatar key={size} name="Victor Silvestre" size={size} />
      ))}
    </div>
  ),
};
