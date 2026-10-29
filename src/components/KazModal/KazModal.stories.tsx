import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { KazButton } from '../KazButton/KazButton';
import { KazCheckbox } from '../KazCheckbox/KazCheckbox';
import { KazIcon } from '../KazIcon/KazIcon';
import { KazInput } from '../KazInput/KazInput';
import { KazModal } from './KazModal';

const meta = {
  title: 'Feedback/KazModal',
  component: KazModal,
  args: { open: false, onClose: () => undefined },
  parameters: { docs: { description: { component: 'Diálogo modal com foco preso, Esc para fechar e foco devolvido ao fechar. Use com moderação: interrompe o fluxo.' } } },
} satisfies Meta<typeof KazModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Termos: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <KazButton onClick={() => setOpen(true)}>Ver termos de uso</KazButton>
        <KazModal open={open} onClose={() => setOpen(false)} title="Termos de uso" footer={<KazButton onClick={() => setOpen(false)}>Eu aceito</KazButton>}>
          <p>Os dados de saúde são tratados conforme a LGPD e acessados apenas pela equipe responsável pelo atendimento.</p>
          <p>Você pode solicitar a exportação ou exclusão dos seus dados a qualquer momento pelo e-mail da clínica.</p>
        </KazModal>
      </>
    );
  },
};

export const Confirmacao: Story = {
  name: 'Confirmação',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <KazButton tone="danger" variant="soft" onClick={() => setOpen(true)}>
          Excluir agendamento
        </KazButton>
        <KazModal
          open={open}
          onClose={() => setOpen(false)}
          size="sm"
          centered
          footer={
            <>
              <KazButton tone="danger" onClick={() => setOpen(false)}>
                Sim, excluir
              </KazButton>
              <KazButton variant="outline" tone="neutral" onClick={() => setOpen(false)}>
                Cancelar
              </KazButton>
            </>
          }
        >
          <KazIcon name="alert" size={40} style={{ color: 'var(--kaz-color-text-subtle)' }} />
          <p>Tem certeza de que quer excluir este agendamento?</p>
        </KazModal>
      </>
    );
  },
};

export const Login: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <KazButton onClick={() => setOpen(true)}>Entrar</KazButton>
        <KazModal open={open} onClose={() => setOpen(false)} title="Entrar na plataforma" size="sm">
          <form style={{ display: 'grid', gap: 16 }} onSubmit={(e) => e.preventDefault()}>
            <KazInput label="E-mail" type="email" placeholder="nome@clinica.com.br" />
            <KazInput label="Senha" type="password" />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <KazCheckbox label="Lembrar de mim" size="sm" />
              <KazButton variant="link" size="sm">
                Esqueci a senha
              </KazButton>
            </div>
            <KazButton type="submit" fullWidth>
              Entrar
            </KazButton>
          </form>
        </KazModal>
      </>
    );
  },
};
