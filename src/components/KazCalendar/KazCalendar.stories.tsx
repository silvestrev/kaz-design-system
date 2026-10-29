import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { KazCalendar, type KazDateRange } from './KazCalendar';

const meta = {
  title: 'Formulários/KazCalendar',
  component: KazCalendar,
  parameters: {
    docs: {
      description: {
        component: 'Calendário em pt-BR por padrão. Clique no título para escolher mês e ano. Teclado: setas movem o dia, PageUp/PageDown trocam o mês, Home/End vão ao início/fim da semana.',
      },
    },
  },
} satisfies Meta<typeof KazCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DataUnica: Story = {
  name: 'Data única',
  args: { value: null, onChange: () => undefined },
  render: () => {
    const [value, setValue] = useState<Date | null>(new Date());
    return <KazCalendar value={value} onChange={setValue} />;
  },
};

export const Periodo: Story = {
  name: 'Período (dois meses)',
  args: { value: null, onChange: () => undefined },
  render: () => {
    const [value, setValue] = useState<KazDateRange>({ start: null, end: null });
    return <KazCalendar mode="range" numberOfMonths={2} value={value} onChange={setValue} />;
  },
};

export const SemFimDeSemana: Story = {
  name: 'Sem fins de semana',
  args: { value: null, onChange: () => undefined },
  render: () => {
    const [value, setValue] = useState<Date | null>(null);
    return <KazCalendar value={value} onChange={setValue} weekStartsOn={1} minDate={new Date()} isDateDisabled={(d) => d.getDay() === 0 || d.getDay() === 6} />;
  },
};
