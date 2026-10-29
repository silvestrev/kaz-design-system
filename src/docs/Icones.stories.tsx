import type { Meta, StoryObj } from '@storybook/react';
import { KazIcon, kazIconNames } from '../components/KazIcon/KazIcon';

const meta = {
  title: 'Fundamentos/Ícones',
  component: KazIcon,
  args: { name: 'heart', size: 32 },
  argTypes: { name: { control: 'select', options: kazIconNames } },
  parameters: { docs: { description: { component: 'Conjunto mínimo de ícones de traço usados pelos componentes. Sem `label` o ícone é decorativo (escondido de leitores de tela). Para mais ícones, use qualquer biblioteca de SVG (ex.: Lucide) junto com o Kaz.' } } },
} satisfies Meta<typeof KazIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Todos: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 12 }}>
      {kazIconNames.map((name) => (
        <div key={name} style={{ display: 'grid', justifyItems: 'center', gap: 8, padding: 16, border: '1px solid var(--kaz-color-border)', borderRadius: 8, color: 'var(--kaz-color-text)' }}>
          <KazIcon name={name} size={24} />
          <code style={{ fontSize: 11, color: 'var(--kaz-color-text-subtle)' }}>{name}</code>
        </div>
      ))}
    </div>
  ),
};
