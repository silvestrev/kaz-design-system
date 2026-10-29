import type { Meta, StoryObj } from '@storybook/react';
import { KazIcon } from '../KazIcon/KazIcon';
import { KazBreadcrumb } from './KazBreadcrumb';

const items = [
  { label: 'Início', href: '#', icon: <KazIcon name="home" /> },
  { label: 'Pacientes', href: '#' },
  { label: 'Ana Souza' },
];

const meta = {
  title: 'Navegação/KazBreadcrumb',
  component: KazBreadcrumb,
  args: { items },
} satisfies Meta<typeof KazBreadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simples: Story = {};
export const ComFundo: Story = { name: 'Com fundo', args: { variant: 'contained' } };
