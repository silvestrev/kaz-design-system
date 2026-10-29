import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { KazButton } from '../KazButton/KazButton';
import { KazIcon } from '../KazIcon/KazIcon';
import { KazAutocomplete, type KazAutocompleteOption } from './KazAutocomplete';

const recents: KazAutocompleteOption[] = [
  { id: '1', label: 'Personalizar cores', group: 'Recentes', removable: true },
  { id: '2', label: 'Espaçamento', group: 'Recentes', removable: true },
  { id: '3', label: 'Design responsivo', group: 'Recentes', removable: true },
  { id: '4', label: 'Tipografia', group: 'Recentes', removable: true },
  { id: '5', label: 'Grid Template Columns', group: 'Layout' },
  { id: '6', label: 'Grid Template Rows', group: 'Layout' },
  { id: '7', label: 'Inline Grid', group: 'Layout' },
];

const meta = {
  title: 'Formulários/KazAutocomplete',
  component: KazAutocomplete,
  args: { label: 'Buscar', options: recents, onSelect: () => undefined },
  decorators: [(Story) => <div style={{ maxWidth: 380, minHeight: 420 }}><Story /></div>],
} satisfies Meta<typeof KazAutocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: 'Padrão',
  render: (args) => {
    const [options, setOptions] = useState(recents);
    return <KazAutocomplete {...args} options={options} onRemove={(o) => setOptions(options.filter((x) => x.id !== o.id))} />;
  },
};

export const Cartoes: Story = { name: 'Cartões', args: { variant: 'cards' } };

export const ComRodape: Story = {
  name: 'Com ação no rodapé',
  args: {
    label: 'Buscar paciente',
    placeholder: 'Nome do paciente',
    options: [
      { id: 'a', label: 'Ana Souza', group: 'Pacientes', icon: <KazIcon name="user" /> },
      { id: 'b', label: 'Bruno Lima', group: 'Pacientes', icon: <KazIcon name="user" /> },
      { id: 'c', label: 'Carla Mendes', group: 'Pacientes', icon: <KazIcon name="user" /> },
    ],
    footer: (
      <KazButton variant="ghost" size="sm" leftIcon={<KazIcon name="plus" />}>
        Cadastrar novo paciente
      </KazButton>
    ),
  },
};
