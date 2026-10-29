import type { Meta, StoryObj } from '@storybook/react';
import { KazButton } from '../KazButton/KazButton';
import { KazTooltip } from './KazTooltip';

const meta = {
  title: 'Feedback/KazTooltip',
  component: KazTooltip,
  args: { content: 'Dica no topo', children: <KazButton variant="outline" tone="neutral">Passe o mouse</KazButton> },
  argTypes: { placement: { control: 'inline-radio', options: ['top', 'bottom', 'left', 'right'] }, variant: { control: 'inline-radio', options: ['dark', 'light', 'subtle'] } },
  decorators: [(Story) => <div style={{ padding: '4rem 8rem' }}><Story /></div>],
  parameters: { docs: { description: { component: 'Texto curto de apoio, aberto por hover **ou foco** do teclado. Nunca coloque informação essencial só no tooltip.' } } },
} satisfies Meta<typeof KazTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Galeria: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 96, paddingTop: 48 }}>
      {(['dark', 'light', 'subtle'] as const).map((variant) => (
        <KazTooltip key={variant} content={`Tooltip ${variant}`} variant={variant} open>
          <KazButton variant="ghost" tone="neutral">{variant}</KazButton>
        </KazTooltip>
      ))}
      {(['bottom', 'right'] as const).map((placement) => (
        <KazTooltip key={placement} content={`Embaixo/direita: ${placement}`} placement={placement} open>
          <KazButton variant="ghost" tone="neutral">{placement}</KazButton>
        </KazTooltip>
      ))}
    </div>
  ),
};
