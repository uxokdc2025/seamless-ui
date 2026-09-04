# Seamless UI Storybook

Comprehensive Storybook workbench for the Seamless UI design system. This provides visual documentation, testing, and QA for all component packages.

## Features

- **Comprehensive Stories**: All stable components from `@seamless/ui`, `@seamless/layout`, `@seamless/saas`, `@seamless/ai`, and `@seamless/blocks`
- **State Coverage**: Stories for default, hover, focus, active, disabled, loading states
- **Variant Coverage**: All size variants, color variants, and style variants
- **Responsive Testing**: Mobile, narrow container, and responsive layout stories
- **Dark Mode**: All components tested in both light and dark modes
- **Accessibility**: Integrated @storybook/addon-a11y for accessibility testing
- **Unit Tests**: Vitest + Testing Library for component testing

## Development

```bash
# Start Storybook development server
pnpm dev

# Run unit tests
pnpm test

# Run tests with UI
pnpm test:ui

# Build Storybook for production
pnpm build
```

## Story Coverage

### UI Components (11 components)
- ✅ Button - All variants, sizes, states (disabled, loading, with icons)
- ✅ Badge - All variants (default, secondary, destructive, outline)
- ✅ Card - Default, with footer, hover, loading states
- ✅ Input - All types (text, email, password, number), states, with labels
- ✅ Checkbox - Checked, disabled, with labels
- ✅ Switch - On/off, disabled, with labels
- ✅ Dialog - Default, with footer, with forms
- ✅ Tabs - 2-3 tabs, disabled tabs, responsive

### Layout Components (3 components)
- ✅ Container - All sizes (sm, md, lg, xl, full), nested
- ✅ Stack - Various gaps, many items, mixed content
- ✅ Grid - 2, 3, 4 columns, various gaps, responsive, card grid

### SaaS Components (2 components)
- ✅ AppShell - From existing stories
- ✅ Navigation - From existing stories

### AI Components (1 component)
- ✅ AgentCard - From existing stories

## Test Coverage

Unit tests with Vitest + Testing Library:
- ✅ Button.test.tsx - Rendering, click handling, variants, sizes, disabled, refs
- ✅ Input.test.tsx - User input, types, disabled, onChange, refs
- ✅ Checkbox.test.tsx - Checked/unchecked, disabled, defaultChecked, label association

All tests passing: 20/20 ✓

## Accessibility

The `@storybook/addon-a11y` addon runs axe-core accessibility checks on all stories:
- Color contrast validation
- ARIA attributes validation
- Keyboard navigation testing
- Screen reader compatibility

Access the a11y panel in Storybook to see accessibility violations and recommendations.

## Responsive Testing

Every component story includes:
- **Default**: Desktop/standard viewport
- **Mobile**: Mobile1 viewport (320x568)
- **Narrow Container**: Constrained width testing (192px)
- **Dark Mode**: Light/dark theme toggle via toolbar

Use the viewport and theme toolbar controls to test responsiveness and theming.

## Adding New Stories

1. Create `ComponentName.stories.tsx` in `src/stories/`
2. Follow the pattern from existing stories
3. Include these variants:
   - Default
   - All prop variants
   - Disabled (if applicable)
   - Loading (if applicable)
   - DarkMode
   - Mobile
   - NarrowContainer (if layout-sensitive)

Example:
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from '@seamless/ui';

const meta: Meta<typeof YourComponent> = {
  title: 'UI/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // props
  },
};

// ... more stories
```

## Testing Components

1. Create `ComponentName.test.tsx` in `src/test/`
2. Test critical interactions and states
3. Use `@testing-library/react` for component rendering
4. Use `@testing-library/user-event` for interactions

Example:
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { YourComponent } from '@seamless/ui';

describe('YourComponent', () => {
  it('renders correctly', () => {
    render(<YourComponent />);
    expect(screen.getByRole('...')).toBeInTheDocument();
  });
});
```

## Theme Configuration

Storybook includes theme switcher toolbar for testing components across design system themes:
- Midnight Aubergine (default)
- Together
- Airtable
- Claude
- Discord
- ElevenLabs
- IBM
- Meta

Select a theme from the toolbar to see all stories re-render with that theme.

## Next Steps

To expand coverage:
1. Add remaining `@seamless/ui` components (Select, Combobox, DatePicker, FileUpload, etc.)
2. Add remaining `@seamless/layout` components (Columns, Inline, Cluster, Split, Sidebar, etc.)
3. Add interaction tests with `@storybook/test`
4. Add visual regression testing with Chromatic or similar
5. Document component props with JSDoc for better autodocs
