import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Kaz · Design system da Bloo',
    colorPrimary: '#6e4ccf',
    colorSecondary: '#6e4ccf',
    fontBase: "'Inter', ui-sans-serif, system-ui, sans-serif",
    appBorderRadius: 8,
  }),
});
