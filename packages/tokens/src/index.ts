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