'use client'

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import clsx from 'clsx'
import { Check, Clipboard } from 'lucide-react'
import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { create } from 'zustand'

import { Tag } from '@/components/Tag'

const languageNames: Record<string, string> = {
  js: 'JavaScript',
  ts: 'TypeScript',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  tsx: 'TSX',
  jsx: 'JSX',
  php: 'PHP',
  python: 'Python',
  ruby: 'Ruby',
  go: 'Go',
  nix: 'Nix',
  cpp: 'C++',
  swift: 'Swift',
  cmake: 'CMake',
  bash: 'Bash',
  sh: 'Shell',
  shell: 'Shell',
  json: 'JSON',
  yaml: 'YAML',
  toml: 'TOML',
  css: 'CSS',
  html: 'HTML',
  sql: 'SQL',
  rust: 'Rust',
  txt: 'Text',
}

function getPanelTitle({
  title,
  language,
}: {
  title?: string
  language?: string
}) {
  if (title) {
    return title
  }
  if (language && language in languageNames) {
    return languageNames[language]
  }
  return 'Code'
}

function CopyButton({ code }: { code: string }) {
  let [copyCount, setCopyCount] = useState(0)
  let copied = copyCount > 0

  useEffect(() => {
    if (copyCount > 0) {
      let timeout = setTimeout(() => setCopyCount(0), 1000)
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [copyCount])

  return (
    <button
      type="button"
      className={clsx(
        'group/button absolute top-3 right-3 flex items-center gap-1.5 rounded-md px-2 py-1.5 text-2xs font-medium opacity-0 transition group-hover:opacity-100 focus:opacity-100',
        copied
          ? 'bg-sand-500/10 text-sand-400'
          : 'bg-white/[0.04] text-stone-500 hover:bg-white/[0.08] hover:text-stone-300',
      )}
      onClick={() => {
        window.navigator.clipboard.writeText(code).then(() => {
          setCopyCount((count) => count + 1)
        })
      }}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" />
          Copied
        </>
      ) : (
        <>
          <Clipboard className="h-3.5 w-3.5" />
          Copy
        </>
      )}
    </button>
  )
}

function CodePanelHeader({ tag, label }: { tag?: string; label?: string }) {
  if (!tag && !label) {
    return null
  }

  return (
    <div className="flex h-9 items-center gap-2 border-b border-white/[0.04] px-4">
      {tag && (
        <div className="flex">
          <Tag variant="small">{tag}</Tag>
        </div>
      )}
      {tag && label && (
        <span className="h-0.5 w-0.5 rounded-full bg-stone-600" />
      )}
      {label && (
        <span className="font-mono text-xs text-stone-500">{label}</span>
      )}
    </div>
  )
}

function CodePanel({
  children,
  tag,
  label,
  code,
}: {
  children: React.ReactNode
  tag?: string
  label?: string
  code?: string
}) {
  let childArray = Children.toArray(children)
  let child = childArray.find(isValidElement)

  if (isValidElement<{ tag?: string; label?: string; code?: string }>(child)) {
    tag = child.props.tag ?? tag
    label = child.props.label ?? label
    code = child.props.code ?? code
  }

  if (!code) {
    throw new Error(
      '`CodePanel` requires a `code` prop, or a child with a `code` prop.',
    )
  }

  let lineCount = code.split('\n').length
  let isLong = lineCount > 20

  return (
    <div className="group">
      <CodePanelHeader tag={tag} label={label} />
      <div className="relative">
        <pre className="max-h-[32rem] overflow-auto p-4 text-sm text-stone-200">
          {children}
        </pre>
        {isLong && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0a0b0e] to-transparent" />
        )}
        <CopyButton code={code} />
      </div>
    </div>
  )
}

function CodeGroupHeader({
  title,
  children,
  selectedIndex,
}: {
  title: string
  children: React.ReactNode
  selectedIndex: number
}) {
  let hasTabs = Children.count(children) > 1

  if (!title && !hasTabs) {
    return null
  }

  return (
    <div className="flex min-h-[calc(--spacing(10)+1px)] flex-wrap items-center gap-x-4 border-b border-white/[0.04] px-4">
      {title && (
        <h3 className="mr-auto text-xs font-semibold text-stone-200">
          {title}
        </h3>
      )}
      {hasTabs && (
        <TabList className="-mb-px flex gap-4 text-xs font-medium">
          {Children.map(children, (child, childIndex) => (
            <Tab
              className={clsx(
                'border-b py-2.5 transition-colors duration-200 data-selected:not-data-focus:outline-hidden',
                childIndex === selectedIndex
                  ? 'border-sand-500 text-sand-400'
                  : 'border-transparent text-stone-500 hover:text-stone-300',
              )}
            >
              {getPanelTitle(isValidElement<Record<string, string>>(child) ? child.props : {})}
            </Tab>
          ))}
        </TabList>
      )}
    </div>
  )
}

