# DataTable & DataGrid Components

Comprehensive responsive data table and grid components for the Seamless UI library.

## Components

### DataTable

Full-featured data table with:
- ✅ Responsive design with mobile fallback pattern
- ✅ Horizontal scroll with sticky headers
- ✅ Sticky/pinned columns (left or right)
- ✅ Column priority for mobile display
- ✅ Column visibility controls
- ✅ Density controls (compact, default, comfortable)
- ✅ Sorting (single column)
- ✅ Row selection with bulk actions
- ✅ Pagination
- ✅ Custom virtualization for large datasets
- ✅ Filtering support
- ✅ Empty states and loading states
- ✅ Customizable toolbar

### DataGrid

Simplified grid component for basic display:
- ✅ Striped rows
- ✅ Bordered/borderless variants
- ✅ Hover states
- ✅ Density controls
- ✅ Sticky headers
- ✅ Row click handlers
- ✅ Custom cell rendering
- ✅ Column alignment

## Usage

### Basic DataTable

```tsx
import { DataTable, DataTableColumn } from "@seamless/ui"

interface User {
  id: number
  name: string
  email: string
  role: string
  status: "active" | "inactive"
}

const columns: DataTableColumn<User>[] = [
  {
    id: "name",
    header: "Name",
    accessorKey: "name",
    priority: 1, // Shows first on mobile
    sticky: "left", // Sticky on desktop
  },
  {
    id: "email",
    header: "Email",
    accessorKey: "email",
    priority: 2,
  },
  {
    id: "role",
    header: "Role",
    accessorKey: "role",
    priority: 3,
  },
  {
    id: "status",
    header: "Status",
    accessorKey: "status",
    cell: (value) => (
      <Badge variant={value === "active" ? "default" : "secondary"}>
        {value}
      </Badge>
    ),
  },
]

const users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "Admin", status: "active" },
  { id: 2, name: "Bob", email: "bob@example.com", role: "User", status: "inactive" },
]

function UsersTable() {
  return (
    <DataTable
      data={users}
      columns={columns}
      enableSorting
      enablePagination
      pageSize={10}
    />
  )
}
```

### DataTable with Selection & Bulk Actions

```tsx
import { DataTable } from "@seamless/ui"
import { Button } from "@seamless/ui"
import { Trash, Mail } from "lucide-react"

function UsersTableWithActions() {
  const [selected, setSelected] = React.useState<Set<number>>(new Set())

  return (
    <DataTable
      data={users}
      columns={columns}
      enableSelection
      selectedRows={selected}
      onSelectionChange={setSelected}
      bulkActions={
        <>
          <Button variant="outline" size="sm">
            <Mail className="mr-2 h-4 w-4" />
            Send Email
          </Button>
          <Button variant="destructive" size="sm">
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </>
      }
    />
  )
}
```

### DataTable with Mobile Card View

```tsx
function ResponsiveTable() {
  return (
    <DataTable
      data={users}
      columns={columns}
      mobileCardRender={(user) => (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{user.name}</h3>
            <Badge variant={user.status === "active" ? "default" : "secondary"}>
              {user.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <p className="text-sm">{user.role}</p>
        </div>
      )}
    />
  )
}
```

### DataTable with Virtualization

```tsx
function LargeDataTable() {
  const largeDataset = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `User ${i}`,
    email: `user${i}@example.com`,
    role: i % 3 === 0 ? "Admin" : "User",
    status: i % 2 === 0 ? "active" : "inactive",
  }))

  return (
    <DataTable
      data={largeDataset}
      columns={columns}
      enableVirtualization
      estimatedRowHeight={53}
      enablePagination
      pageSize={100}
    />
  )
}
```

### DataTable with Toolbar & Filters

```tsx
import { Search } from "@seamless/ui"

function FilterableTable() {
  const [searchTerm, setSearchTerm] = React.useState("")
  
  const filteredData = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <DataTable
      data={filteredData}
      columns={columns}
      toolbar={
        <>
          <Search
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button variant="outline">
            Add User
          </Button>
        </>
      }
    />
  )
}
```

### DataGrid (Simple)

```tsx
import { DataGrid, DataGridColumn } from "@seamless/ui"

const columns: DataGridColumn[] = [
  { key: "name", label: "Name", width: 200 },
  { key: "email", label: "Email" },
  { 
    key: "status", 
    label: "Status",
    align: "center",
    render: (value) => (
      <Badge variant={value === "active" ? "default" : "secondary"}>
        {value}
      </Badge>
    )
  },
]

function SimpleGrid() {
  return (
    <DataGrid
      data={users}
      columns={columns}
      striped
      hoverable
      onRowClick={(row) => console.log("Clicked:", row)}
    />
  )
}
```

