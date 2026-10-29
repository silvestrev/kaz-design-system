import type { Meta, StoryObj } from '@storybook/react';
import { KazIcon } from '../KazIcon/KazIcon';
import { KazBadge } from './KazBadge';

const tones = ['neutral', 'primary', 'success', 'warning', 'danger', 'info'] as const;

const meta = {
  title: 'Feedback/KazBadge',
  component: KazBadge,
  args: { children: 'Confirmado', tone: 'success' },
  argTypes: { tone: { control: 'inline-radio', options: tones } },
} satisfies Meta<typeof KazBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const row = { display: 'flex', flexWrap: 'wrap' as const, gap: 10, marginBottom: 16, alignItems: 'center' };

export const Galeria: Story = {
  render: () => (
    <div>
      {(['soft', 'solid', 'outline'] as const).map((variant) => (
        <div key={variant} style={row}>
          {tones.map((tone) => (
            <KazBadge key={tone} tone={tone} variant={variant}>
              {tone}
            </KazBadge>
          ))}
        </div>
      ))}
      <div style={row}>
        {tones.map((tone) => (
          <KazBadge key={tone} tone={tone} size="md" icon={<KazIcon name="clock" />}>
            Badge
          </KazBadge>
        ))}
      </div>
      <div style={row}>
        {tones.map((tone) => (
          <KazBadge key={tone} tone={tone} dot>
            Status
          </KazBadge>
        ))}
      </div>
      <div style={row}>
        {tones.map((tone, i) => (
          <KazBadge key={tone} tone={tone} circle aria-label={`${i + 1} novas`}>
            {i + 1}
          </KazBadge>
        ))}
      </div>
    </div>
  ),
};
