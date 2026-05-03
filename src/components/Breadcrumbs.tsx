'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { navigation } from '@/components/Navigation'

export function Breadcrumbs() {
	let pathname = usePathname()

	if (pathname === '/') return null

	for (let item of navigation) {
		if ('links' in item) {
			let link = item.links.find((l) => l.href === pathname)
			if (link) {
				return (
					<nav aria-label="Breadcrumb" className="mb-4 text-xs text-stone-500">
						<span>{item.title}</span>
						<span className="mx-1.5 text-stone-600">/</span>
						<span className="text-stone-400">{link.title}</span>
					</nav>
				)
			}
		} else if (item.href === pathname) {
			return (
				<nav aria-label="Breadcrumb" className="mb-4 text-xs text-stone-500">
					<Link href="/" className="transition-colors hover:text-stone-400">
						Docs
					</Link>
					<span className="mx-1.5 text-stone-600">/</span>
					<span className="text-stone-400">{item.title}</span>
				</nav>
			)
		}
	}

	return null
}
