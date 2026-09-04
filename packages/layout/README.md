# @seamless/layout

Fluid responsive layout primitives for building modern web applications. Built with CSS Grid, Flexbox, and responsive design patterns that work from mobile to ultrawide displays.

## Installation

```bash
pnpm add @seamless/layout
```

## Core Philosophy

- **Content vs. Work Apps**: Content apps use constrained containers; work apps go edge-to-edge
- **Container Queries**: Components respond to their container, not just viewport
- **Mobile-First**: All layouts are mobile-responsive by default
- **Composable**: Mix and match primitives to build complex layouts
- **Type-Safe**: Full TypeScript support with exported types

## Components

### Layout Primitives

#### Container
Centered content container with configurable max-width and padding.

```tsx
import { Container } from "@seamless/layout"

// Content app (constrained)
<Container size="lg" padding="lg">
  <p>Centered content with max-width</p>
</Container>

// Work app (fluid)
<Container fluid size="full" padding="none">
  <p>Edge-to-edge layout</p>
</Container>
```

**Props:**
- `size`: `sm` | `md` | `lg` | `xl` | `2xl` | `3xl` | `4xl` | `full` | `constrained` | `prose`
- `padding`: `none` | `sm` | `md` | `lg` | `xl` | `2xl`
- `fluid`: `boolean` — fills full width when true

#### Grid
CSS Grid layout with auto-fit/auto-fill support and responsive columns.

```tsx
import { Grid } from "@seamless/layout"

// Auto-fit responsive grid
<Grid cols="auto" gap="md">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Grid>

// Custom min column width
<Grid minColWidth="250px" gap="lg">
  {items.map(item => <Card key={item.id}>{item.name}</Card>)}
</Grid>

// Fixed columns with responsive breakpoints
<Grid cols={4} gap="md" align="start">
  {/* 4 columns on desktop, responsive on mobile */}
</Grid>
```

**Props:**
- `cols`: `1` | `2` | `3` | `4` | `5` | `6` | `8` | `12` | `auto` | `auto-sm` | `auto-lg`
- `gap`: `none` | `xs` | `sm` | `md` | `lg` | `xl` | `2xl`
- `align`: `start` | `center` | `end` | `stretch`
- `justify`: `start` | `center` | `end` | `stretch`
- `minColWidth`: string (e.g., `"250px"`, `"15rem"`)

#### Stack
Vertical flexbox layout for stacking elements.

```tsx
import { Stack } from "@seamless/layout"

<Stack gap="lg" align="start">
  <h1>Title</h1>
  <p>Paragraph</p>
  <Button>Action</Button>
</Stack>
```

**Props:**
- `gap`: `none` | `xs` | `sm` | `md` | `lg` | `xl` | `2xl`
- `align`: `start` | `center` | `end` | `stretch`
- `justify`: `start` | `center` | `end` | `between` | `around` | `evenly`

#### Columns
Responsive multi-column grid that adapts to viewport size.

```tsx
import { Columns } from "@seamless/layout"

// 3 columns on desktop, 2 on tablet, 1 on mobile
<Columns cols={3} gap="md">
  <Card>Column 1</Card>
  <Card>Column 2</Card>
  <Card>Column 3</Card>
</Columns>

// Auto-fit with minimum width
<Columns minWidth="250px" gap="lg">
  {items.map(item => <Card key={item.id}>{item.name}</Card>)}
</Columns>
```

**Props:**
- `cols`: `1` | `2` | `3` | `4` | `5` | `6` | `12`
- `gap`: `none` | `xs` | `sm` | `md` | `lg` | `xl` | `2xl`
- `align`: `start` | `center` | `end` | `stretch`
- `minWidth`: string (overrides `cols` with auto-fit)

#### Inline
Horizontal flexbox with wrapping support.

```tsx
import { Inline } from "@seamless/layout"

<Inline gap="sm" justify="between" align="center">
  <span>Label</span>
  <Button>Action</Button>
</Inline>
```

**Props:**
- `gap`: `none` | `xs` | `sm` | `md` | `lg` | `xl` | `2xl`
- `align`: `start` | `center` | `end` | `stretch` | `baseline`
- `justify`: `start` | `center` | `end` | `between` | `around` | `evenly`

#### Cluster
Wrapping horizontal layout for groups of items (tags, chips, buttons).

```tsx
import { Cluster } from "@seamless/layout"

<Cluster gap="sm" justify="start">
  <Badge>React</Badge>
  <Badge>TypeScript</Badge>
  <Badge>Tailwind</Badge>
</Cluster>
```

