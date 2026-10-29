import type { Meta, StoryObj } from '@storybook/react';
import { KazBadge } from '../KazBadge/KazBadge';
import { KazIcon } from '../KazIcon/KazIcon';
import { KazListGroup } from './KazListGroup';

const meta = {
  title: 'Navegação/KazListGroup',
  component: KazListGroup,
  args: {
    items: [{ label: 'Perfil' }, { label: 'Configurações' }, { label: 'Mensagens' }, { label: 'Downloads' }],
  },
  decorators: [(Story) => <div style={{ maxWidth: 320 }}><Story /></div>],
} satisfies Meta<typeof KazListGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simples: Story = {};
export const Interativa: Story = {
  args: {
    label: 'Conta',
    items: [
      { label: 'Perfil', icon: <KazIcon name="user" />, onClick: () => undefined, active: true },
      { label: 'Configurações', icon: <KazIcon name="settings" />, onClick: () => undefined },
      { label: 'Mensagens', icon: <KazIcon name="inbox" />, onClick: () => undefined, end: <KazBadge tone="primary" circle>3</KazBadge> },
      { label: 'Downloads', icon: <KazIcon name="download" />, onClick: () => undefined, disabled: true },
    ],
  },
};
