import type { Preview } from '@storybook/react';
import { KazProvider } from '../src/components/KazProvider/KazProvider';
import '../src/styles/index.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Tema Kaz',
      toolbar: {
        title: 'Tema',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Claro', icon: 'sun' },
          { value: 'dark', title: 'Escuro', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true, sort: 'requiredFirst' },
    options: {
      storySort: {
        order: ['Introdução', 'Fundamentos', 'Ações', 'Formulários', 'Navegação', 'Feedback', 'Dados', 'Exemplos'],
      },
    },
  },
  decorators: [
    (Story, context) => (
      <KazProvider theme={context.globals.theme ?? 'light'} style={{ minHeight: context.viewMode === 'story' ? '100vh' : undefined, padding: context.parameters.noPadding ? 0 : '2rem' }}>
        <Story />
      </KazProvider>
    ),
  ],
};

export default preview;
