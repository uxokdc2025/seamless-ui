import type { Preview } from '@storybook/react';
import '../src/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Design system theme',
      defaultValue: 'midnight-aubergine',
      toolbar: {
        icon: 'paintbrush',
        items: [
          'midnight-aubergine',
          'together',
          'airtable', 
          'claude',
          'discord',
          'elevenlabs',
          'ibm',
          'meta',
        ],
      },
    },
    mode: {
      name: 'Mode',
      description: 'Light/Dark mode',
      defaultValue: 'dark',
      toolbar: {
        icon: 'circlehollow',
        items: ['light', 'dark'],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'midnight-aubergine';
      const mode = context.globals.mode || 'dark';
      
      return (
        <div data-theme={theme} data-mode={mode} className="min-h-screen bg-background text-foreground p-4">
          <Story />
        </div>
      );
    },
  ],
};

export default preview;