export type ActionType = 'primary' | 'secondary' | 'tertiary' | 'dangerous'

const ActionStyleMap = new Map<ActionType, string>([
  ['primary', 'bg-primary-500/30 hover:bg-primary-500/60 text-primary-400'],
  ['secondary', 'bg-accent hover:bg-accent/60'],
  ['tertiary', 'hover:bg-accent/60'],
  ['dangerous', 'bg-error-500/30 hover:bg-error-500/60 text-error-400'],
])

export const getActionStyle = (action: ActionType) => ActionStyleMap.get(action)
