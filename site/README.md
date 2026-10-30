# Site da Bloo

Landing page de apresentação da Bloo, construída inteiramente com o Kaz.

```bash
npm install          # na raiz do repositório
npm run site:dev     # desenvolvimento em http://localhost:5173
npm run site:build   # gera site/dist, pronto para qualquer hospedagem estática
```

O site importa o Kaz direto de `../src` (veja os aliases em `vite.config.ts`). Num projeto separado, troque por `npm install @bloo/kaz`.

## Formulário de contato

O formulário valida os campos no navegador e envia um POST JSON para o endereço definido em `VITE_CONTACT_ENDPOINT` (funciona com Formspree, Getform ou uma API própria):

```bash
VITE_CONTACT_ENDPOINT=https://formspree.io/f/SEU_ID npm run site:build
```

Sem essa variável, o site avisa que o envio ainda não está configurado e não envia nada.

## Onde editar

- Textos, serviços, produtos, etapas e perguntas: `src/content.tsx`
- Estrutura das seções: `src/App.tsx`
- Layout: `src/site.css` (cores, fontes e espaçamentos vêm dos tokens do Kaz)
