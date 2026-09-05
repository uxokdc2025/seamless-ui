/**
 * Generate component documentation data by analyzing component source files
 */

import * as fs from 'fs'
import * as path from 'path'

interface PropDefinition {
  name: string
  type: string
  description: string
  default?: string
  required?: boolean
}

interface ComponentDocs {
  name: string
  slug: string
  description: string
  category: string
  props: PropDefinition[]
}

const saasComponentDescriptions: Record<string, { description: string; category: string }> = {
  'account-menu': { description: 'Dropdown menu for user account actions with profile, settings, and sign-out options.', category: 'User Interface' },
  'activity-feed': { description: 'Display a chronological feed of user and system activities with timestamps.', category: 'Data Display' },
  'advanced-filter-builder': { description: 'Visual query builder for complex filtering with rules, groups, and logical operators.', category: 'Data Management' },
  'api-key-row': { description: 'Display and manage API keys with masking, copying, and revocation capabilities.', category: 'Administration' },
  'app-header': { description: 'Top navigation header with branding, navigation links, and utility actions.', category: 'Shell & Layout' },
  'app-shell': { description: 'Complete application layout with sidebar, header, and content area. Responsive and collapsible.', category: 'Shell & Layout' },
  'audit-log': { description: 'Security audit trail displaying user actions, timestamps, and change details.', category: 'Administration' },
  'billing-summary': { description: 'Overview of current usage, costs, and billing cycle information.', category: 'Billing & Usage' },
  'command-center': { description: 'Keyboard-driven command palette for quick navigation and actions (Cmd+K).', category: 'User Interface' },
  'data-toolbar': { description: 'Action bar for data tables with selection, bulk actions, and filters.', category: 'Data Management' },
  'detail-drawer': { description: 'Slide-out panel for displaying detailed information and contextual actions.', category: 'Panels & Drawers' },
  'environment-badge': { description: 'Visual indicator for deployment environment (dev, staging, production).', category: 'Status & Indicators' },
  'filter-bar': { description: 'Quick filter toolbar with tags and search for data refinement.', category: 'Data Management' },
  'inspector': { description: 'Property inspector panel for viewing and editing object attributes.', category: 'Panels & Drawers' },
  'integration-card': { description: 'Card displaying third-party integration status, configuration, and actions.', category: 'Integrations' },
  'metric-card': { description: 'Display key performance metrics with trends, changes, and visual indicators.', category: 'Metrics & Analytics' },
  'metric-group': { description: 'Grid layout for grouping multiple related metrics together.', category: 'Metrics & Analytics' },
  'nav-group': { description: 'Collapsible navigation section with a label and child navigation items.', category: 'Navigation' },
  'nav-item': { description: 'Individual navigation link with icon, label, and active state support.', category: 'Navigation' },
  'navigation': { description: 'Main navigation component orchestrating nav groups and items.', category: 'Navigation' },
  'notification-center': { description: 'Dropdown panel displaying notifications, alerts, and system messages.', category: 'User Interface' },
  'permissions-matrix': { description: 'Grid view for managing role-based permissions and access control.', category: 'Administration' },
  'project-switcher': { description: 'Dropdown for switching between multiple projects or workspaces.', category: 'Switchers' },
  'properties-panel': { description: 'Side panel for displaying and editing selected object properties.', category: 'Panels & Drawers' },
  'saved-views': { description: 'Manage and switch between saved filter and layout configurations.', category: 'Data Management' },
  'search': { description: 'Global search input with suggestions and keyboard shortcuts.', category: 'User Interface' },
  'settings-section': { description: 'Structured section for grouping related settings with labels and descriptions.', category: 'Settings & Config' },
  'sidebar-navigation': { description: 'Collapsible sidebar with hierarchical navigation items and groups.', category: 'Navigation' },
  'team-management': { description: 'Interface for managing team members, roles, and invitations.', category: 'Administration' },
  'usage-meter': { description: 'Visual meter showing resource consumption against quotas and limits.', category: 'Billing & Usage' },
  'user-management': { description: 'Admin interface for user lifecycle management and permissions.', category: 'Administration' },
  'workspace-switcher': { description: 'Dropdown for switching between workspaces or organizations.', category: 'Switchers' },
}

