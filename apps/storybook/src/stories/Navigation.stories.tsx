import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarToggle,
  SidebarOverlay,
  SidebarState,
} from "@seamless/layout"
import { Navigation, NavItem, NavGroup } from "@seamless/saas"
import { Badge } from "@seamless/ui"

const meta = {
  title: "SaaS/Navigation",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

// Icon components (inline SVGs for demo)
const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const DashboardIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
)

const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const FolderIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
  </svg>
)

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const ChartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </svg>
)

const InboxIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
)

// Demo component
const NavigationDemo = ({ state }: { state?: SidebarState }) => {
  const [sidebarState, setSidebarState] = React.useState<SidebarState>(
    state || "expanded"
  )

  return (
    <div className="flex h-screen bg-background">
      <SidebarOverlay />
      <Sidebar
        state={sidebarState}
        onStateChange={setSidebarState}
        storageKey="demo-sidebar"
      >
        <SidebarHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand text-white">
              <span className="text-sm font-bold">S</span>
            </div>
            {sidebarState !== "collapsed" && (
              <span className="font-semibold text-foreground">Seamless UI</span>
            )}
          </div>
          <div className="ml-auto">
            <SidebarToggle />
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Navigation>
            <NavItem
              icon={<HomeIcon />}
              label="Home"
              active
              tooltip="Go to home"
            />
            <NavItem
              icon={<DashboardIcon />}
              label="Dashboard"
              badge={<Badge variant="default">Pro</Badge>}
              tooltip="View dashboard"
            />

            <NavGroup label="Workspace" defaultOpen>
              <NavItem
                icon={<FolderIcon />}
                label="Projects"
                badge={<Badge variant="secondary">12</Badge>}
                tooltip="View projects"
              />
              <NavItem
                icon={<UsersIcon />}
                label="Team"
                tooltip="Manage team"
              />
              <NavItem
                icon={<ChartIcon />}
                label="Analytics"
                badge={<Badge variant="destructive">3</Badge>}
                tooltip="View analytics"
              />
            </NavGroup>

            <NavGroup label="Management" collapsible>
              <NavItem
                icon={<InboxIcon />}
                label="Inbox"
                badge={<Badge variant="secondary">24</Badge>}
                tooltip="Check inbox"
              />
              <NavItem
                icon={<SettingsIcon />}
                label="Settings"
                tooltip="Manage settings"
              />
            </NavGroup>

            <NavItem
              icon={<SettingsIcon />}
              label="Disabled Item"
              disabled
              tooltip="This item is disabled"
            />
          </Navigation>
        </SidebarContent>

        <SidebarFooter>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 text-brand">
              <span className="text-sm font-semibold">JD</span>
            </div>
            {sidebarState !== "collapsed" && (
              <div className="flex-1 truncate">
                <p className="text-sm font-medium text-foreground">John Doe</p>
                <p className="text-xs text-foreground-muted">john@example.com</p>
              </div>
            )}
          </div>
        </SidebarFooter>
      </Sidebar>

      <main className="flex-1 overflow-auto p-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Navigation Demo
            </h1>
            <p className="mt-2 text-foreground-muted">
              This demonstrates the responsive collapsible sidebar with nested navigation,
              badges, tooltips, and mobile drawer functionality.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-surface p-6">
            <h2 className="text-xl font-semibold text-foreground">Features</h2>
            <ul className="mt-4 space-y-2 text-foreground-muted">
              <li>• Expanded / Collapsed / Mobile drawer states</li>
              <li>• Persistent state in localStorage</li>
              <li>• Nested navigation groups with expand/collapse</li>
              <li>• Badges and counts</li>
              <li>• Active state indication</li>
              <li>• Tooltips in collapsed state</li>
              <li>• Keyboard navigation support</li>
              <li>• Responsive mobile drawer with overlay</li>
              <li>• Full width content on mobile</li>
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-surface p-6">
            <h2 className="text-xl font-semibold text-foreground">
              Keyboard Navigation
            </h2>
            <div className="mt-4 space-y-2 text-foreground-muted">
              <p>
                <kbd className="rounded bg-muted px-2 py-1 text-xs">Tab</kbd> - Navigate
                between items
              </p>
              <p>
                <kbd className="rounded bg-muted px-2 py-1 text-xs">Enter</kbd> or{" "}
                <kbd className="rounded bg-muted px-2 py-1 text-xs">Space</kbd> - Activate
                item or toggle group
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export const Default: Story = {
  render: () => <NavigationDemo />,
}

export const Collapsed: Story = {
  render: () => <NavigationDemo state="collapsed" />,
}

export const Mobile: Story = {
  render: () => <NavigationDemo state="mobile" />,
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
}
