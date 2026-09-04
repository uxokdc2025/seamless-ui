import type { Meta, StoryObj } from '@storybook/react';
import { AgentCard } from '@seamless/ai';

const meta: Meta<typeof AgentCard> = {
  title: 'AI/AgentCard',
  component: AgentCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    name: 'Claude Assistant',
    status: 'active',
    description: 'Natural language AI assistant for code generation',
    metrics: {
      tasks: 42,
      uptime: '99.9%',
    },
  },
};

export const Idle: Story = {
  args: {
    name: 'Code Generator',
    status: 'idle', 
    description: 'Automated code generation agent',
    metrics: {
      tasks: 12,
      uptime: '98.2%',
    },
  },
};

export const Error: Story = {
  args: {
    name: 'Data Processor',
    status: 'error',
    description: 'Data processing and transformation agent',
    metrics: {
      tasks: 5,
      uptime: '85.1%',
    },
  },
};

export const Minimal: Story = {
  args: {
    name: 'Simple Agent',
    status: 'active',
  },
};