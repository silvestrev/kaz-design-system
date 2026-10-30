import type { KazIconName } from '@bloo/kaz';

export const nav = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#produtos', label: 'Produtos' },
  { href: '#como-trabalhamos', label: 'Como trabalhamos' },
  { href: '#kaz', label: 'Design system' },
  { href: '#faq', label: 'Perguntas' },
];

export const pillars: { icon: KazIconName; title: string; text: string }[] = [
  { icon: 'heart', title: 'Acessível por padrão', text: 'Contraste, teclado e leitores de tela pensados desde o primeiro rascunho, não no fim.' },
  { icon: 'shield', title: 'Previsível e seguro', text: 'Interfaces calmas, fluxos claros e dados de saúde tratados conforme a LGPD.' },
  { icon: 'users', title: 'Parceria de verdade', text: 'Trabalhamos lado a lado com quem usa o software todos os dias.' },
];

export const services: { icon: KazIconName; title: string; text: string; tags: string[] }[] = [
  {
    icon: 'layers',
    title: 'Produtos SaaS',
    text: 'Criamos e operamos nossos próprios produtos para nichos que conhecemos a fundo, começando pela saúde.',
    tags: ['B2B', 'Assinatura'],
  },
  {
    icon: 'code',
    title: 'Software sob medida',
    text: 'Sistemas web e mobile feitos para o fluxo real do seu negócio, do protótipo à produção.',
    tags: ['Web', 'Mobile', 'APIs'],
  },
  {
    icon: 'sparkles',
    title: 'Design de produto',
    text: 'Pesquisa, UX e interfaces construídas sobre o Kaz, nosso design system aberto.',
    tags: ['UX', 'UI', 'Design system'],
  },
  {
    icon: 'heart',
    title: 'Acessibilidade digital',
    text: 'Auditoria e correção de produtos existentes para atender WCAG e incluir mais pessoas.',
    tags: ['WCAG 2.2', 'Auditoria'],
  },
];

export const products = [
  {
    id: 'agenda',
    label: 'Agenda e sessões',
    icon: 'calendar' as KazIconName,
    title: 'Agenda que respeita a rotina',
    text: 'Terapeutas, salas e pacientes organizados em um só lugar, com lembretes automáticos para as famílias e menos faltas.',
    bullets: ['Agenda por terapeuta e por sala', 'Lembretes por WhatsApp e e-mail', 'Remarcação em poucos cliques'],
  },
  {
    id: 'evolucao',
    label: 'Evolução clínica',
    icon: 'chart' as KazIconName,
    title: 'Evolução visível para toda a equipe',
    text: 'Registros de sessão viram gráficos claros de progresso para cada objetivo do plano terapêutico.',
    bullets: ['Registro rápido durante a sessão', 'Gráficos por objetivo', 'Relatórios prontos para convênios'],
  },
  {
    id: 'familia',
    label: 'Portal da família',
    icon: 'users' as KazIconName,
    title: 'Famílias por perto, sem ruído',
    text: 'Um espaço simples para as famílias acompanharem a agenda, os combinados e a evolução, no tempo delas.',
    bullets: ['Agenda e avisos', 'Atividades para casa', 'Mensagens com a equipe'],
  },
];

export const steps: { icon: KazIconName; title: string; text: string }[] = [
  { icon: 'compass', title: 'Imersão', text: 'Conversamos com quem vai usar e mapeamos o fluxo real antes de desenhar qualquer tela.' },
  { icon: 'edit', title: 'Protótipo', text: 'Validamos a solução com um protótipo navegável, construído com componentes do Kaz.' },
  { icon: 'code', title: 'Construção', text: 'Entregas curtas e frequentes, com testes e acessibilidade em cada etapa.' },
  { icon: 'refresh', title: 'Evolução', text: 'Acompanhamos o uso, medimos resultados e seguimos melhorando o produto.' },
];

export const faq = [
  {
    id: 'quem',
    title: 'Para quem a Bloo trabalha?',
    content: 'Para empresas que precisam de software confiável e acessível. Nosso primeiro foco são clínicas multidisciplinares que atendem pessoas no espectro autista, mas também desenvolvemos projetos sob medida para outros setores.',
  },
  {
    id: 'produtos',
    title: 'Os produtos para clínicas já estão disponíveis?',
    content: 'Estão em desenvolvimento junto com clínicas parceiras. Se quiser participar da fase piloto, deixe seu contato no formulário abaixo.',
  },
  {
    id: 'dados',
    title: 'Como vocês cuidam dos dados de saúde?',
    content: 'Seguimos a LGPD: criptografia, controle de acesso por perfil, registro de acessos e contratos claros sobre quem é dono dos dados (você).',
  },
  {
    id: 'kaz',
    title: 'O que é o Kaz?',
    content: 'É o design system da Bloo: uma biblioteca aberta de componentes React acessíveis que usamos em todos os nossos produtos. Este site foi feito com ele.',
  },
  {
    id: 'orcamento',
    title: 'Como funciona um orçamento de projeto sob medida?',
    content: 'Começamos com uma conversa sem custo para entender o problema. Depois enviamos uma proposta com escopo, prazos e valores, dividida em etapas.',
  },
];

export const projectTypes = [
  { value: 'clinica', label: 'Software para minha clínica' },
  { value: 'piloto', label: 'Participar do piloto dos produtos Bloo' },
  { value: 'sob-medida', label: 'Projeto de software sob medida' },
  { value: 'acessibilidade', label: 'Auditoria de acessibilidade' },
  { value: 'outro', label: 'Outro assunto' },
];
