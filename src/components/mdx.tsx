import clsx from 'clsx'
import Link from 'next/link'

import { Heading } from '@/components/Heading'
import { Prose } from '@/components/Prose'
import { ImageZoom } from '@/components/ImageZoom'

export const a = Link
export { Button } from '@/components/Button'
export { CodeGroup, Code as code, Pre as pre } from '@/components/Code'
export { ImageZoom as img }

export function wrapper({ children }: { children: React.ReactNode }) {
  return (
    <article className="flex h-full flex-col pt-16 pb-10">
      <Prose className="flex-auto">{children}</Prose>
    </article>
  )
}

export const h2 = function H2(
  props: Omit<React.ComponentPropsWithoutRef<typeof Heading>, 'level'>,
) {
  return <Heading level={2} {...props} />
}

export const h3 = function H3(
  props: Omit<React.ComponentPropsWithoutRef<typeof Heading>, 'level'>,
) {
  return <Heading level={3} {...props} />
}

function InfoIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <circle cx="8" cy="8" r="8" strokeWidth="0" />
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6.75 7.75h1.5v3.5"
      />
      <circle cx="8" cy="4" r=".5" fill="none" />
    </svg>
  )
}

export function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 flex gap-2.5 rounded-2xl border border-sand-500/20 bg-sand-500/5 p-4 text-base/6 text-sand-200 [--tw-prose-links-hover:theme(colors.sand.200)] [--tw-prose-links:theme(colors.sand.300)]">
      <InfoIcon className="mt-1 h-4 w-4 flex-none fill-sand-500/80 stroke-ink-900" />
      <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}

export function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 flex gap-2.5 rounded-2xl border border-sage-400/20 bg-sage-400/5 p-4 text-base/6 text-sage-200 [--tw-prose-links-hover:theme(colors.sage.300)] [--tw-prose-links:theme(colors.sage.200)]">
      <InfoIcon className="mt-1 h-4 w-4 flex-none fill-sage-400/80 stroke-ink-900" />
      <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}

export function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 items-start gap-x-16 gap-y-10 xl:max-w-none xl:grid-cols-2">
      {children}
    </div>
  )
}

export function Col({
  children,
  sticky = false,
}: {
  children: React.ReactNode
  sticky?: boolean
}) {
  return (
    <div
      className={clsx(
        '[&>:first-child]:mt-0 [&>:last-child]:mb-0',
        sticky && 'xl:sticky xl:top-24',
      )}
    >
      {children}
    </div>
  )
}

export function Properties({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6">
      <ul
        role="list"
        className="m-0 max-w-[calc(var(--container-lg)-(--spacing(8)))] list-none divide-y divide-sand-700/15 p-0"
      >
        {children}
      </ul>
    </div>
  )
}

export function Property({
  name,
  children,
  type,
}: {
  name: string
  children: React.ReactNode
  type?: string
}) {
  return (
    <li className="m-0 px-0 py-4 first:pt-0 last:pb-0">
      <dl className="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
        <dt className="sr-only">Name</dt>
        <dd>
          <code>{name}</code>
        </dd>
        {type && (
          <>
            <dt className="sr-only">Type</dt>
            <dd className="font-mono text-xs text-stone-500">{type}</dd>
          </>
        )}
        <dt className="sr-only">Description</dt>
        <dd className="w-full flex-none [&>:first-child]:mt-0 [&>:last-child]:mb-0">
          {children}
        </dd>
      </dl>
    </li>
  )
}

export function Video({
  src,
  caption,
  autoPlay = true,
  loop = true,
  muted = true,
  controls = true,
}: {
  src: string
  caption?: React.ReactNode
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  controls?: boolean
}) {
  return (
    <figure className="rounded-2xl">
      <div className="m-0 rounded-2xl p-0 shadow-[0_16px_48px_-12px_rgba(154,123,63,0.08)]">
        <video
          src={src}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          controls={controls}
          playsInline
        >
          Your browser does not support the video tag.
        </video>
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-stone-500">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
