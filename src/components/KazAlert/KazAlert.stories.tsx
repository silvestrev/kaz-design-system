import type { Meta, StoryObj } from '@storybook/react';
import { KazButton } from '../KazButton/KazButton';
import { KazIcon } from '../KazIcon/KazIcon';
import { KazAlert } from './KazAlert';

const meta = {
  title: 'Feedback/KazAlert',
  component: KazAlert,
  args: { tone: 'info', title: 'Lembrete', children: 'A sessão do Pedro foi remarcada para quinta-feira, às 14h.' },
  argTypes: { tone: { control: 'inline-radio', options: ['info', 'success', 'warning', 'danger', 'neutral'] } },
  parameters: {
    docs: {
      description: {
        component: 'Mensagens de contexto. `danger` e `warning` usam `role="alert"` (anunciados na hora); os outros usam `role="status"`. Escreva o que aconteceu e o que fazer em seguida.',
      },
    },
  },
} satisfies Meta<typeof KazAlert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tons: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 640 }}>
      <KazAlert tone="success" title="Tudo certo!">Relatório enviado para a família.</KazAlert>
      <KazAlert tone="info" title="Novidade">Agora é possível anexar fotos ao prontuário.</KazAlert>
      <KazAlert tone="warning" title="Atenção">A carteirinha do convênio vence em 5 dias.</KazAlert>
      <KazAlert tone="danger" title="Não foi possível salvar">Verifique sua conexão e tente de novo.</KazAlert>
      <KazAlert tone="neutral" title="Observação">Este paciente prefere ambientes com pouca luz.</KazAlert>
    </div>
  ),
};

export const Compacto: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 640 }}>
      <KazAlert tone="success" title="Arquivo enviado" />
      <KazAlert tone="info" title="Sincronizando agenda" icon={false} />
      <KazAlert tone="warning" title="Sessão expira em 2 minutos" onClose={() => undefined} />
    </div>
  ),
};

export const ComAcoes: Story = {
  name: 'Com ações',
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <KazAlert
        tone="info"
        title="Plano terapêutico pendente"
        onClose={() => undefined}
        actions={
          <>
            <KazButton size="xs" leftIcon={<KazIcon name="edit" />}>
              Revisar agora
            </KazButton>
            <KazButton size="xs" variant="ghost" tone="neutral">
              Depois
            </KazButton>
          </>
        }
      >
        O plano do Lucas precisa ser revisado até sexta-feira para manter a autorização do convênio.
      </KazAlert>
    </div>
  ),
};