## DataTable API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | **required** | Array of data to display |
| `columns` | `DataTableColumn<T>[]` | **required** | Column definitions |
| `density` | `"compact" \| "default" \| "comfortable"` | `"default"` | Row height/padding |
| `enableSorting` | `boolean` | `false` | Enable column sorting |
| `sortState` | `DataTableSort[]` | `[]` | Controlled sort state |
| `onSortChange` | `(sort: DataTableSort[]) => void` | - | Sort change handler |
| `enableSelection` | `boolean` | `false` | Enable row selection |
| `selectedRows` | `Set<number>` | `new Set()` | Controlled selection state |
| `onSelectionChange` | `(selected: Set<number>) => void` | - | Selection change handler |
| `enablePagination` | `boolean` | `false` | Enable pagination |
| `pageIndex` | `number` | `0` | Current page (0-indexed) |
| `pageSize` | `number` | `10` | Rows per page |
| `pageCount` | `number` | - | Total pages (computed if omitted) |
| `onPageChange` | `(page: number) => void` | - | Page change handler |
| `onPageSizeChange` | `(size: number) => void` | - | Page size change handler |
| `enableVirtualization` | `boolean` | `false` | Enable row virtualization |
| `estimatedRowHeight` | `number` | `53` | Estimated row height for virtualization |
| `hiddenColumns` | `Set<string>` | `new Set()` | Hidden column IDs |
| `onHiddenColumnsChange` | `(hidden: Set<string>) => void` | - | Column visibility handler |
| `bulkActions` | `ReactNode` | - | Bulk action buttons |
| `mobileCardRender` | `(row: T, index: number) => ReactNode` | - | Custom mobile card renderer |
| `toolbar` | `ReactNode` | - | Custom toolbar content |
| `fullWidth` | `boolean` | `true` | Full width container |
| `stickyHeader` | `boolean` | `true` | Sticky table header |
| `emptyMessage` | `string` | `"No data available"` | Empty state message |
| `loading` | `boolean` | `false` | Loading state |

### DataTableColumn

```typescript
interface DataTableColumn<T = any> {
  id: string                                    // Unique column ID
  header: ReactNode                             // Column header content
  accessorKey?: keyof T                         // Object key to access
  accessorFn?: (row: T) => any                  // Custom accessor function
  cell?: (value: any, row: T, index: number) => ReactNode  // Custom cell renderer
  enableSorting?: boolean                       // Enable sorting for this column
  enableHiding?: boolean                        // Allow hiding this column
  sticky?: "left" | "right" | false            // Pin column to left/right
  priority?: number                             // Mobile display priority (lower = higher priority)
  minWidth?: number                             // Minimum column width
  maxWidth?: number                             // Maximum column width
  width?: number                                // Fixed column width
  className?: string                            // Cell className
  headerClassName?: string                      // Header cell className
}
```

## DataGrid API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `any[]` | **required** | Array of data to display |
| `columns` | `DataGridColumn[]` | **required** | Column definitions |
| `striped` | `boolean` | `false` | Striped rows |
| `bordered` | `boolean` | `true` | Show borders |
| `hoverable` | `boolean` | `false` | Hover effect on rows |
| `density` | `"compact" \| "default" \| "comfortable"` | `"default"` | Row height/padding |
| `onRowClick` | `(row: any, index: number) => void` | - | Row click handler |
| `emptyMessage` | `string` | `"No data available"` | Empty state message |
| `loading` | `boolean` | `false` | Loading state |
| `stickyHeader` | `boolean` | `false` | Sticky table header |
| `fullWidth` | `boolean` | `true` | Full width container |

### DataGridColumn

```typescript
interface DataGridColumn {
  key: string                                    // Data object key
  label: ReactNode                               // Column header
  render?: (value: any, row: any, index: number) => ReactNode  // Custom renderer
  width?: string | number                        // Column width
  align?: "left" | "center" | "right"           // Text alignment
  className?: string                             // Cell className
  headerClassName?: string                       // Header cell className
}
```

## Features

### Responsive Design

The DataTable automatically adapts to mobile screens:
- Desktop: Full table with horizontal scroll
- Mobile (< 768px): Falls back to card view when `mobileCardRender` is provided
- Column priority determines which columns show first on mobile

### Sticky Columns

Pin important columns to prevent them from scrolling:
```tsx
{
  id: "name",
  header: "Name",
  accessorKey: "name",
  sticky: "left",  // Stays visible while scrolling horizontally
}
```

### Column Visibility

Users can show/hide columns via the View Options menu:
- Click the "View" button in the toolbar
- Toggle individual columns
- Columns with `enableHiding: false` cannot be hidden

### Density Control

Three density options affect row spacing:
- **Compact**: Minimal padding, fits more rows
- **Default**: Balanced padding
- **Comfortable**: Maximum padding for readability

### Virtualization

For large datasets (1000+ rows), enable virtualization:
```tsx
<DataTable
  data={largeData}
  columns={columns}
  enableVirtualization
  estimatedRowHeight={53}
/>
```

Only visible rows are rendered, maintaining performance.

### Pagination

Pagination reduces DOM size for better performance:
```tsx
<DataTable
  data={data}
  columns={columns}
  enablePagination
  pageSize={20}
  onPageChange={handlePageChange}
/>
```

### Sorting

Enable sorting per column or globally:
```tsx
const columns = [
  {
    id: "name",
    header: "Name",
    accessorKey: "name",
    enableSorting: true,  // This column is sortable
  },
]

<DataTable
  columns={columns}
  enableSorting  // Enable sorting globally
/>
```

## Styling

Both components use Tailwind CSS and integrate with the Seamless design system:
- Colors: Uses semantic color tokens (`bg-card`, `text-muted-foreground`, etc.)
- Borders: Configurable via `bordered` prop
- Spacing: Controlled by `density` prop
- Custom styles: Add via `className` prop

## Accessibility

- Semantic HTML (`<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`)
- Keyboard navigation support via native table elements
- ARIA labels on interactive elements (checkboxes, buttons)
- Focus indicators on sortable headers
- Screen reader friendly selection states

## Performance Tips

1. **Use virtualization for 1000+ rows**: `enableVirtualization`
2. **Use pagination for 100+ rows**: `enablePagination`
3. **Memoize cell renderers**: Use `React.memo` for complex cells
4. **Optimize column definitions**: Define outside component to prevent recreation
5. **Controlled state**: Only use controlled state when needed

## Examples

See the Storybook stories for complete interactive examples:
- `packages/docs/stories/data-table.stories.tsx`
- `packages/docs/stories/data-grid.stories.tsx`
