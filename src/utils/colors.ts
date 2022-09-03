export type ActionType = 'primary' | 'secondary' | 'tertiary' | 'dangerous'

const ActionStyleMap = new Map<ActionType, string>([
  [
    'primary',
    'bg-violet-400 bg-opacity-10 hover:bg-opacity-20 text-violet-400 border-violet-400 hover:bg-opacity-70',
  ],
  [
    'secondary',
    'bg-slate-200 bg-opacity-10 hover:bg-opacity-20 border-slate-200 dark:border-standard-600 dark:bg-slate-600 dark:bg-opacity-10',
  ],
  [
    'tertiary',
    'bg-slate-200 bg-opacity-0 hover:bg-opacity-5 border-slate-200 dark:border-standard-600',
  ],
  [
    'dangerous',
    'bg-rose-600 text-rose-600 border-rose-600 bg-opacity-10 hover:bg-opacity-20',
  ],
])

export const getActionStyle = (action: ActionType) => ActionStyleMap.get(action)
