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
      <h2 className="text-xs font-medium tracking-wider uppercase text-stone-200">
        On this page
      </h2>
      <ul className="mt-4 space-y-3 text-sm">
        {sections.map((section) => (
          <li key={section.id}>
            <Link
              href={`#${section.id}`}
              className={clsx(
                'block transition-colors duration-200',
                isActive(section.id)
                  ? 'text-sand-400'
                  : 'text-stone-400 hover:text-stone-100',
              )}
            >
              {section.title}
            </Link>
            {section.children && section.children.length > 0 && (
              <ul className="mt-2 space-y-2 border-l border-sand-700/15 pl-4">
                {section.children.map((child) => (
                  <li key={child.id}>
                    <Link
                      href={`#${child.id}`}
                      className={clsx(
                        'block text-sm transition-colors duration-200',
                        isActive(child.id)
                          ? 'text-sand-400'
                          : 'text-stone-500 hover:text-stone-300',
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