**Props:**
- `gap`: `none` | `xs` | `sm` | `md` | `lg` | `xl` | `2xl`
- `justify`: `start` | `center` | `end` | `between`
- `align`: `start` | `center` | `end` | `baseline`

#### Split
Two-sided layout with space-between justification (headers, toolbars).

```tsx
import { Split } from "@seamless/layout"

<Split direction="horizontal" justify="between" align="center">
  <div>Logo</div>
  <nav>Navigation</nav>
</Split>
```

**Props:**
- `direction`: `horizontal` | `vertical`
- `gap`: `none` | `xs` | `sm` | `md` | `lg` | `xl` | `2xl`
- `align`: `start` | `center` | `end` | `stretch` | `baseline`
- `justify`: `start` | `center` | `end` | `between`

### Complex Layouts

#### SidebarLayout
Classic sidebar + main content layout.

```tsx
import { SidebarLayout, SidebarLayoutSidebar, SidebarLayoutContent } from "@seamless/layout"

<SidebarLayout sidebarWidth="md" collapsible>
  <SidebarLayoutSidebar>
    <Navigation />
  </SidebarLayoutSidebar>
  <SidebarLayoutContent>
    <MainContent />
  </SidebarLayoutContent>
</SidebarLayout>
```

**Props:**
- `sidebarWidth`: `sm` | `md` | `lg` | `xl`
- `sidebarPosition`: `left` | `right`
- `gap`: `none` | `xs` | `sm` | `md` | `lg` | `xl`
- `collapsible`: `boolean` — collapses to single column on mobile
- `customWidth`: string (e.g., `"280px"`)

#### PageShell
Full-page scaffold with header, content, and footer.

```tsx
import { PageShell, PageShellHeader, PageShellContent, PageShellFooter } from "@seamless/layout"

<PageShell>
  <PageShellHeader>
    <h1>Page Title</h1>
  </PageShellHeader>
  <PageShellContent>
    <p>Main content</p>
  </PageShellContent>
  <PageShellFooter>
    <p>Footer content</p>
  </PageShellFooter>
</PageShell>
```

Or use the simplified API:

```tsx
<PageShell
  header={<h1>Page Title</h1>}
  footer={<p>Footer</p>}
>
  <p>Main content</p>
</PageShell>
```

#### DashboardGrid
Responsive dashboard layouts with common patterns.

```tsx
import { DashboardGrid, DashboardGridItem } from "@seamless/layout"

// Auto-fit cards
<DashboardGrid layout="auto-fit" gap="lg">
  <Card>Metric 1</Card>
  <Card>Metric 2</Card>
  <Card>Metric 3</Card>
</DashboardGrid>

// Sidebar + main content
<DashboardGrid layout="sidebar-main" gap="md">
  <aside>Filters</aside>
  <main>Data grid</main>
</DashboardGrid>

// Custom spans
<DashboardGrid layout="3-col" gap="md">
  <DashboardGridItem colSpan={2} rowSpan={2}>
    <Chart />
  </DashboardGridItem>
  <Card>Metric</Card>
  <Card>Metric</Card>
</DashboardGrid>
```

**Props:**
- `layout`: `1-col` | `2-col` | `3-col` | `4-col` | `sidebar-main` | `main-sidebar` | `sidebar-main-sidebar` | `auto-fit`
- `gap`: `none` | `xs` | `sm` | `md` | `lg` | `xl` | `2xl`
- `dense`: `boolean` — uses minimal row height

#### Workspace
Full-viewport layout for complex applications (IDEs, design tools).

```tsx
import { Workspace, WorkspaceHeader, WorkspaceSidebar, WorkspaceMain, WorkspacePanel } from "@seamless/layout"

<Workspace layout="editor-panels">
  <WorkspaceHeader>
    <Toolbar />
  </WorkspaceHeader>
  <WorkspaceSidebar>
    <FileTree />
  </WorkspaceSidebar>
  <WorkspaceMain>
    <Editor />
  </WorkspaceMain>
  <WorkspacePanel>
    <Inspector />
  </WorkspacePanel>
</Workspace>
```

**Props:**
- `layout`: `editor` | `editor-sidebar` | `editor-panels` | `full`

### Interactive Layouts

#### ResizablePanels
Resizable split-pane layout.

```tsx
import { ResizablePanels, ResizablePanel, ResizableHandle } from "@seamless/layout"

<ResizablePanels direction="horizontal">
  <ResizablePanel defaultSize="30%" minSize={200}>
    <Sidebar />
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize="70%">
    <MainContent />
  </ResizablePanel>
</ResizablePanels>
```

