import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '@seamless/ui';

const meta: Meta<typeof Switch> = {
  title: 'UI/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'switch-default',
  },
};

export const Checked: Story = {
  args: {
    id: 'switch-checked',
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    id: 'switch-disabled',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    id: 'switch-disabled-checked',
    disabled: true,
    defaultChecked: true,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <label htmlFor="airplane-mode" className="text-sm font-medium">
        Airplane Mode
      </label>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Switch id="notifications" />
        <label htmlFor="notifications" className="text-sm font-medium">
          Push Notifications
        </label>
      </div>
      <p className="text-sm text-muted-foreground ml-10">
        Receive push notifications on your device.
      </p>
    </div>
  ),
};

export const Focus: Story = {
  args: {
    id: 'switch-focus',
    autoFocus: true,
  },
};

export const DarkMode: Story = {
  args: {
    id: 'switch-dark',
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

export const Mobile: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="mobile-switch" />
      <label htmlFor="mobile-switch" className="text-sm font-medium">
        Mobile switch
      </label>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const Loading: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="loading-switch" disabled className="opacity-50" />
      <label htmlFor="loading-switch" className="text-sm font-medium opacity-50">
        Loading...
      </label>
    </div>
  ),
};
