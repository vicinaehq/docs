import clsx from 'clsx'

const variantStyles = {
  small: '',
  medium: 'rounded-lg px-1.5 ring-1 ring-inset',
}

const colorStyles = {
  orange: {
    small: 'text-sand-400',
    medium: 'ring-sand-500/20 bg-sand-500/10 text-sand-400',
  },
  sky: {
    small: 'text-sky-400',
    medium: 'ring-sky-400/30 bg-sky-400/10 text-sky-400',
  },
  amber: {
    small: 'text-sand-300',
    medium: 'ring-sand-400/30 bg-sand-400/10 text-sand-300',
  },
  rose: {
    small: 'text-rose-400',
    medium: 'ring-rose-500/20 bg-rose-400/10 text-rose-400',
  },
  zinc: {
    small: 'text-stone-500',
    medium: 'ring-sand-700/10 bg-ink-800/50 text-stone-400',
  },
}

const valueColorMap = {
  GET: 'orange',
  POST: 'sky',
  PUT: 'amber',
  DELETE: 'rose',
} as Record<string, keyof typeof colorStyles>

export function Tag({
  children,
  variant = 'medium',
  color = valueColorMap[children] ?? 'orange',
}: {
  children: keyof typeof valueColorMap & (string | {})
  variant?: keyof typeof variantStyles
  color?: keyof typeof colorStyles
}) {
  return (
    <span
      className={clsx(
        'font-mono text-[0.625rem]/6 font-semibold',
        variantStyles[variant],
        colorStyles[color][variant],
      )}
    >
      {children}
    </span>
  )
}
