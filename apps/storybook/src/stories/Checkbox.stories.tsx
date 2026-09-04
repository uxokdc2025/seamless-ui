import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@seamless/ui';

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'checkbox-default',
  },
};

export const Checked: Story = {
  args: {
    id: 'checkbox-checked',
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    id: 'checkbox-disabled',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    id: 'checkbox-disabled-checked',
    disabled: true,
    defaultChecked: true,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox id="marketing" />
        <label htmlFor="marketing" className="text-sm font-medium">
          Marketing emails
        </label>
      </div>
      <p className="text-sm text-muted-foreground ml-6">
        Receive emails about new products, features, and more.
      </p>
    </div>
  ),
};

export const Focus: Story = {
  args: {
    id: 'checkbox-focus',
    autoFocus: true,
  },
};

export const DarkMode: Story = {
  args: {
    id: 'checkbox-dark',
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
      <Checkbox id="mobile-checkbox" />
      <label htmlFor="mobile-checkbox" className="text-sm font-medium">
        Mobile checkbox
      </label>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
