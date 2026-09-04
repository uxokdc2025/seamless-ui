import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  viteFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@seamless/tokens': '/root/seamless-ui/packages/tokens/src',
          '@seamless/ui': '/root/seamless-ui/packages/ui/src',
          '@seamless/layout': '/root/seamless-ui/packages/layout/src',
          '@seamless/saas': '/root/seamless-ui/packages/saas/src',
          '@seamless/ai': '/root/seamless-ui/packages/ai/src',
          '@seamless/themes': '/root/seamless-ui/packages/themes/src',
          '@seamless/blocks': '/root/seamless-ui/packages/blocks/src',
        },
      },
    };
  },
};

export default config;