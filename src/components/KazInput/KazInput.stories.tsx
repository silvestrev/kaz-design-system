import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { KazIcon } from '../KazIcon/KazIcon';
import { KazInput, KazSelect, KazTextarea } from './KazInput';

const meta = {
  title: 'Formulários/KazInput',
  component: KazInput,
  args: { label: 'E-mail', placeholder: 'nome@clinica.com.br', size: 'md' },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
  parameters: {
    docs: {
      description: {
        component: 'Campo de texto com rótulo, ajuda e validação já ligados por ARIA. Sempre informe `label`: placeholder não substitui rótulo.',
      },
    },
  },
} satisfies Meta<typeof KazInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Estados: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 20 }}>
      <KazInput {...args} label="Padrão" />
      <KazInput {...args} label="Com ajuda" hint="Nunca compartilhamos seu e-mail." />
      <KazInput {...args} label="Com ícone" leftIcon={<KazIcon name="mail" />} />
      <KazInput {...args} label="Sucesso" defaultValue="ana@clinica.com.br" success="E-mail disponível." />
      <KazInput {...args} label="Erro" defaultValue="ana@" error="Digite um e-mail válido." />
      <KazInput {...args} label="Desabilitado" disabled />
      <KazInput {...args} label="Obrigatório" required />
    </div>
  ),
};

export const Tamanhos: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <KazInput key={size} {...args} size={size} label={`Tamanho ${size}`} leftIcon={<KazIcon name="search" />} placeholder="Buscar" />
      ))}
    </div>
  ),
};

export const ComLimpar: Story = {
  name: 'Com botão de limpar',
  render: (args) => {
    const [value, setValue] = useState('Ana Souza');
    return <KazInput {...args} label="Paciente" value={value} onChange={(e) => setValue(e.target.value)} onClear={() => setValue('')} leftIcon={<KazIcon name="user" />} />;
  },
};

export const Select: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 20 }}>
      <KazSelect
        label="Especialidade"
        placeholder="Selecione"
        options={[
          { value: 'aba', label: 'Terapia ABA' },
          { value: 'fono', label: 'Fonoaudiologia' },
          { value: 'to', label: 'Terapia ocupacional' },
          { value: 'psico', label: 'Psicologia' },
        ]}
      />
      <KazSelect label="Idioma" defaultValue="pt" options={[{ value: 'pt', label: 'Português (Brasil)' }, { value: 'en', label: 'English' }]} />
    </div>
  ),
};

export const Textarea: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 20 }}>
      <KazTextarea label="Observações da sessão" placeholder="Escreva aqui..." hint="Visível só para a equipe." />
      <KazTextarea label="Mensagem" error="Escreva pelo menos 10 caracteres." defaultValue="Oi" />
    </div>
  ),
};
