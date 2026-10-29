import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { KazCheckbox, KazRadio, KazRadioGroup, KazSwitch } from './KazCheckbox';

const meta = {
  title: 'Formulários/KazCheckbox, KazRadio e KazSwitch',
  component: KazCheckbox,
  args: { label: 'Lembrar de mim' },
} satisfies Meta<typeof KazCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const col = { display: 'grid', gap: 14, justifyItems: 'start' as const };

export const Checkbox: Story = {
  render: () => (
    <div style={col}>
      <KazCheckbox label="Não marcado" />
      <KazCheckbox label="Marcado" defaultChecked />
      <KazCheckbox label="Parcial" indeterminate />
      <KazCheckbox label="Desabilitado" disabled />
      <KazCheckbox label="Aceito os termos de uso" description="Você pode revogar a qualquer momento." />
      <KazCheckbox aria-label="Selecionar linha" />
    </div>
  ),
};

export const Radio: Story = {
  render: () => {
    const [value, setValue] = useState('presencial');
    return (
      <div style={{ display: 'grid', gap: 32 }}>
        <KazRadioGroup
          name="modalidade"
          label="Modalidade da sessão"
          value={value}
          onChange={setValue}
          options={[
            { value: 'presencial', label: 'Presencial', description: 'Na clínica' },
            { value: 'online', label: 'Online', description: 'Por videochamada' },
            { value: 'domiciliar', label: 'Domiciliar', disabled: true, description: 'Indisponível no momento' },
          ]}
        />
        <div style={{ display: 'flex', gap: 24 }}>
          <KazRadio name="solto" label="Opção solta A" defaultChecked />
          <KazRadio name="solto" label="Opção solta B" />
        </div>
      </div>
    );
  },
};

export const Switch: Story = {
  render: () => (
    <div style={col}>
      <KazSwitch label="Desligado" />
      <KazSwitch label="Ligado" defaultChecked />
      <KazSwitch label="Notificações por e-mail" description="Avisos de sessão e relatórios." defaultChecked />
      <KazSwitch label="Pequeno" size="sm" />
      <KazSwitch label="Desabilitado" disabled />
    </div>
  ),
};
