'use client'

import { Link as LinkIcon } from 'lucide-react'
import { useInView } from 'motion/react'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

import { useSectionStore } from '@/components/SectionProvider'
import { Tag } from '@/components/Tag'
import { remToPx } from '@/lib/remToPx'

function Eyebrow({ tag, label }: { tag?: string; label?: string }) {
  if (!tag && !label) {
    return null
  }

  return (
    <div className="flex items-center gap-x-3">
      {tag && <Tag>{tag}</Tag>}
      {tag && label && (
        <span className="h-0.5 w-0.5 rounded-full bg-stone-600" />
      )}
      {label && (
        <span className="font-mono text-xs text-stone-500">{label}</span>
      )}
    </div>
  )
}

function Anchor({
  id,
  inView,
  children,
}: {
  id: string
  inView: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={`#${id}`}
      className="group text-inherit no-underline hover:text-inherit"
    >
      {inView && (
        <div className="absolute mt-1 ml-[calc(-1*var(--width))] hidden w-(--width) opacity-0 transition [--width:calc(2.625rem+0.5px+50%-min(50%,calc(var(--container-lg)+(--spacing(8)))))] group-hover:opacity-100 group-focus:opacity-100 md:block lg:z-50 2xl:[--width:--spacing(10)]">
          <div className="group/anchor block h-5 w-5 rounded-lg bg-ink-800 ring-1 ring-sand-700/10 transition ring-inset hover:ring-sand-600/18 hover:bg-ink-700">
            <LinkIcon className="h-5 w-5 text-stone-500 transition group-hover/anchor:text-stone-200" />
          </div>
        </div>
      )}
      {children}
    </Link>
  )
}

export function Heading<Level extends 2 | 3>({
  children,
  tag,
  label,
  level,
  anchor = true,
  ...props
}: React.ComponentPropsWithoutRef<`h${Level}`> & {
  id: string
  tag?: string
  label?: string
  level?: Level
  anchor?: boolean
}) {
  level = level ?? (2 as Level)
  let Component = `h${level}` as 'h2' | 'h3'
  let ref = useRef<HTMLHeadingElement>(null)
  let registerHeading = useSectionStore((s) => s.registerHeading)

  let inView = useInView(ref, {
    margin: `${remToPx(-3.5)}px 0px 0px 0px`,
    amount: 'all',
  })

  useEffect(() => {
    if (level === 2) {
      registerHeading({ id: props.id, ref, offsetRem: tag || label ? 8 : 6 })
    }
  })

  return (
    <>
      <Eyebrow tag={tag} label={label} />
      <Component
        ref={ref}
        className={tag || label ? 'mt-2 scroll-mt-32' : 'scroll-mt-24'}
        {...props}
      >
        {anchor ? (
          <Anchor id={props.id} inView={inView}>
            {children}
          </Anchor>
        ) : (
          children
        )}
      </Component>
    </>
  )
}
