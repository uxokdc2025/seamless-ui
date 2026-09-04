import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarToggle,
} from "@seamless/layout"
import { AppShell, Navigation, NavItem, NavGroup } from "@seamless/saas"
import { Badge, Button } from "@seamless/ui"

const meta = {
  title: "SaaS/AppShell",
  component: AppShell,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AppShell>

export default meta
type Story = StoryObj<typeof meta>

// Icon components
const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
)

const LayoutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M3 9h18" />
  </svg>
)

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 6v6" />
  </svg>
)

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
)

const BellIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
)

export const Default: Story = {
  render: () => (
    <AppShell
      header={
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Application Name</h1>
          <div className="flex items-center gap-3">
            <button className="rounded-md p-2 hover:bg-interactive-hover">
              <SearchIcon />
            </button>
            <button className="rounded-md p-2 hover:bg-interactive-hover">
              <BellIcon />
            </button>
            <div className="h-8 w-8 rounded-full bg-brand text-center text-white leading-8">
              U
            </div>
          </div>
        </div>
      }
      sidebar={
        <>
          <SidebarHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand text-white">
                <span className="text-sm font-bold">A</span>
              </div>
              <span className="font-semibold text-foreground">App Name</span>
            </div>
            <div className="ml-auto">
              <SidebarToggle />
            </div>
          </SidebarHeader>

          <SidebarContent>
            <Navigation>
              <NavItem icon={<HomeIcon />} label="Dashboard" active />
              
              <NavGroup label="Pages" defaultOpen>
                <NavItem
                  icon={<LayoutIcon />}
                  label="Components"
                  badge={<Badge variant="secondary">24</Badge>}
                />
                <NavItem
                  icon={<LayoutIcon />}
                  label="Layouts"
                  badge={<Badge variant="secondary">8</Badge>}
                />
              </NavGroup>

              <NavGroup label="Settings">
                <NavItem icon={<SettingsIcon />} label="General" />
                <NavItem icon={<SettingsIcon />} label="Account" />
              </NavGroup>
            </Navigation>
          </SidebarContent>

          <SidebarFooter>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/10">
                <span className="text-sm font-semibold text-brand">U</span>
              </div>
              <div className="flex-1 truncate">
                <p className="text-sm font-medium">User Name</p>
                <p className="text-xs text-foreground-muted">user@example.com</p>
              </div>
            </div>
          </SidebarFooter>
        </>
      }
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome to AppShell</h1>
          <p className="mt-2 text-foreground-muted">
            This is a complete application shell with header, sidebar, and content area.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-surface p-6"
            >
              <h3 className="font-semibold text-foreground">Card {i}</h3>
              <p className="mt-2 text-sm text-foreground-muted">
                Some content goes here.
              </p>
              <Button className="mt-4" size="sm">
                Action
              </Button>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  ),
}

export const WithoutHeader: Story = {
  render: () => (
    <AppShell
      sidebar={
        <>
          <SidebarHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand text-white">
                <span className="text-sm font-bold">A</span>
              </div>
              <span className="font-semibold text-foreground">App Name</span>
            </div>
            <div className="ml-auto">
              <SidebarToggle />
            </div>
          </SidebarHeader>

          <SidebarContent>
            <Navigation>
              <NavItem icon={<HomeIcon />} label="Home" active />
              <NavItem icon={<LayoutIcon />} label="Pages" />
              <NavItem icon={<SettingsIcon />} label="Settings" />
            </Navigation>
          </SidebarContent>
        </>
      }
    >
      <div>
        <h1 className="text-3xl font-bold">No Header</h1>
        <p className="mt-2 text-foreground-muted">
          This variant has no header bar, just sidebar and content.
        </p>
      </div>
    </AppShell>
  ),
}

export const WithoutSidebar: Story = {
  render: () => (
    <AppShell
      header={
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Simple Layout</h1>
          <Button size="sm">Action</Button>
        </div>
      }
    >
      <div>
        <h1 className="text-3xl font-bold">No Sidebar</h1>
        <p className="mt-2 text-foreground-muted">
          This variant has only a header and content area.
        </p>
      </div>
    </AppShell>
  ),
}
