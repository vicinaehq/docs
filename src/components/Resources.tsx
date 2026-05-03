'use client'

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  type MotionValue,
} from 'motion/react'
import Link from 'next/link'

import { GridPattern } from '@/components/GridPattern'
import { Heading } from '@/components/Heading'
import { ChatBubbleIcon } from '@/components/icons/ChatBubbleIcon'
import { EnvelopeIcon } from '@/components/icons/EnvelopeIcon'
import { UserIcon } from '@/components/icons/UserIcon'
import { UsersIcon } from '@/components/icons/UsersIcon'

interface Resource {
  href: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  pattern: Omit<
    React.ComponentPropsWithoutRef<typeof GridPattern>,
    'width' | 'height' | 'x'
  >
}

const resources: Array<Resource> = [
  {
    href: '/contacts',
    name: 'Contacts',
    description:
      'Learn about the contact model and how to create, retrieve, update, delete, and list contacts.',
    icon: UserIcon,
    pattern: {
      y: 16,
      squares: [
        [0, 1],
        [1, 3],
      ],
    },
  },
  {
    href: '/conversations',
    name: 'Conversations',
    description:
      'Learn about the conversation model and how to create, retrieve, update, delete, and list conversations.',
    icon: ChatBubbleIcon,
    pattern: {
      y: -6,
      squares: [
        [-1, 2],
        [1, 3],
      ],
    },
  },
  {
    href: '/messages',
    name: 'Messages',
    description:
      'Learn about the message model and how to create, retrieve, update, delete, and list messages.',
    icon: EnvelopeIcon,
    pattern: {
      y: 32,
      squares: [
        [0, 2],
        [1, 4],
      ],
    },
  },
  {
    href: '/groups',
    name: 'Groups',
    description:
      'Learn about the group model and how to create, retrieve, update, delete, and list groups.',
    icon: UsersIcon,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
]

function ResourceIcon({ icon: Icon }: { icon: Resource['icon'] }) {
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-ink-800/50 ring-1 ring-sand-700/10 backdrop-blur-[2px] transition duration-300 group-hover:bg-sand-500/10 group-hover:ring-sand-500/20">
      <Icon className="h-5 w-5 fill-ink-800/10 stroke-stone-500 transition-colors duration-300 group-hover:fill-sand-500/10 group-hover:stroke-sand-400" />
    </div>
  )
}

function ResourcePattern({
  mouseX,
  mouseY,
  ...gridProps
}: Resource['pattern'] & {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}) {
  let maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`
  let style = { maskImage, WebkitMaskImage: maskImage }

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl mask-[linear-gradient(white,transparent)] transition duration-300 group-hover:opacity-50">
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-sand-700/5 stroke-sand-700/10"
          {...gridProps}
        />
      </div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-linear-to-r from-[#202D2E] to-[#303428] opacity-0 transition duration-300 group-hover:opacity-100"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100"
        style={style}
      >
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-white/2.5 stroke-white/10"
          {...gridProps}
        />
      </motion.div>
    </div>
  )
}

function Resource({ resource }: { resource: Resource }) {
  let mouseX = useMotionValue(0)
  let mouseY = useMotionValue(0)

  function onMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    let { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      key={resource.href}
      onMouseMove={onMouseMove}
      className="group relative flex rounded-2xl bg-ink-800/40 transition-shadow hover:shadow-[0_16px_48px_-12px_rgba(154,123,63,0.08)]"
    >
      <ResourcePattern {...resource.pattern} mouseX={mouseX} mouseY={mouseY} />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-sand-700/15 ring-inset group-hover:ring-sand-600/18" />
      <div className="relative rounded-2xl px-4 pt-16 pb-4">
        <ResourceIcon icon={resource.icon} />
        <h3 className="mt-4 text-sm/7 font-semibold text-white">
          <Link href={resource.href}>
            <span className="absolute inset-0 rounded-2xl" />
            {resource.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-stone-400">{resource.description}</p>
      </div>
    </div>
  )
}

export function Resources() {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="resources">
        Resources
      </Heading>
      <div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-sand-700/15 pt-10 sm:grid-cols-2 xl:grid-cols-4">
        {resources.map((resource) => (
          <Resource key={resource.href} resource={resource} />
        ))}
      </div>
    </div>
  )
}