const aiComponentDescriptions: Record<string, { description: string; category: string }> = {
  'agent-activity': { description: 'Timeline view of agent actions and events during task execution.', category: 'Agent Components' },
  'agent-avatar': { description: 'Visual representation of AI agent with status indicator.', category: 'Agent Components' },
  'agent-card': { description: 'Display AI agent status, metrics, and current activity in a card layout.', category: 'Agent Components' },
  'agent-error': { description: 'Display agent execution errors with context and recovery options.', category: 'Agent Components' },
  'agent-handoff': { description: 'Visual representation of task handoff between agents.', category: 'Agent Components' },
  'agent-queue': { description: 'Display queued tasks awaiting agent execution with priority indicators.', category: 'Agent Components' },
  'agent-status': { description: 'Badge or indicator showing agent operational status (active, idle, error).', category: 'Agent Components' },
  'approval-request': { description: 'Card requesting human approval for agent actions with approve/reject controls.', category: 'Interaction' },
  'artifact-preview': { description: 'Preview generated artifacts (files, images, code) with actions.', category: 'Artifacts & Results' },
  'blocker': { description: 'Display task blockers and dependencies preventing execution.', category: 'Interaction' },
  'chat-message': { description: 'Single chat message with role (user/assistant/system), content, and timestamp.', category: 'Chat & Prompts' },
  'cost-display': { description: 'Show API costs, token usage costs, and total spend for operations.', category: 'Metrics & Costs' },
  'escalation': { description: 'Display escalated issues requiring human intervention or triage.', category: 'Interaction' },
  'execution-status': { description: 'Current execution state with progress, status, and timing information.', category: 'Execution' },
  'execution-step': { description: 'Individual step in agent execution with status, duration, and output.', category: 'Execution' },
  'fleet-status': { description: 'Overview of agent fleet health, availability, and resource usage.', category: 'Fleet & Workers' },
  'human-intervention': { description: 'Request for human input or decision with context and response interface.', category: 'Interaction' },
  'kanban-ticket': { description: 'Card representation of kanban tasks with status, assignee, and metadata.', category: 'Task Management' },
  'model-badge': { description: 'Badge displaying AI model name with provider-specific styling.', category: 'Badges & Indicators' },
  'progress': { description: 'Visual progress indicator for long-running agent operations.', category: 'Execution' },
  'prompt-composer': { description: 'Rich text editor for composing prompts with templates and variables.', category: 'Chat & Prompts' },
  'provider-badge': { description: 'Badge showing AI provider (OpenAI, Anthropic, etc.) with logo.', category: 'Badges & Indicators' },
  'qa-result': { description: 'Display quality assurance check results with pass/fail status and details.', category: 'Artifacts & Results' },
  'reasoning': { description: 'Display agent reasoning steps and chain-of-thought process.', category: 'Execution' },
  'run-summary': { description: 'Summary of completed agent run with outcomes, duration, and resources used.', category: 'Execution' },
  'run-timeline': { description: 'Chronological timeline view of agent run events and milestones.', category: 'Execution' },
  'streaming-state': { description: 'Indicator showing active streaming response with animation.', category: 'Chat & Prompts' },
  'task-card': { description: 'Card displaying task information with status, priority, and actions.', category: 'Task Management' },
  'task-status': { description: 'Badge showing task status (pending, running, done, blocked, failed).', category: 'Task Management' },
  'token-usage': { description: 'Display token consumption metrics (input, output, total) for LLM calls.', category: 'Metrics & Costs' },
  'tool-call': { description: 'Display agent tool invocation with name, arguments, and execution status.', category: 'Tools & Actions' },
  'tool-result': { description: 'Display tool execution result with output, errors, and timing.', category: 'Tools & Actions' },
  'typing-state': { description: 'Animated indicator showing agent is composing a response.', category: 'Chat & Prompts' },
  'worker-health': { description: 'Health status indicator for agent worker processes.', category: 'Fleet & Workers' },
}

function extractPropsFromFile(filePath: string): PropDefinition[] {
  const content = fs.readFileSync(filePath, 'utf-8')
  
  // Extract interface definition
  const interfaceMatch = content.match(/export interface \w+Props[^{]*\{([^}]+)\}/s)
  if (!interfaceMatch) return []
  
  const propsBlock = interfaceMatch[1]
  const props: PropDefinition[] = []
  
  // Parse individual props - simplified extraction
  const propLines = propsBlock.split('\n').filter(line => line.trim() && !line.trim().startsWith('//'))
  
  for (const line of propLines) {
    const match = line.match(/(\w+)(\?)?:\s*(.+?)(?:\/\/(.+))?$/)
    if (match) {
      const [, name, optional, type, comment] = match
      props.push({
        name,
        type: type.trim(),
        description: comment?.trim() || '',
        required: !optional
      })
    }
  }
  
  return props
}

function generateDocsForPackage(packageName: 'saas' | 'ai'): ComponentDocs[] {
  const packagePath = path.join(process.cwd(), 'packages', packageName, 'src')
  const files = fs.readdirSync(packagePath).filter(f => f.endsWith('.tsx') && f !== 'index.ts')
  
  const descriptions = packageName === 'saas' ? saasComponentDescriptions : aiComponentDescriptions
  const docs: ComponentDocs[] = []
  
  for (const file of files) {
    const slug = file.replace('.tsx', '')
    const componentName = slug.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('')
    
    const meta = descriptions[slug]
    if (!meta) continue
    
    const filePath = path.join(packagePath, file)
    const props = extractPropsFromFile(filePath)
    
    docs.push({
      name: componentName,
      slug,
      description: meta.description,
      category: meta.category,
      props
    })
  }
  
  return docs.sort((a, b) => a.name.localeCompare(b.name))
}

// Generate and output
const saasComponents = generateDocsForPackage('saas')
const aiComponents = generateDocsForPackage('ai')

fs.writeFileSync(
  path.join(process.cwd(), 'apps/docs/src/data/saas-components.json'),
  JSON.stringify(saasComponents, null, 2)
)

fs.writeFileSync(
  path.join(process.cwd(), 'apps/docs/src/data/ai-components.json'),
  JSON.stringify(aiComponents, null, 2)
)

console.log(`Generated docs for ${saasComponents.length} SaaS components`)
console.log(`Generated docs for ${aiComponents.length} AI components`)