function CodeGroupPanels({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof CodePanel>) {
  let hasTabs = Children.count(children) > 1

  if (hasTabs) {
    return (
      <TabPanels>
        {Children.map(children, (child) => (
          <TabPanel>
            <CodePanel {...props}>{child}</CodePanel>
          </TabPanel>
        ))}
      </TabPanels>
    )
  }

  return <CodePanel {...props}>{children}</CodePanel>
}

function usePreventLayoutShift() {
  let positionRef = useRef<HTMLElement>(null)
  let rafRef = useRef<number>(undefined)

  useEffect(() => {
    return () => {
      if (typeof rafRef.current !== 'undefined') {
        window.cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return {
    positionRef,
    preventLayoutShift(callback: () => void) {
      if (!positionRef.current) {
        return
      }

      let initialTop = positionRef.current.getBoundingClientRect().top

      callback()

      rafRef.current = window.requestAnimationFrame(() => {
        let newTop =
          positionRef.current?.getBoundingClientRect().top ?? initialTop
        window.scrollBy(0, newTop - initialTop)
      })
    },
  }
}

const usePreferredLanguageStore = create<{
  preferredLanguages: Array<string>
  addPreferredLanguage: (language: string) => void
}>()((set) => ({
  preferredLanguages: [],
  addPreferredLanguage: (language) =>
    set((state) => ({
      preferredLanguages: [
        ...state.preferredLanguages.filter(
          (preferredLanguage) => preferredLanguage !== language,
        ),
        language,
      ],
    })),
}))

function useTabGroupProps(availableLanguages: Array<string>) {
  let { preferredLanguages, addPreferredLanguage } = usePreferredLanguageStore()
  let [selectedIndex, setSelectedIndex] = useState(0)
  let activeLanguage = [...availableLanguages].sort(
    (a, z) => preferredLanguages.indexOf(z) - preferredLanguages.indexOf(a),
  )[0]
  let languageIndex = availableLanguages.indexOf(activeLanguage)
  let newSelectedIndex = languageIndex === -1 ? selectedIndex : languageIndex
  if (newSelectedIndex !== selectedIndex) {
    setSelectedIndex(newSelectedIndex)
  }

  let { positionRef, preventLayoutShift } = usePreventLayoutShift()

  return {
    as: 'div' as const,
    ref: positionRef,
    selectedIndex,
    onChange: (newSelectedIndex: number) => {
      preventLayoutShift(() =>
        addPreferredLanguage(availableLanguages[newSelectedIndex]),
      )
    },
  }
}

const CodeGroupContext = createContext(false)

export function CodeGroup({
  children,
  title,
  ...props
}: React.ComponentPropsWithoutRef<typeof CodeGroupPanels> & { title: string }) {
  let languages =
    Children.map(children, (child) =>
      getPanelTitle(isValidElement<Record<string, string>>(child) ? child.props : {}),
    ) ?? []
  let tabGroupProps = useTabGroupProps(languages)
  let hasTabs = Children.count(children) > 1

  let containerClassName =
    'my-6 overflow-hidden rounded-xl bg-[#0a0b0e] ring-1 ring-white/[0.06] shadow-lg shadow-black/20'
  let header = (
    <CodeGroupHeader title={title} selectedIndex={tabGroupProps.selectedIndex}>
      {children}
    </CodeGroupHeader>
  )
  let panels = <CodeGroupPanels {...props}>{children}</CodeGroupPanels>

  return (
    <CodeGroupContext.Provider value={true}>
      {hasTabs ? (
        <TabGroup {...tabGroupProps} className={containerClassName}>
          <div className="not-prose">
            {header}
            {panels}
          </div>
        </TabGroup>
      ) : (
        <div className={containerClassName}>
          <div className="not-prose">
            {header}
            {panels}
          </div>
        </div>
      )}
    </CodeGroupContext.Provider>
  )
}

export function Code({
  children,
  ...props
}: React.ComponentPropsWithoutRef<'code'>) {
  let isGrouped = useContext(CodeGroupContext)

  if (isGrouped) {
    if (typeof children !== 'string') {
      throw new Error(
        '`Code` children must be a string when nested inside a `CodeGroup`.',
      )
    }
    return <code {...props} dangerouslySetInnerHTML={{ __html: children }} />
  }

  return <code {...props}>{children}</code>
}

export function Pre({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof CodeGroup>) {
  let isGrouped = useContext(CodeGroupContext)

  if (isGrouped) {
    return children
  }

  return <CodeGroup {...props}>{children}</CodeGroup>
}
