import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@seamless/ui';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithValue: Story = {
  args: {
    value: 'Sample text',
    onChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-[300px] space-y-2">
      <label htmlFor="input-1" className="text-sm font-medium">
        Email address
      </label>
      <Input id="input-1" type="email" placeholder="you@example.com" />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="w-[300px] space-y-2">
      <label htmlFor="input-2" className="text-sm font-medium">
        Username
      </label>
      <Input
        id="input-2"
        placeholder="username"
        className="border-destructive focus-visible:ring-destructive"
      />
      <p className="text-sm text-destructive">Username is already taken</p>
    </div>
  ),
};

export const Focus: Story = {
  args: {
    placeholder: 'Focused input',
    autoFocus: true,
  },
};

export const TypeEmail: Story = {
  args: {
    type: 'email',
    placeholder: 'email@example.com',
  },
};

export const TypePassword: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
  },
};

export const TypeNumber: Story = {
  args: {
    type: 'number',
    placeholder: '0',
  },
};

export const DarkMode: Story = {
  args: {
    placeholder: 'Dark mode input',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div data-mode="dark" className="bg-background text-foreground p-4 w-[300px]">
        <Story />
      </div>
    ),
  ],
};

export const NarrowContainer: Story = {
  args: {
    placeholder: 'Narrow input',
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
    placeholder: 'Mobile input',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const Loading: Story = {
  render: () => (
    <div className="w-[300px] space-y-2">
      <Input placeholder="Loading..." disabled className="animate-pulse" />
      <p className="text-sm text-muted-foreground">Validating...</p>
    </div>
  ),
};
