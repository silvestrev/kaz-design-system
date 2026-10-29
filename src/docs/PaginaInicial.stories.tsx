import type { Meta, StoryObj } from '@storybook/react';
import { KazAccordion } from '../components/KazAccordion/KazAccordion';
import { KazBadge } from '../components/KazBadge/KazBadge';
import { KazButton } from '../components/KazButton/KazButton';
import { KazIcon, type KazIconName } from '../components/KazIcon/KazIcon';
import { KazInput, KazTextarea } from '../components/KazInput/KazInput';
import { KazTopbar, KazTopbarLink } from '../components/KazTopbar/KazTopbar';

const features: { icon: KazIconName; title: string; text: string }[] = [
  { icon: 'calendar', title: 'Agenda sem atrito', text: 'Sessões, salas e terapeutas em um só lugar, com lembretes automáticos para as famílias.' },
  { icon: 'chart', title: 'Evolução visível', text: 'Registros de sessão viram gráficos claros de progresso para cada objetivo do plano.' },
  { icon: 'heart', title: 'Feito para acolher', text: 'Interface calma, previsível e acessível para equipes e famílias.' },
];

function LandingPage() {
  return (
    <div style={{ background: 'var(--kaz-color-bg)', color: 'var(--kaz-color-text)' }}>
      <KazTopbar
        sticky
        brand={
          <>
            <span style={{ display: 'inline-flex', width: 28, height: 28, borderRadius: 8, background: 'var(--kaz-primary-solid)', color: '#fff', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>b</span>
            bloo
          </>
        }
        nav={
          <>
            <KazTopbarLink href="#produtos" active>Produtos</KazTopbarLink>
            <KazTopbarLink href="#faq">Perguntas</KazTopbarLink>
            <KazTopbarLink href="#contato">Contato</KazTopbarLink>
          </>
        }
        actions={<KazButton size="sm" href="#contato">Fale com a gente</KazButton>}
      />

      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '96px 24px 72px', textAlign: 'center' }}>
        <KazBadge tone="primary" size="md">Software para clínicas de TEA</KazBadge>
        <h1 style={{ margin: '20px auto 16px', maxWidth: 760, fontSize: 'clamp(2rem, 5vw, var(--kaz-text-5xl))', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          Tecnologia que cuida de quem cuida
        </h1>
        <p style={{ margin: '0 auto 32px', maxWidth: 560, fontSize: 'var(--kaz-text-lg)', color: 'var(--kaz-color-text-muted)' }}>
          A Bloo cria produtos digitais que organizam a rotina das clínicas e aproximam terapeutas e famílias.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <KazButton size="lg" rightIcon={<KazIcon name="arrow-right" />}>Conhecer os produtos</KazButton>
          <KazButton size="lg" variant="outline" tone="neutral">Agendar uma conversa</KazButton>
        </div>
      </section>

      <section id="produtos" style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px 80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
        {features.map((feature) => (
          <article key={feature.title} style={{ padding: 28, border: '1px solid var(--kaz-color-border)', borderRadius: 'var(--kaz-radius-xl)', background: 'var(--kaz-color-surface)' }}>
            <span style={{ display: 'inline-flex', padding: 10, borderRadius: 12, background: 'var(--kaz-primary-soft)', color: 'var(--kaz-primary-soft-text)', fontSize: 22 }}>
              <KazIcon name={feature.icon} />
            </span>
            <h2 style={{ margin: '16px 0 8px', fontSize: 'var(--kaz-text-xl)' }}>{feature.title}</h2>
            <p style={{ margin: 0, color: 'var(--kaz-color-text-muted)', lineHeight: 1.6 }}>{feature.text}</p>
          </article>
        ))}
      </section>

      <section id="faq" style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px 80px' }}>
        <h2 style={{ textAlign: 'center', fontSize: 'var(--kaz-text-3xl)', margin: '0 0 32px' }}>Perguntas frequentes</h2>
        <KazAccordion
          variant="flush"
          items={[
            { id: '1', title: 'Para quem são os produtos da Bloo?', content: 'Para clínicas multidisciplinares que atendem pessoas no espectro autista, de pequenas equipes a redes.' },
            { id: '2', title: 'Os dados ficam seguros?', content: 'Sim. Seguimos a LGPD, com criptografia e controle de acesso por perfil.' },
            { id: '3', title: 'Preciso instalar alguma coisa?', content: 'Não. Tudo funciona no navegador, no computador ou no celular.' },
          ]}
        />
      </section>

      <section id="contato" style={{ background: 'var(--kaz-color-surface-muted)', borderTop: '1px solid var(--kaz-color-border)' }}>
        <div style={{ maxWidth: 560, margin: '0 auto', padding: '72px 24px' }}>
          <h2 style={{ textAlign: 'center', fontSize: 'var(--kaz-text-3xl)', margin: '0 0 8px' }}>Vamos conversar?</h2>
          <p style={{ textAlign: 'center', color: 'var(--kaz-color-text-muted)', margin: '0 0 32px' }}>Respondemos em até um dia útil.</p>
          <form style={{ display: 'grid', gap: 16 }} onSubmit={(e) => e.preventDefault()}>
            <KazInput label="Nome" required />
            <KazInput label="E-mail" type="email" required placeholder="nome@clinica.com.br" />
            <KazTextarea label="Como podemos ajudar?" />
            <KazButton type="submit" size="lg" fullWidth>Enviar mensagem</KazButton>
          </form>
        </div>
      </section>
    </div>
  );
}

const meta = { title: 'Exemplos/Página inicial da Bloo', component: LandingPage, parameters: { noPadding: true } } satisfies Meta<typeof LandingPage>;
export default meta;
export const Completa: StoryObj<typeof meta> = {};
