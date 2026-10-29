import type { Meta, StoryObj } from '@storybook/react';

const sizes = [
  ['5xl', '3rem · 48px', 'Cuidado que acolhe'],
  ['4xl', '2.25rem · 36px', 'Cuidado que acolhe'],
  ['3xl', '1.875rem · 30px', 'Cuidado que acolhe'],
  ['2xl', '1.5rem · 24px', 'Cuidado que acolhe'],
  ['xl', '1.25rem · 20px', 'Cuidado que acolhe'],
  ['lg', '1.125rem · 18px', 'A agenda da semana está organizada.'],
  ['md', '1rem · 16px', 'A agenda da semana está organizada.'],
  ['sm', '0.875rem · 14px', 'A agenda da semana está organizada.'],
  ['xs', '0.75rem · 12px', 'A agenda da semana está organizada.'],
];

function Scale() {
  return (
    <div style={{ display: 'grid', gap: 20, color: 'var(--kaz-color-text)' }}>
      <p style={{ margin: 0, color: 'var(--kaz-color-text-muted)', fontSize: 14 }}>
        Fonte: <strong>Inter</strong> (carregue pelo Google Fonts; o Kaz cai para a fonte do sistema se ela não estiver disponível).
      </p>
      {sizes.map(([token, size, sample]) => (
        <div key={token} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'baseline', gap: 16, borderTop: '1px solid var(--kaz-color-border)', paddingTop: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--kaz-color-text-subtle)' }}>
            <code>--kaz-text-{token}</code>
            <div>{size}</div>
          </div>
          <div style={{ fontSize: `var(--kaz-text-${token})`, fontWeight: ['5xl', '4xl', '3xl', '2xl', 'xl'].includes(token) ? 700 : 400, lineHeight: 1.3 }}>{sample}</div>
        </div>
      ))}
    </div>
  );
}

const meta = { title: 'Fundamentos/Tipografia', component: Scale } satisfies Meta<typeof Scale>;
export default meta;
export const Escala: StoryObj<typeof meta> = {};
