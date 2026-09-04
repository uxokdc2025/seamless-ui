/**
 * Seamless UI Design Tokens
 * Programmatic access to design system tokens
 */

export const themes = [
  'midnight-aubergine',
  'together', 
  'airtable',
  'claude',
  'discord',
  'elevenlabs',
  'ibm',
  'meta'
] as const

export const modes = ['light', 'dark'] as const

export type Theme = typeof themes[number]
export type Mode = typeof modes[number]

export interface TokenConfig {
  theme: Theme
  mode: Mode
}

export const defaultTokens: TokenConfig = {
  theme: 'midnight-aubergine',
  mode: 'dark'
}

/**
 * Spacing scale
 */
export const spacing = {
  0: '0',
  px: '1px',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
} as const

export const spacingSemantic = {
  xs: 'var(--space-1)',
  sm: 'var(--space-2)',
  md: 'var(--space-4)',
  lg: 'var(--space-6)',
  xl: 'var(--space-8)',
  '2xl': 'var(--space-12)',
  '3xl': 'var(--space-16)',
} as const

/**
 * Typography scale
 */
export const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '3.75rem',
} as const

export const fontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const

export const lineHeights = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
} as const

export const letterSpacings = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const

export const fontFamilies = {
  sans: 'var(--font-sans)',
  serif: 'var(--font-serif)',
  mono: 'var(--font-mono)',
  display: 'var(--font-display)',
} as const

/**
 * Typography presets
 */
export const typography = {
  display: {
    size: 'var(--text-display-size)',
    weight: 'var(--text-display-weight)',
    lineHeight: 'var(--text-display-line-height)',
    letterSpacing: 'var(--text-display-letter-spacing)',
  },
  heading: {
    size: 'var(--text-heading-size)',
    weight: 'var(--text-heading-weight)',
    lineHeight: 'var(--text-heading-line-height)',
    letterSpacing: 'var(--text-heading-letter-spacing)',
  },
  body: {
    size: 'var(--text-body-size)',
    weight: 'var(--text-body-weight)',
    lineHeight: 'var(--text-body-line-height)',
    letterSpacing: 'var(--text-body-letter-spacing)',
  },
  label: {
    size: 'var(--text-label-size)',
    weight: 'var(--text-label-weight)',
    lineHeight: 'var(--text-label-line-height)',
    letterSpacing: 'var(--text-label-letter-spacing)',
  },
  caption: {
    size: 'var(--text-caption-size)',
    weight: 'var(--text-caption-weight)',
    lineHeight: 'var(--text-caption-line-height)',
    letterSpacing: 'var(--text-caption-letter-spacing)',
  },
  mono: {
    size: 'var(--text-mono-size)',
    weight: 'var(--text-mono-weight)',
    lineHeight: 'var(--text-mono-line-height)',
  },
} as const

/**
 * Border radius scale
 */
export const radii = {
  none: '0',
  sm: '0.125rem',
  base: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
} as const

/**
 * Border widths
 */
export const borderWidths = {
  0: '0',
  1: '1px',
  2: '2px',
  4: '4px',
  8: '8px',
} as const

/**
 * Elevation/Shadow scale
 */
export const shadows = {
  xs: 'var(--shadow-xs)',
  sm: 'var(--shadow-sm)',
  base: 'var(--shadow-base)',
  md: 'var(--shadow-md)',
  lg: 'var(--shadow-lg)',
  xl: 'var(--shadow-xl)',
  '2xl': 'var(--shadow-2xl)',
  inner: 'var(--shadow-inner)',
  none: 'var(--shadow-none)',
} as const

export const elevation = {
  0: 'var(--elevation-0)',
  1: 'var(--elevation-1)',
  2: 'var(--elevation-2)',
  3: 'var(--elevation-3)',
  4: 'var(--elevation-4)',
  5: 'var(--elevation-5)',
} as const

/**
 * Motion durations
 */
export const durations = {
  instant: '0ms',
  fast: '100ms',
  normal: '200ms',
  slow: '300ms',
  slower: '500ms',
  slowest: '700ms',
} as const

/**
 * Easing functions
 */
export const easings = {
  linear: 'linear',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const

/**
 * Common transitions
 */
export const transitions = {
  colors: 'var(--transition-colors)',
  opacity: 'var(--transition-opacity)',
  transform: 'var(--transition-transform)',
  all: 'var(--transition-all)',
  shadow: 'var(--transition-shadow)',
} as const

/**
 * Z-index scale
 */
export const zIndices = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
  toast: 1700,
  max: 9999,
} as const

/**
 * Data visualization color palette
 */
export const chartColors = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
  'var(--color-chart-5)',
  'var(--color-chart-6)',
  'var(--color-chart-7)',
  'var(--color-chart-8)',
] as const

/**
 * Status colors
 */
export const statusColors = {
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  error: 'var(--color-error)',
  info: 'var(--color-info)',
} as const

/**
 * Sizing scale
 */
export const sizes = {
  xs: 'var(--size-xs)',
  sm: 'var(--size-sm)',
  md: 'var(--size-md)',
  lg: 'var(--size-lg)',
  xl: 'var(--size-xl)',
  '2xl': 'var(--size-2xl)',
} as const

/**
 * Focus ring configuration
 */
export const focus = {
  ringWidth: 'var(--focus-ring-width)',
  ringOffset: 'var(--focus-ring-offset)',
  ringColor: 'var(--color-focus-ring)',
} as const
