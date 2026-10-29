import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import type { KazDateRange } from '../KazCalendar/KazCalendar';
import { KazDatepicker } from './KazDatepicker';

const meta = {
  title: 'Formulários/KazDatepicker',
  component: KazDatepicker,
  decorators: [(Story) => <div style={{ minHeight: 520 }}><Story /></div>],
} satisfies Meta<typeof KazDatepicker>;

export default meta;
type Story = StoryObj;

export const Data: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <div style={{ maxWidth: 320 }}>
        <KazDatepicker label="Data da avaliação" value={value} onChange={setValue} />
      </div>
    );
  },
};

export const Periodo: Story = {
  name: 'Período',
  render: () => {
    const [value, setValue] = useState<KazDateRange>({ start: null, end: null });
    return (
      <div style={{ maxWidth: 320 }}>
        <KazDatepicker mode="range" label="Período do relatório" value={value} onChange={setValue} />
      </div>
    );
  },
};

export const SemConfirmacao: Story = {
  name: 'Sem confirmação',
  render: () => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <div style={{ maxWidth: 320 }}>
        <KazDatepicker label="Nascimento" value={value} onChange={setValue} confirm={false} maxDate={new Date()} hint="Clique no ano no topo para navegar rápido." />
      </div>
    );
  },
};
