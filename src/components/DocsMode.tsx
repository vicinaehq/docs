'use client'

import { BookOpen, Hammer } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { create } from 'zustand'

export type DocsMode = 'user' | 'developer'

const DEVELOPER_PREFIX = '/extensions'
const STORAGE_KEY = 'vicinae-docs-mode'

export const useDocsModeStore = create<{
	mode: DocsMode
	setMode: (mode: DocsMode) => void
}>()((set) => ({
	mode: 'user',
	setMode: (mode) => {
		if (typeof window !== 'undefined') {
			localStorage.setItem(STORAGE_KEY, mode)
		}
		set({ mode })
	},
}))

export function useDocsMode() {
	let { mode, setMode } = useDocsModeStore()
	let pathname = usePathname()

	useEffect(() => {
		let stored = localStorage.getItem(STORAGE_KEY) as DocsMode | null
		if (stored === 'user' || stored === 'developer') {
			setMode(stored)
		}
	}, [setMode])

	useEffect(() => {
		if (pathname.startsWith(DEVELOPER_PREFIX)) {
			setMode('developer')
		} else {
			setMode('user')
		}
	}, [pathname, setMode])

	return { mode, setMode }
}

export function DocsModeSwitch({ className }: { className?: string }) {
	let { mode } = useDocsMode()
	let isDev = mode === 'developer'

	return (
		<div
			className={`flex gap-0.5 rounded-lg bg-white/[0.03] p-0.5 ring-1 ring-white/[0.04] ${className ?? ''}`}
			role="tablist"
			aria-label="Documentation mode"
		>
			<Link
				href="/"
				role="tab"
				aria-selected={!isDev}
				className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors duration-200 ${
					!isDev
						? 'bg-white/[0.07] text-sand-400 shadow-sm'
						: 'text-stone-600 hover:text-stone-400'
				}`}
			>
				<BookOpen className="h-3.5 w-3.5" />
				<span>Manual</span>
			</Link>
			<Link
				href="/extensions/introduction"
				role="tab"
				aria-selected={isDev}
				className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors duration-200 ${
					isDev
						? 'bg-white/[0.07] text-sand-400 shadow-sm'
						: 'text-stone-600 hover:text-stone-400'
				}`}
			>
				<Hammer className="h-3.5 w-3.5" />
				<span>Extensions</span>
			</Link>
		</div>
	)
}
