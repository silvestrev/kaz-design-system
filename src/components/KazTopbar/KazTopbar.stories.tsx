import type { Meta, StoryObj } from '@storybook/react';
import { KazButton } from '../KazButton/KazButton';
import { KazIcon } from '../KazIcon/KazIcon';
import { KazInput } from '../KazInput/KazInput';
import { KazTopbar, KazTopbarIconButton, KazTopbarLink } from './KazTopbar';

const brand = (
  <>
    <span style={{ display: 'inline-flex', width: 28, height: 28, borderRadius: 8, background: 'var(--kaz-primary-solid)', color: '#fff', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>b</span>
    bloo
  </>
);

const user = {
  name: 'Victor Silvestre',
  email: 'victor@bloo.dev',
  menu: [
    { label: 'Meu perfil', icon: <KazIcon name="user" /> },
    { label: 'Configurações', icon: <KazIcon name="settings" /> },
    { type: 'divider' as const },
    { label: 'Sair', icon: <KazIcon name="logout" />, tone: 'danger' as const },
  ],
};

const actions = (
  <>
    <KazButton size="sm" leftIcon={<KazIcon name="plus" />}>
      Novo agendamento
    </KazButton>
    <KazTopbarIconButton aria-label="Notificações, 3 novas" count={3}>
      <KazIcon name="bell" />
    </KazTopbarIconButton>
  </>
);

const meta = {
  title: 'Navegação/KazTopbar',
  component: KazTopbar,
  args: { brand, user, actions, onMenuClick: () => undefined },
  argTypes: { tone: { control: 'inline-radio', options: ['light', 'dark', 'brand'] } },
  parameters: { noPadding: true },
  decorators: [(Story) => <div style={{ minHeight: 320 }}><Story /></div>],
} satisfies Meta<typeof KazTopbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Aplicativo: Story = {
  args: { search: <KazInput aria-label="Buscar" placeholder="Buscar pacientes" size="sm" leftIcon={<KazIcon name="search" />} /> },
};

export const Site: Story = {
  args: {
    onMenuClick: undefined,
    user: undefined,
    nav: (
      <>
        <KazTopbarLink href="#" active>Início</KazTopbarLink>
        <KazTopbarLink href="#">Produtos</KazTopbarLink>
        <KazTopbarLink href="#">Sobre</KazTopbarLink>
        <KazTopbarLink href="#">Contato</KazTopbarLink>
      </>
    ),
    actions: <KazButton size="sm">Fale conosco</KazButton>,
  },
};

export const Escura: Story = { args: { tone: 'dark' } };
export const Marca: Story = { args: { tone: 'brand' } };
