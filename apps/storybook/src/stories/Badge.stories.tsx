import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@seamless/ui';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <span className="mr-1">🎯</span>
        Badge with icon
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    className: 'opacity-50 cursor-not-allowed',
  },
};

// Dark mode test
export const DarkMode: Story = {
  args: {
    children: 'Dark Mode',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div data-mode="dark" className="bg-background text-foreground p-4">
        <Story />
      </div>
    ),
  ],
};

// Responsive container test
export const NarrowContainer: Story = {
  args: {
    children: 'Narrow',
  },
  decorators: [
    (Story) => (
      <div className="w-48 p-4 border border-border">
        <Story />
      </div>
    ),
  ],
};

export const Mobile: Story = {
  args: {
    children: 'Mobile',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