**ResizablePanels Props:**
- `direction`: `horizontal` | `vertical`

**ResizablePanel Props:**
- `defaultSize`: string (e.g., `"50%"`, `"300px"`, `"1fr"`)
- `minSize`: number (pixels)
- `maxSize`: number (pixels)
- `resizable`: `boolean`

#### ScrollArea
Custom scrollable container with optional scrollbar styling.

```tsx
import { ScrollArea } from "@seamless/layout"

// Vertical scroll with hidden scrollbar
<ScrollArea orientation="vertical" hideScrollbar className="h-96">
  <LongContent />
</ScrollArea>

// Horizontal scroll
<ScrollArea orientation="horizontal">
  <WideContent />
</ScrollArea>

// Both directions
<ScrollArea orientation="both">
  <LargeGrid />
</ScrollArea>
```

**Props:**
- `orientation`: `vertical` | `horizontal` | `both`
- `hideScrollbar`: `boolean`
- `scrollbarClassName`: string — custom scrollbar styles

## Responsive Patterns

### Mobile → Desktop Breakpoints
All components use Tailwind's responsive breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Container Query Support
Use with `@container` queries for component-based responsiveness:

```tsx
<div className="@container">
  <Grid cols="auto" gap="md">
    {/* Grid responds to parent width, not viewport */}
  </Grid>
</div>
```

### Device-Specific Patterns

#### Mobile (< 768px)
- Single column layouts
- Stacked navigation
- Full-width containers

#### Tablet (768px - 1024px)
- 2-column grids
- Collapsible sidebars
- Adaptive spacing

#### Desktop (1024px - 1536px)
- Multi-column grids
- Persistent sidebars
- Generous spacing

#### Wide/Ultrawide (> 1536px)
- 4+ column grids
- Multi-panel layouts
- Maximum content width constraints

## Common Patterns

### Content Page

```tsx
<PageShell>
  <PageShellHeader>
    <Container>
      <h1>Article Title</h1>
    </Container>
  </PageShellHeader>
  <PageShellContent>
    <Container size="prose" padding="lg">
      <article>Content here</article>
    </Container>
  </PageShellContent>
</PageShell>
```

### Dashboard

```tsx
<PageShell>
  <PageShellHeader>
    <Container fluid padding="lg">
      <Split justify="between" align="center">
        <h1>Dashboard</h1>
        <Button>Export</Button>
      </Split>
    </Container>
  </PageShellHeader>
  <PageShellContent>
    <Container fluid padding="lg">
      <DashboardGrid layout="auto-fit" gap="lg">
        <MetricCard title="Revenue" value="$12.5K" />
        <MetricCard title="Users" value="1,234" />
        <MetricCard title="Conversion" value="3.2%" />
      </DashboardGrid>
    </Container>
  </PageShellContent>
</PageShell>
```

### Application Layout

```tsx
<Workspace layout="editor-panels">
  <WorkspaceHeader>
    <Container fluid padding="md">
      <Split justify="between" align="center">
        <div>Logo</div>
        <nav>Menu</nav>
      </Split>
    </Container>
  </WorkspaceHeader>
  <WorkspaceSidebar>
    <FileTree />
  </WorkspaceSidebar>
  <WorkspaceMain>
    <Editor />
  </WorkspaceMain>
  <WorkspacePanel>
    <Inspector />
  </WorkspacePanel>
</Workspace>
```

## TypeScript

All components export their prop types:

```tsx
import type { 
  ContainerProps, 
  GridProps, 
  StackProps,
  DashboardGridProps 
} from "@seamless/layout"

const MyContainer: React.FC<ContainerProps> = (props) => {
  return <Container {...props} />
}
```

## Class Variance Authority (CVA)

All variant-based components export their CVA configurations:

```tsx
import { containerVariants, gridVariants } from "@seamless/layout"

const customContainerClass = containerVariants({ 
  size: "lg", 
  padding: "xl" 
})
```

## Accessibility

- Semantic HTML elements (`header`, `main`, `aside`, `footer`)
- Proper ARIA roles where applicable
- Keyboard navigation support for interactive components
- Focus management in resizable panels

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox required
- Container queries require modern browser (polyfill available)

## Related Packages

- `@seamless/ui` — Core UI components
- `@seamless/tokens` — Design tokens
- `@seamless/themes` — Theme system

## License

MIT
