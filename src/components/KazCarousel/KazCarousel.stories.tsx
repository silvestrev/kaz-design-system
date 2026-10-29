import type { Meta, StoryObj } from '@storybook/react';
import { KazCarousel, type KazCarouselSlide } from './KazCarousel';

const colors = ['#5c3db5', '#4c3394', '#6e4ccf'];
const slides: KazCarouselSlide[] = ['Primeiro slide', 'Segundo slide', 'Terceiro slide'].map((text, i) => ({
  id: String(i),
  content: (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: colors[i], color: '#ede9fc', fontSize: 28, fontWeight: 600 }}>{text}</div>
  ),
}));

const meta = {
  title: 'Dados/KazCarousel',
  component: KazCarousel,
  args: { slides, label: 'Destaques' },
  argTypes: { arrows: { control: 'inline-radio', options: ['inside', 'outside', 'none'] }, indicators: { control: 'inline-radio', options: ['inside', 'outside', 'none'] } },
  decorators: [(Story) => <div style={{ maxWidth: 560 }}><Story /></div>],
  parameters: { docs: { description: { component: 'Sem troca automática por padrão (melhor para leitura e para quem é sensível a movimento). Se usar `autoPlay`, ele pausa ao passar o mouse ou focar, e não roda com "reduzir movimento" ativo.' } } },
} satisfies Meta<typeof KazCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SetasDentro: Story = { name: 'Setas dentro', args: { indicators: 'none' } };
export const ComIndicadores: Story = { name: 'Com indicadores' };
export const IndicadoresFora: Story = { name: 'Indicadores fora', args: { indicators: 'outside' } };
export const SetasFora: Story = { name: 'Setas fora', args: { arrows: 'outside', indicators: 'outside' } };
export const ComLegenda: Story = {
  name: 'Com legenda',
  args: { slides: slides.map((slide, i) => ({ ...slide, caption: { title: `Legenda do slide ${i + 1}`, description: 'Texto de apoio curto e direto.' } })) },
};
