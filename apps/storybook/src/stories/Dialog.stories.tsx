import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  Button,
} from '@seamless/ui';

const meta: Meta<typeof Dialog> = {
  title: 'UI/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a dialog description. It provides additional context about the dialog.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm">Dialog content goes here.</p>
        </div>
      </DialogContent>
    </Dialog>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open with Footer</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogDescription>
            Are you sure you want to proceed with this action?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="username" className="text-right text-sm font-medium">
              Username
            </label>
            <input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dark Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dark Mode Dialog</DialogTitle>
          <DialogDescription>This dialog in dark mode</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm">Content optimized for dark mode.</p>
        </div>
      </DialogContent>
    </Dialog>
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
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Mobile Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mobile Dialog</DialogTitle>
          <DialogDescription>Optimized for mobile screens</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm">Mobile-friendly dialog.</p>
        </div>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
