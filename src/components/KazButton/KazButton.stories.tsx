import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { KazIcon } from '../KazIcon/KazIcon';
import { KazButton, KazButtonGroup } from './KazButton';

const meta = {
  title: 'Ações/KazButton',
  component: KazButton,
  args: { children: 'Agendar sessão', variant: 'solid', tone: 'primary', size: 'md' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['solid', 'soft', 'outline', 'ghost', 'link'] },
    tone: { control: 'inline-radio', options: ['primary', 'neutral', 'success', 'danger', 'warning'] },
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Botão principal do Kaz. Use **um** botão `solid primary` por área para a ação mais importante; as demais ficam em `soft`, `outline` ou `ghost`. Isso mantém a hierarquia clara e reduz a carga de decisão.',
      },
    },
  },
} satisfies Meta<typeof KazButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const row = { display: 'flex', flexWrap: 'wrap' as const, gap: 12, alignItems: 'center', marginBottom: 16 };

export const Variantes: Story = {
  render: (args) => (
    <div style={row}>
      {(['solid', 'soft', 'outline', 'ghost', 'link'] as const).map((variant) => (
        <KazButton key={variant} {...args} variant={variant}>
          {variant}
        </KazButton>
      ))}
    </div>
  ),
};

export const Tons: Story = {
  render: (args) => (
    <div>
      {(['solid', 'soft', 'outline'] as const).map((variant) => (
        <div key={variant} style={row}>
          {(['primary', 'neutral', 'success', 'danger', 'warning'] as const).map((tone) => (
            <KazButton key={tone} {...args} variant={variant} tone={tone}>
              {tone}
            </KazButton>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Tamanhos: Story = {
  render: (args) => (
    <div style={row}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <KazButton key={size} {...args} size={size}>
          Tamanho {size}
        </KazButton>
      ))}
    </div>
  ),
};

export const ComIcones: Story = {
  name: 'Com ícones',
  render: (args) => (
    <div style={row}>
      <KazButton {...args} leftIcon={<KazIcon name="calendar" />}>
        Agendar
      </KazButton>
      <KazButton {...args} variant="soft" rightIcon={<KazIcon name="arrow-right" />}>
        Continuar
      </KazButton>
      <KazButton {...args} iconOnly aria-label="Adicionar paciente">
        <KazIcon name="plus" />
      </KazButton>
      <KazButton {...args} variant="outline" tone="neutral" iconOnly aria-label="Configurações">
        <KazIcon name="settings" />
      </KazButton>
    </div>
  ),
};

export const Estados: Story = {
  render: (args) => (
    <div style={row}>
      <KazButton {...args} loading>
        Salvando
      </KazButton>
      <KazButton {...args} disabled>
        Desabilitado
      </KazButton>
      <KazButton {...args} href="https://bloo.dev" variant="outline">
        Como link
      </KazButton>
    </div>
  ),
};

export const Grupo: Story = {
  render: () => {
    const [period, setPeriod] = useState('months');
    return (
      <div style={{ display: 'grid', gap: 24, justifyItems: 'start' }}>
        <KazButtonGroup label="Período">
          {[
            ['years', 'Anos'],
            ['months', 'Meses'],
            ['days', 'Dias'],
          ].map(([value, text]) => (
            <KazButton key={value} variant="outline" tone="neutral" pressed={period === value} onClick={() => setPeriod(value)}>
              {text}
            </KazButton>
          ))}
        </KazButtonGroup>
        <KazButtonGroup label="Navegar">
          <KazButton variant="outline" tone="neutral" iconOnly aria-label="Anterior">
            <KazIcon name="chevron-left" />
          </KazButton>
          <KazButton variant="outline" tone="neutral" iconOnly aria-label="Próximo">
            <KazIcon name="chevron-right" />
          </KazButton>
        </KazButtonGroup>
      </div>
    );
  },
};
