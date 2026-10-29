import type { Meta, StoryObj } from '@storybook/react';
import { KazIcon } from '../KazIcon/KazIcon';
import { KazAccordion } from './KazAccordion';

const items = [
  {
    id: 'convenio',
    title: 'Vocês atendem por convênio?',
    content: (
      <>
        <p>Sim. Trabalhamos com os principais convênios e também com reembolso.</p>
        <p>
          Consulte a <a href="#">lista completa de convênios</a>.
        </p>
      </>
    ),
  },
  { id: 'primeira', title: 'Como funciona a primeira consulta?', content: 'É uma conversa de acolhimento com a família, sem a presença da criança, para entender a rotina e as necessidades.' },
  { id: 'relatorio', title: 'Com que frequência recebo relatórios?', content: 'Mensalmente, pelo aplicativo, com a evolução de cada objetivo do plano terapêutico.' },
];

const meta = {
  title: 'Navegação/KazAccordion',
  component: KazAccordion,
  args: { items, defaultValue: ['convenio'] },
  argTypes: { variant: { control: 'inline-radio', options: ['contained', 'separated', 'flush'] }, type: { control: 'inline-radio', options: ['single', 'multiple'] } },
  decorators: [(Story) => <div style={{ maxWidth: 640 }}><Story /></div>],
} satisfies Meta<typeof KazAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Contido: Story = {};
export const Separado: Story = { args: { variant: 'separated' } };
export const SemBorda: Story = { name: 'Sem borda (flush)', args: { variant: 'flush' } };
export const ComIcones: Story = {
  name: 'Com ícones',
  args: { items: items.map((item) => ({ ...item, icon: <KazIcon name="help" /> })), type: 'multiple' },
};
