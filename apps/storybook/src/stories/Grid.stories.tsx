import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from '@seamless/layout';

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'centered',
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
    <Grid className="w-[600px]">
      <DemoBox>Item 1</DemoBox>
      <DemoBox>Item 2</DemoBox>
      <DemoBox>Item 3</DemoBox>
      <DemoBox>Item 4</DemoBox>
    </Grid>
  ),
};

export const TwoColumns: Story = {
  render: () => (
    <Grid cols={2} className="w-[600px]">
      <DemoBox>Item 1</DemoBox>
      <DemoBox>Item 2</DemoBox>
      <DemoBox>Item 3</DemoBox>
      <DemoBox>Item 4</DemoBox>
    </Grid>
  ),
};

export const ThreeColumns: Story = {
  render: () => (
    <Grid cols={3} className="w-[600px]">
      <DemoBox>Item 1</DemoBox>
      <DemoBox>Item 2</DemoBox>
      <DemoBox>Item 3</DemoBox>
      <DemoBox>Item 4</DemoBox>
      <DemoBox>Item 5</DemoBox>
      <DemoBox>Item 6</DemoBox>
    </Grid>
  ),
};

export const FourColumns: Story = {
  render: () => (
    <Grid cols={4} className="w-[800px]">
      <DemoBox>1</DemoBox>
      <DemoBox>2</DemoBox>
      <DemoBox>3</DemoBox>
      <DemoBox>4</DemoBox>
      <DemoBox>5</DemoBox>
      <DemoBox>6</DemoBox>
      <DemoBox>7</DemoBox>
      <DemoBox>8</DemoBox>
    </Grid>
  ),
};

export const SmallGap: Story = {
  render: () => (
    <Grid cols={3} gap="sm" className="w-[600px]">
      <DemoBox>Item 1</DemoBox>
      <DemoBox>Item 2</DemoBox>
      <DemoBox>Item 3</DemoBox>
      <DemoBox>Item 4</DemoBox>
      <DemoBox>Item 5</DemoBox>
      <DemoBox>Item 6</DemoBox>
    </Grid>
  ),
};

export const LargeGap: Story = {
  render: () => (
    <Grid cols={2} gap="lg" className="w-[600px]">
      <DemoBox>Item 1</DemoBox>
      <DemoBox>Item 2</DemoBox>
      <DemoBox>Item 3</DemoBox>
      <DemoBox>Item 4</DemoBox>
    </Grid>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <Grid cols={3} className="w-[600px]">
      <DemoBox>Item 1</DemoBox>
      <DemoBox>Item 2</DemoBox>
      <DemoBox>Item 3</DemoBox>
      <DemoBox>Item 4</DemoBox>
      <DemoBox>Item 5</DemoBox>
      <DemoBox>Item 6</DemoBox>
    </Grid>
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
    <Grid cols={2} className="w-full">
      <DemoBox>Item 1</DemoBox>
      <DemoBox>Item 2</DemoBox>
      <DemoBox>Item 3</DemoBox>
      <DemoBox>Item 4</DemoBox>
    </Grid>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const ResponsiveColumns: Story = {
  render: () => (
    <Grid className="w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <DemoBox>Item 1</DemoBox>
      <DemoBox>Item 2</DemoBox>
      <DemoBox>Item 3</DemoBox>
      <DemoBox>Item 4</DemoBox>
      <DemoBox>Item 5</DemoBox>
      <DemoBox>Item 6</DemoBox>
    </Grid>
  ),
};

export const CardGrid: Story = {
  render: () => (
    <Grid cols={3} className="w-[800px]">
      {Array.from({ length: 9 }, (_, i) => (
        <div key={i} className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Card {i + 1}</h3>
          <p className="text-sm text-muted-foreground">Card content</p>
        </div>
      ))}
    </Grid>
  ),
};
