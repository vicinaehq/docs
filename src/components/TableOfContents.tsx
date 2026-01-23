'use client'

import clsx from 'clsx'
import Link from 'next/link'

import { useSectionStore } from '@/components/SectionProvider'

export function TableOfContents() {
  let sections = useSectionStore((s) => s.sections)
  let visibleSections = useSectionStore((s) => s.visibleSections)

  if (sections.length === 0) {
    return null
  }

  function isActive(id: string) {
    return visibleSections.includes(id)
  }

  return (
    <nav aria-label="Table of contents">
      <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">
        On this page
      </h2>
      <ul className="mt-4 space-y-3 text-sm">
        {sections.map((section) => (
          <li key={section.id}>
            <Link
              href={`#${section.id}`}
              className={clsx(
                'block transition',
                isActive(section.id)
                  ? 'text-orange-500'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white',
              )}
            >
              {section.title}
            </Link>
            {section.children && section.children.length > 0 && (
              <ul className="mt-2 space-y-2 border-l border-zinc-200 pl-4 dark:border-zinc-800">
                {section.children.map((child) => (
                  <li key={child.id}>
                    <Link
                      href={`#${child.id}`}
                      className={clsx(
                        'block text-sm transition',
                        isActive(child.id)
                          ? 'text-orange-500'
                          : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300',
                      )}
                    >
                      {child.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
