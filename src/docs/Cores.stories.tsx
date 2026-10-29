import type { Meta, StoryObj } from '@storybook/react';

const scales = {
  Roxo: 'purple',
  Cinza: 'gray',
} as const;
const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const semantic = [
  ['--kaz-color-bg', 'Fundo da página'],
  ['--kaz-color-surface', 'Superfícies (cartões, menus)'],
  ['--kaz-color-surface-muted', 'Superfície discreta'],
  ['--kaz-color-border', 'Bordas'],
  ['--kaz-color-text', 'Texto principal'],
  ['--kaz-color-text-muted', 'Texto secundário'],
  ['--kaz-color-text-subtle', 'Texto de apoio'],
  ['--kaz-primary-solid', 'Ação principal'],
  ['--kaz-primary-soft', 'Destaque suave'],
  ['--kaz-success-solid', 'Sucesso'],
  ['--kaz-warning-solid', 'Atenção'],
  ['--kaz-danger-solid', 'Erro'],
  ['--kaz-info-solid', 'Informação'],
];

function Swatch({ variable, label }: { variable: string; label: string }) {
  return (
    <div style={{ display: 'grid', gap: 6, fontSize: 12 }}>
      <div style={{ height: 56, borderRadius: 8, background: `var(${variable})`, border: '1px solid var(--kaz-color-border)' }} />
      <strong style={{ color: 'var(--kaz-color-text)' }}>{label}</strong>
      <code style={{ color: 'var(--kaz-color-text-subtle)' }}>{variable}</code>
    </div>
  );
}

function Palette() {
  return (
    <div style={{ display: 'grid', gap: 40 }}>
      {Object.entries(scales).map(([name, key]) => (
        <section key={key}>
          <h3 style={{ margin: '0 0 12px', color: 'var(--kaz-color-text)' }}>{name}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(88px, 1fr))', gap: 12 }}>
            {steps.map((step) => (
              <Swatch key={step} variable={`--kaz-${key}-${step}`} label={String(step)} />
            ))}
          </div>
        </section>
      ))}
      <section>
        <h3 style={{ margin: '0 0 4px', color: 'var(--kaz-color-text)' }}>Semânticas</h3>
        <p style={{ margin: '0 0 12px', color: 'var(--kaz-color-text-muted)', fontSize: 14 }}>Mudam com o tema. Use sempre estas nos componentes, nunca a escala direto.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 16 }}>
          {semantic.map(([variable, label]) => (
            <Swatch key={variable} variable={variable} label={label} />
          ))}
        </div>
      </section>
    </div>
  );
}

const meta = { title: 'Fundamentos/Cores', component: Palette } satisfies Meta<typeof Palette>;
export default meta;
export const Paleta: StoryObj<typeof meta> = {};
