import clsx from 'clsx'
import Link from 'next/link'

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"
      />
    </svg>
  )
}

const variantStyles = {
  primary:
    'rounded-lg bg-gradient-to-b from-sand-500 to-sand-600 py-1 px-3 text-ink-900 font-medium hover:shadow-warm hover:from-sand-400 hover:to-sand-500',
  secondary:
    'rounded-lg bg-ink-800/50 py-1 px-3 text-stone-400 ring-1 ring-inset ring-sand-700/10 hover:text-stone-200 hover:ring-sand-600/18 hover:bg-ink-800/70',
  filled:
    'rounded-lg bg-gradient-to-b from-sand-500 to-sand-600 py-1 px-3 text-ink-900 font-medium hover:shadow-warm hover:from-sand-400 hover:to-sand-500',
  outline:
    'rounded-lg py-1 px-3 text-stone-400 ring-1 ring-inset ring-sand-700/10 hover:bg-ink-800/50 hover:text-stone-200 hover:ring-sand-600/18',
  text: 'text-sand-400 hover:text-sand-200',
}

type ButtonProps = {
  variant?: keyof typeof variantStyles
  arrow?: 'left' | 'right'
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
)

export function Button({
  variant = 'primary',
  className,
  children,
  arrow,
  ...props
}: ButtonProps) {
  className = clsx(
    'inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition-all duration-200',
    variantStyles[variant],
    className,
  )

  let arrowIcon = (
    <ArrowIcon
      className={clsx(
        'mt-0.5 h-5 w-5',
        variant === 'text' && 'relative top-px',
        arrow === 'left' && '-ml-1 rotate-180',
        arrow === 'right' && '-mr-1',
      )}
    />
  )

  let inner = (
    <>
      {arrow === 'left' && arrowIcon}
      {children}
      {arrow === 'right' && arrowIcon}
    </>
  )

  if (typeof props.href === 'undefined') {
    return (
      <button className={className} {...props}>
        {inner}
      </button>
    )
  }

  return (
    <Link className={className} {...props}>
      {inner}
    </Link>
  )
}
