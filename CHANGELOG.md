# Changelog

Todas as mudanças relevantes do Kaz ficam registradas aqui. O projeto segue [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [Não lançado]

### Adicionado

- Ícones `sun`, `moon`, `compass`, `code`, `layers`, `users`, `shield`, `sparkles`, `refresh` e `github` no `KazIcon`.

### Alterado

- O Kaz passa a ser privado: pacote renomeado para `@silvestrev/kaz`, publicado no GitHub Packages, com licença proprietária.
- Publicação do Storybook no GitHub Pages passa a ser manual.
- A landing page da Bloo saiu deste repositório e foi para `silvestrev/bloo-web`.
- Regras de proteção da `main` (`.github/rulesets/`), CODEOWNERS, Dependabot e permissões mínimas no CI.

### Corrigido

- `KazIcon` ignorava a prop `size` (o CSS fixava 1em).
- `package-lock.json` fora de sincronia com o `package.json`, o que fazia o `npm ci` falhar no CI.

## [0.1.0] - 2026-10-29

### Adicionado

- Tokens de design (cores, tipografia, espaço, raio, sombra, movimento) com tema claro e escuro.
- `KazProvider` com temas `light`, `dark` e `system`.
- 33 componentes: KazAccordion, KazAlert, KazAutocomplete, KazAvatar, KazBadge, KazBreadcrumb, KazButton, KazButtonGroup, KazCalendar, KazCarousel, KazCheckbox, KazDatepicker, KazDivider, KazDropdown, KazIcon, KazInput, KazListGroup, KazModal, KazPagination, KazProgress, KazRadio, KazRadioGroup, KazSelect, KazSidebar, KazSlider, KazSparkline, KazSpinner, KazSwitch, KazTable, KazTabs, KazTextarea, KazTooltip, KazTopbar.
- Storybook com documentação em português e exemplo de página inicial.
