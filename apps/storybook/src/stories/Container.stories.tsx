import type { Meta, StoryObj } from '@storybook/react';
import { Container } from '@seamless/layout';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const DemoBox = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-primary/10 border-2 border-primary/20 rounded p-4 text-center">
    {children}
  </div>
);

export const Default: Story = {
  render: () => (
    <Container>
      <DemoBox>Default container content</DemoBox>
    </Container>
  ),
};

export const Small: Story = {
  render: () => (
    <Container size="sm">
      <DemoBox>Small container (max-width: 640px)</DemoBox>
    </Container>
  ),
};

export const Medium: Story = {
  render: () => (
    <Container size="md">
      <DemoBox>Medium container (max-width: 768px)</DemoBox>
    </Container>
  ),
};

export const Large: Story = {
  render: () => (
    <Container size="lg">
      <DemoBox>Large container (max-width: 1024px)</DemoBox>
    </Container>
  ),
};

export const ExtraLarge: Story = {
  render: () => (
    <Container size="xl">
      <DemoBox>Extra large container (max-width: 1280px)</DemoBox>
    </Container>
  ),
};

export const Full: Story = {
  render: () => (
    <Container size="full">
      <DemoBox>Full width container</DemoBox>
    </Container>
  ),
};

export const WithPadding: Story = {
  render: () => (
    <Container className="py-8">
      <DemoBox>Container with custom padding</DemoBox>
    </Container>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <Container>
      <DemoBox>Dark mode container</DemoBox>
    </Container>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div data-mode="dark" className="bg-background text-foreground min-h-screen">
        <Story />
      </div>
    ),
  ],
};

export const Mobile: Story = {
  render: () => (
    <Container>
      <DemoBox>Mobile responsive container</DemoBox>
    </Container>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const Nested: Story = {
  render: () => (
    <Container>
      <DemoBox>
        <p className="mb-4">Outer container</p>
        <Container size="sm">
          <div className="bg-secondary/10 border-2 border-secondary/20 rounded p-4">
            Nested inner container
          </div>
        </Container>
      </DemoBox>
    </Container>
  ),
};
