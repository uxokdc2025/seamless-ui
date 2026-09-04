import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@seamless/ui';

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-sm text-muted-foreground">
          Make changes to your account here.
        </p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-sm text-muted-foreground">
          Change your password here.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const ThreeTabs: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <p className="text-sm">Overview content</p>
      </TabsContent>
      <TabsContent value="analytics">
        <p className="text-sm">Analytics content</p>
      </TabsContent>
      <TabsContent value="reports">
        <p className="text-sm">Reports content</p>
      </TabsContent>
    </Tabs>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2" disabled>
          Tab 2 (Disabled)
        </TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-sm">Tab 1 content</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p className="text-sm">Tab 3 content</p>
      </TabsContent>
    </Tabs>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-sm">Dark mode tab content</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p className="text-sm">Tab 2 in dark mode</p>
      </TabsContent>
    </Tabs>
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
    <Tabs defaultValue="tab1" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="tab1" className="flex-1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2" className="flex-1">Tab 2</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-sm">Responsive tabs</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p className="text-sm">Tab 2</p>
      </TabsContent>
    </Tabs>
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
    <Tabs defaultValue="tab1" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="tab1" className="flex-1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2" className="flex-1">Tab 2</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-sm">Mobile tabs</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p className="text-sm">Tab 2</p>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
