# Changelog

Todas as mudanças relevantes do Kaz ficam registradas aqui. O projeto segue [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [Não lançado]

### Adicionado

- Site de apresentação da Bloo em `site/`, feito com o Kaz (`npm run site:dev`).
- Ícones `sun`, `moon`, `compass`, `code`, `layers`, `users`, `shield`, `sparkles`, `refresh` e `github` no `KazIcon`.

### Corrigido

- `KazIcon` ignorava a prop `size` (o CSS fixava 1em).
- `package-lock.json` fora de sincronia com o `package.json`, o que fazia o `npm ci` falhar no CI.

## [0.1.0] - 2026-10-29

### Adicionado

- Tokens de design (cores, tipografia, espaço, raio, sombra, movimento) com tema claro e escuro.
- `KazProvider` com temas `light`, `dark` e `system`.
- 33 componentes: KazAccordion, KazAlert, KazAutocomplete, KazAvatar, KazBadge, KazBreadcrumb, KazButton, KazButtonGroup, KazCalendar, KazCarousel, KazCheckbox, KazDatepicker, KazDivider, KazDropdown, KazIcon, KazInput, KazListGroup, KazModal, KazPagination, KazProgress, KazRadio, KazRadioGroup, KazSelect, KazSidebar, KazSlider, KazSparkline, KazSpinner, KazSwitch, KazTable, KazTabs, KazTextarea, KazTooltip, KazTopbar.
- Storybook com documentação em português e exemplo de página inicial.
