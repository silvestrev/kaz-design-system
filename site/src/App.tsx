import { useEffect, useState, type FormEvent } from 'react';
import {
  KazAccordion,
  KazAlert,
  KazAvatar,
  KazBadge,
  KazButton,
  KazCheckbox,
  KazIcon,
  KazInput,
  KazProgress,
  KazProvider,
  KazSelect,
  KazSparkline,
  KazTabs,
  KazTextarea,
  KazTopbar,
  KazTopbarIconButton,
  KazTopbarLink,
} from '@bloo/kaz';
import { faq, nav, pillars, products, projectTypes, services, steps } from './content';

const REPO_URL = 'https://github.com/silvestrev/kaz-design-system';
/** Endpoint que recebe o formulário (ex.: Formspree). Defina VITE_CONTACT_ENDPOINT no build. */
const CONTACT_ENDPOINT: string | undefined = import.meta.env.VITE_CONTACT_ENDPOINT;

type Theme = 'light' | 'dark';

function readTheme(): Theme {
  try {
    const saved = localStorage.getItem('bloo-theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    /* armazenamento indisponível: segue a preferência do sistema */
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function App() {
  const [theme, setTheme] = useState<Theme>(readTheme);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.colorScheme = theme;
    document.body.style.background = theme === 'dark' ? '#111827' : '#ffffff';
    try {
      localStorage.setItem('bloo-theme', theme);
    } catch {
      /* ignora */
    }
  }, [theme]);

  return (
    <KazProvider theme={theme} className="site">
      <a href="#conteudo" className="site-skip">
        Pular para o conteúdo
      </a>
      <Header theme={theme} onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main id="conteudo">
        <Hero />
        <Pillars />
        <Services />
        <Products />
        <HowWeWork />
        <KazShowcase />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </KazProvider>
  );
}

function Logo() {
  return (
    <a href="#" className="site-logo" aria-label="Bloo, início">
      <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
        <rect width="32" height="32" rx="9" fill="var(--kaz-primary-solid)" />
        <circle cx="16" cy="18" r="6" fill="none" stroke="#fff" strokeWidth="3" />
        <path d="M10 6v12" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <span>bloo</span>
    </a>
  );
}

function Header({ theme, onToggleTheme, menuOpen, setMenuOpen }: { theme: Theme; onToggleTheme: () => void; menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
  const close = () => setMenuOpen(false);
  return (
    <div className="site-header">
      <KazTopbar
        className="site-topbar"
        brand={<Logo />}
        onMenuClick={() => setMenuOpen(!menuOpen)}
        menuLabel={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        nav={nav.map((item) => (
          <KazTopbarLink key={item.href} href={item.href}>
            {item.label}
          </KazTopbarLink>
        ))}
        actions={
          <>
            <KazTopbarIconButton aria-label={theme === 'dark' ? 'Usar tema claro' : 'Usar tema escuro'} onClick={onToggleTheme}>
              <KazIcon name={theme === 'dark' ? 'sun' : 'moon'} />
            </KazTopbarIconButton>
            <KazButton size="sm" href="#contato" className="site-header__cta">
              Fale com a gente
            </KazButton>
          </>
        }
      />
      {menuOpen && (
        <nav className="site-mobile-nav" aria-label="Menu">
          {nav.map((item) => (
            <a key={item.href} href={item.href} onClick={close}>
              {item.label}
            </a>
          ))}
          <KazButton href="#contato" fullWidth onClick={close}>
            Fale com a gente
          </KazButton>
        </nav>
      )}
    </div>
  );
}

function Hero() {
  return (
    <section className="site-hero" aria-labelledby="hero-title">
      <div className="site-container site-hero__grid">
        <div className="site-hero__copy">
          <KazBadge tone="primary" size="md" icon={<KazIcon name="sparkles" />}>
            Software house · Ecossistema Bloo
          </KazBadge>
          <h1 id="hero-title" className="site-hero__title">
            Tecnologia que cuida de <span className="site-highlight">quem cuida</span>.
          </h1>
          <p className="site-lead">
            A Bloo cria produtos digitais acessíveis e sob medida. Começamos pelas clínicas de TEA, com software que organiza a rotina e aproxima terapeutas e famílias.
          </p>
          <div className="site-actions">
            <KazButton size="lg" href="#produtos" rightIcon={<KazIcon name="arrow-right" />}>
              Conhecer os produtos
            </KazButton>
            <KazButton size="lg" variant="outline" tone="neutral" href="#contato">
              Começar um projeto
            </KazButton>
          </div>
          <ul className="site-checks">
            <li>
              <KazIcon name="check" /> Acessibilidade WCAG
            </li>
            <li>
              <KazIcon name="check" /> Conforme a LGPD
            </li>
            <li>
              <KazIcon name="check" /> Design system aberto
            </li>
          </ul>
        </div>
        <HeroPreview />
      </div>
    </section>
  );
}

/** Ilustração montada com componentes reais do Kaz. Decorativa: escondida de leitores de tela. */
function HeroPreview() {
  return (
    <div className="site-preview" aria-hidden="true" {...{ inert: "" }}>
      <div className="site-preview__card">
        <div className="site-preview__head">
          <KazAvatar name="Clínica Raízes" size="sm" />
          <div>
            <strong>Bom dia, equipe!</strong>
            <span>Quinta-feira, 6 sessões hoje</span>
          </div>
          <KazBadge tone="success" dot>
            Em dia
          </KazBadge>
        </div>
        <div className="site-preview__stats">
          <div className="site-preview__stat">
            <span>Sessões na semana</span>
            <strong>128</strong>
            <KazSparkline data={[12, 15, 14, 18, 22, 21, 24, 23, 27]} height={36} area label="" />
          </div>
          <div className="site-preview__stat">
            <span>Presença</span>
            <strong>94%</strong>
            <KazSparkline data={[88, 90, 87, 91, 92, 90, 93, 94]} height={36} tone="success" label="" />
          </div>
        </div>
        <ul className="site-preview__list">
          {[
            ['08:00', 'Pedro A.', 'Fonoaudiologia', 'success', 'Confirmada'],
            ['09:30', 'Lia M.', 'Terapia ocupacional', 'primary', 'Em andamento'],
            ['11:00', 'Davi R.', 'Psicologia', 'neutral', 'Aguardando'],
          ].map(([time, name, area, tone, status]) => (
            <li key={time}>
              <time>{time}</time>
              <div>
                <strong>{name}</strong>
                <span>{area}</span>
              </div>
              <KazBadge tone={tone as 'success' | 'primary' | 'neutral'}>{status}</KazBadge>
            </li>
          ))}
        </ul>
        <KazProgress value={72} label="Plano terapêutico do Pedro" size="sm" />
      </div>
      <div className="site-preview__float">
        <KazIcon name="bell" />
        <span>Lembrete enviado para a família do Davi</span>
      </div>
    </div>
  );
}

function SectionHeader({ eyebrow, title, text, id }: { eyebrow: string; title: string; text?: string; id: string }) {
  return (
    <header className="site-section__header">
      <p className="site-eyebrow">{eyebrow}</p>
      <h2 id={id} className="site-section__title">
        {title}
      </h2>
      {text && <p className="site-section__text">{text}</p>}
    </header>
  );
}

function Pillars() {
  return (
    <section className="site-pillars" aria-label="Nossos pilares">
      <div className="site-container site-pillars__grid">
        {pillars.map((pillar) => (
          <div key={pillar.title} className="site-pillar">
            <span className="site-icon-chip">
              <KazIcon name={pillar.icon} />
            </span>
            <div>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="servicos" className="site-section" aria-labelledby="servicos-title">
      <div className="site-container">
        <SectionHeader id="servicos-title" eyebrow="O que fazemos" title="Do produto pronto ao feito sob medida" text="Uma software house pequena de propósito: poucos projetos, muito cuidado em cada um." />
        <div className="site-cards">
          {services.map((service) => (
            <article key={service.title} className="site-card">
              <span className="site-icon-chip">
                <KazIcon name={service.icon} />
              </span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <div className="site-tags">
                {service.tags.map((tag) => (
                  <KazBadge key={tag} tone="neutral">
                    {tag}
                  </KazBadge>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Products() {
  return (
    <section id="produtos" className="site-section site-section--muted" aria-labelledby="produtos-title">
      <div className="site-container">
        <SectionHeader
          id="produtos-title"
          eyebrow="Produtos Bloo"
          title="Feitos para clínicas de TEA"
          text="Nosso primeiro ecossistema de produtos, criado junto com terapeutas, gestores e famílias."
        />
        <KazTabs
          variant="segmented"
          label="Produtos"
          className="site-products"
          items={products.map((product) => ({
            id: product.id,
            label: product.label,
            icon: <KazIcon name={product.icon} />,
            content: (
              <div className="site-product">
                <div>
                  <KazBadge tone="warning" dot>
                    Em desenvolvimento
                  </KazBadge>
                  <h3>{product.title}</h3>
                  <p>{product.text}</p>
                  <ul className="site-bullets">
                    {product.bullets.map((bullet) => (
                      <li key={bullet}>
                        <KazIcon name="check-circle" /> {bullet}
                      </li>
                    ))}
                  </ul>
                  <KazButton variant="soft" href="#contato" rightIcon={<KazIcon name="arrow-right" />}>
                    Quero participar do piloto
                  </KazButton>
                </div>
                <div className="site-product__art" aria-hidden="true">
                  <KazIcon name={product.icon} size={96} />
                </div>
              </div>
            ),
          }))}
        />
      </div>
    </section>
  );
}

function HowWeWork() {
  return (
    <section id="como-trabalhamos" className="site-section" aria-labelledby="como-title">
      <div className="site-container">
        <SectionHeader id="como-title" eyebrow="Como trabalhamos" title="Um processo claro, sem surpresas" text="Você sabe o que está sendo feito, por quê e quando chega." />
        <ol className="site-steps">
          {steps.map((step, index) => (
            <li key={step.title} className="site-step">
              <span className="site-step__number">{String(index + 1).padStart(2, '0')}</span>
              <span className="site-icon-chip">
                <KazIcon name={step.icon} />
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function KazShowcase() {
  return (
    <section id="kaz" className="site-section" aria-labelledby="kaz-title">
      <div className="site-container">
        <div className="site-kaz">
          <div className="site-kaz__copy">
            <p className="site-eyebrow site-eyebrow--light">Código aberto</p>
            <h2 id="kaz-title">Conheça o Kaz, nosso design system</h2>
            <p>Mais de 30 componentes React acessíveis, com tema claro e escuro, que dão a mesma cara e o mesmo cuidado a tudo o que a Bloo constrói. Este site inteiro foi montado com ele.</p>
            <div className="site-actions">
              <KazButton size="lg" variant="solid" tone="neutral" href={REPO_URL} target="_blank" leftIcon={<KazIcon name="github" />}>
                Ver no GitHub
              </KazButton>
            </div>
          </div>
          <pre className="site-kaz__code" aria-label="Exemplo de código usando o Kaz">
            <code>
              <span className="c">// npm install @bloo/kaz</span>
              {'\n'}
              <span className="k">import</span> {'{ KazButton }'} <span className="k">from</span> <span className="s">'@bloo/kaz'</span>;{'\n\n'}
              {'<'}
              <span className="t">KazButton</span> <span className="a">tone</span>=<span className="s">"primary"</span>
              {'>'}
              {'\n'}
              {'  '}Agendar sessão{'\n'}
              {'</'}
              <span className="t">KazButton</span>
              {'>'}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="site-section site-section--muted" aria-labelledby="faq-title">
      <div className="site-container site-container--narrow">
        <SectionHeader id="faq-title" eyebrow="Dúvidas" title="Perguntas frequentes" />
        <KazAccordion variant="separated" items={faq} defaultValue={['quem']} />
      </div>
    </section>
  );
}

interface FormErrors {
  name?: string;
  email?: string;
  type?: string;
  message?: string;
  consent?: string;
}

function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error' | 'not-configured'>('idle');
  const [errors, setErrors] = useState<FormErrors>({});

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const next: FormErrors = {};
    if (!data.name?.trim()) next.name = 'Conte como podemos te chamar.';
    if (!/^\S+@\S+\.\S+$/.test(data.email ?? '')) next.email = 'Digite um e-mail válido, como nome@empresa.com.br.';
    if (!data.type) next.type = 'Escolha o assunto.';
    if ((data.message ?? '').trim().length < 10) next.message = 'Escreva pelo menos 10 caracteres.';
    if (!data.consent) next.consent = 'Precisamos do seu aceite para responder.';
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }
    if (!CONTACT_ENDPOINT) {
      setStatus('not-configured');
      return;
    }
    setStatus('sending');
    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(String(response.status));
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contato" className="site-section" aria-labelledby="contato-title">
      <div className="site-container site-contact">
        <div className="site-contact__copy">
          <SectionHeader id="contato-title" eyebrow="Contato" title="Vamos conversar?" text="Conte um pouco sobre o seu desafio. A primeira conversa é sem custo e sem compromisso." />
          <ul className="site-contact__list">
            <li>
              <span className="site-icon-chip">
                <KazIcon name="clock" />
              </span>
              <div>
                <strong>Resposta rápida</strong>
                <span>Em até um dia útil.</span>
              </div>
            </li>
            <li>
              <span className="site-icon-chip">
                <KazIcon name="users" />
              </span>
              <div>
                <strong>Gente de verdade</strong>
                <span>Quem responde é quem vai construir.</span>
              </div>
            </li>
            <li>
              <span className="site-icon-chip">
                <KazIcon name="lock" />
              </span>
              <div>
                <strong>Seus dados protegidos</strong>
                <span>Usamos só para responder ao seu contato.</span>
              </div>
            </li>
          </ul>
        </div>
        <form className="site-form" noValidate onSubmit={onSubmit}>
          {status === 'sent' && (
            <KazAlert tone="success" title="Mensagem enviada!" onClose={() => setStatus('idle')}>
              Obrigado pelo contato. Respondemos em até um dia útil.
            </KazAlert>
          )}
          {status === 'error' && (
            <KazAlert tone="danger" title="Não foi possível enviar" onClose={() => setStatus('idle')}>
              Verifique sua conexão e tente de novo.
            </KazAlert>
          )}
          {status === 'not-configured' && (
            <KazAlert tone="info" title="Formulário em configuração" onClose={() => setStatus('idle')}>
              O envio ainda não está ligado nesta versão do site. Seus dados não foram enviados.
            </KazAlert>
          )}
          <div className="site-form__row">
            <KazInput name="name" label="Nome" required autoComplete="name" error={errors.name} />
            <KazInput name="company" label="Empresa ou clínica" autoComplete="organization" />
          </div>
          <KazInput name="email" type="email" label="E-mail" required autoComplete="email" placeholder="nome@empresa.com.br" leftIcon={<KazIcon name="mail" />} error={errors.email} />
          <KazSelect name="type" label="Assunto" required placeholder="Selecione" defaultValue="" options={projectTypes} error={errors.type} />
          <KazTextarea name="message" label="Mensagem" required rows={5} placeholder="Conte o que você precisa..." error={errors.message} />
          <div>
            <KazCheckbox name="consent" value="sim" label="Aceito que a Bloo use estes dados para responder ao meu contato." />
            {errors.consent && (
              <p className="kaz-field__msg kaz-field__msg--error site-form__consent-error" role="alert">
                {errors.consent}
              </p>
            )}
          </div>
          <KazButton type="submit" size="lg" fullWidth loading={status === 'sending'} rightIcon={<KazIcon name="arrow-right" />}>
            Enviar mensagem
          </KazButton>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container site-footer__grid">
        <div className="site-footer__brand">
          <Logo />
          <p>Software house que cria tecnologia acessível, começando pelo cuidado em saúde.</p>
        </div>
        <nav aria-label="Rodapé" className="site-footer__nav">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <a href="#contato">Contato</a>
        </nav>
      </div>
      <div className="site-container site-footer__bottom">
        <span>© {new Date().getFullYear()} Bloo. Todos os direitos reservados.</span>
        <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
          Feito com Kaz <KazIcon name="external-link" />
        </a>
      </div>
    </footer>
  );
}
