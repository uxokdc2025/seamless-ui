import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@seamless/ui';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content area.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card with Footer</CardTitle>
        <CardDescription>This card includes a footer</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Main content area with information.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <button className="text-sm">Cancel</button>
        <button className="text-sm font-semibold">Save</button>
      </CardFooter>
    </Card>
  ),
};

export const Hover: Story = {
  render: () => (
    <Card className="w-[350px] transition-all hover:shadow-lg hover:scale-105">
      <CardHeader>
        <CardTitle>Hoverable Card</CardTitle>
        <CardDescription>Hover over this card</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card has hover effects.</p>
      </CardContent>
    </Card>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Dark Mode Card</CardTitle>
        <CardDescription>Optimized for dark backgrounds</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content in dark mode.</p>
      </CardContent>
    </Card>
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

export const NarrowContainer: Story = {
  render: () => (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Responsive Card</CardTitle>
        <CardDescription>Adapts to container width</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card fills its container.</p>
      </CardContent>
    </Card>
  ),
  decorators: [
    (Story) => (
      <div className="w-64 p-4 border border-border">
        <Story />
      </div>
    ),
  ],
};

export const Mobile: Story = {
  render: () => (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Mobile Card</CardTitle>
        <CardDescription>Optimized for mobile</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Mobile-friendly card layout.</p>
      </CardContent>
    </Card>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const Loading: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Loading...</CardTitle>
        <CardDescription className="animate-pulse">Please wait</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="h-4 bg-muted animate-pulse rounded" />
          <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
        </div>
      </CardContent>
    </Card>
  ),
};
