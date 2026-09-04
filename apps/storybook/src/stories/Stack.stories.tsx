import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '@seamless/layout';

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const DemoBox = ({ children, color = 'primary' }: { children: React.ReactNode; color?: string }) => (
  <div className={`bg-${color}/10 border-2 border-${color}/20 rounded p-4`}>
    {children}
  </div>
);

export const Default: Story = {
  render: () => (
    <Stack className="w-[400px]">
      <DemoBox>Item 1</DemoBox>
      <DemoBox>Item 2</DemoBox>
      <DemoBox>Item 3</DemoBox>
    </Stack>
  ),
};

export const SmallGap: Story = {
  render: () => (
    <Stack gap="sm" className="w-[400px]">
      <DemoBox>Item 1</DemoBox>
      <DemoBox>Item 2</DemoBox>
      <DemoBox>Item 3</DemoBox>
    </Stack>
  ),
};

export const MediumGap: Story = {
  render: () => (
    <Stack gap="md" className="w-[400px]">
      <DemoBox>Item 1</DemoBox>
      <DemoBox>Item 2</DemoBox>
      <DemoBox>Item 3</DemoBox>
    </Stack>
  ),
};

export const LargeGap: Story = {
  render: () => (
    <Stack gap="lg" className="w-[400px]">
      <DemoBox>Item 1</DemoBox>
      <DemoBox>Item 2</DemoBox>
      <DemoBox>Item 3</DemoBox>
    </Stack>
  ),
};

export const NoGap: Story = {
  render: () => (
    <Stack gap="none" className="w-[400px]">
      <DemoBox>Item 1</DemoBox>
      <DemoBox>Item 2</DemoBox>
      <DemoBox>Item 3</DemoBox>
    </Stack>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <Stack className="w-[400px]">
      <DemoBox>Item 1</DemoBox>
      <DemoBox>Item 2</DemoBox>
      <DemoBox>Item 3</DemoBox>
    </Stack>
  ),
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
    <Stack className="w-full">
      <DemoBox>Item 1</DemoBox>
      <DemoBox>Item 2</DemoBox>
      <DemoBox>Item 3</DemoBox>
    </Stack>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const ManyItems: Story = {
  render: () => (
    <Stack className="w-[400px]">
      {Array.from({ length: 8 }, (_, i) => (
        <DemoBox key={i}>Item {i + 1}</DemoBox>
      ))}
    </Stack>
  ),
};

export const MixedContent: Story = {
  render: () => (
    <Stack className="w-[400px]">
      <DemoBox>
        <h3 className="font-semibold">Heading</h3>
      </DemoBox>
      <DemoBox>
        <p className="text-sm">Paragraph with some text content that might wrap.</p>
      </DemoBox>
      <DemoBox>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded">
          Button
        </button>
      </DemoBox>
    </Stack>
  ),
};
