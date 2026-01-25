'use client'

import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef, useState } from 'react'

import { Button } from '@/components/Button'
import { useIsInsideMobileNavigation } from '@/components/MobileNavigation'
import { Tag } from '@/components/Tag'
import { remToPx } from '@/lib/remToPx'
import { CloseButton } from '@headlessui/react'

interface NavGroup {
	title: string
	links: Array<{
		title: string
		href: string
	}>
}

interface NavDirectLink {
	title: string
	href: string
}

type NavItem = NavGroup | NavDirectLink

function isNavGroup(item: NavItem): item is NavGroup {
	return 'links' in item
}

function useInitialValue<T>(value: T, condition = true) {
	let initialValue = useRef(value).current
	return condition ? initialValue : value
}

function TopLevelNavItem({
	href,
	children,
}: {
	href: string
	children: React.ReactNode
}) {
	return (
		<li className="md:hidden">
			<CloseButton
				as={Link}
				href={href}
				className="block py-1 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
			>
				{children}
			</CloseButton>
		</li>
	)
}

function NavLink({
	href,
	children,
	tag,
	active = false,
	isAnchorLink = false,
}: {
	href: string
	children: React.ReactNode
	tag?: string
	active?: boolean
	isAnchorLink?: boolean
}) {
	return (
		<CloseButton
			as={Link}
			href={href}
			aria-current={active ? 'page' : undefined}
			className={clsx(
				'flex justify-between gap-2 py-1 pr-3 text-sm transition',
				isAnchorLink ? 'pl-7' : 'pl-4',
				active
					? 'text-zinc-900 dark:text-white'
					: 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white',
			)}
		>
			<span className="truncate">{children}</span>
			{tag && (
				<Tag variant="small" color="zinc">
					{tag}
				</Tag>
			)}
		</CloseButton>
	)
}

function ActivePageMarker({
	group,
	pathname,
}: {
	group: NavGroup
	pathname: string
}) {
	let itemHeight = remToPx(2)
	let offset = remToPx(0.25)
	let activePageIndex = group.links.findIndex((link) => link.href === pathname)
	let top = offset + activePageIndex * itemHeight

	return (
		<motion.div
			layout
			className="absolute left-2 h-6 w-px bg-orange-500"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { delay: 0.2 } }}
			exit={{ opacity: 0 }}
			style={{ top }}
		/>
	)
}

function ChevronIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 16 16"
			fill="none"
			aria-hidden="true"
			className={className}
		>
			<path
				d="M5 4l4 4-4 4"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}

function NavigationGroup({
	group,
	className,
}: {
	group: NavGroup
	className?: string
}) {
	// If this is the mobile navigation then we always render the initial
	// state, so that the state does not change during the close animation.
	// The state will still update when we re-open (re-render) the navigation.
	let isInsideMobileNavigation = useIsInsideMobileNavigation()
	let pathname = useInitialValue(usePathname(), isInsideMobileNavigation)

	let isActiveGroup =
		group.links.findIndex((link) => link.href === pathname) !== -1

	let [isExpanded, setIsExpanded] = useState(isActiveGroup)

	return (
		<li className={clsx('relative mt-4', className)}>
			<button
				onClick={() => setIsExpanded(!isExpanded)}
				className="flex w-full items-center justify-between text-left"
			>
				<motion.h2
					layout="position"
					className="text-xs font-semibold text-zinc-900 dark:text-white"
				>
					{group.title}
				</motion.h2>
				<ChevronIcon
					className={clsx(
						'h-4 w-4 text-zinc-500 transition-transform duration-200',
						isExpanded && 'rotate-90',
					)}
				/>
			</button>
			<AnimatePresence initial={false}>
				{isExpanded && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="relative mt-2 overflow-hidden pl-2"
					>
						<motion.div
							layout
							className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"
						/>
						<AnimatePresence initial={false}>
							{isActiveGroup && (
								<ActivePageMarker group={group} pathname={pathname} />
							)}
						</AnimatePresence>
						<ul role="list" className="border-l border-transparent">
							{group.links.map((link) => (
								<motion.li key={link.href} layout="position" className="relative">
									<NavLink href={link.href} active={link.href === pathname}>
										{link.title}
									</NavLink>
								</motion.li>
							))}
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</li>
	)
}

function NavigationDirectLink({
	link,
	className,
}: {
	link: NavDirectLink
	className?: string
}) {
	let isInsideMobileNavigation = useIsInsideMobileNavigation()
	let pathname = useInitialValue(usePathname(), isInsideMobileNavigation)
	let isActive = link.href === pathname

	return (
		<li className={clsx('relative mt-4', className)}>
			<CloseButton
				as={Link}
				href={link.href}
				className={clsx(
					'block text-xs font-semibold transition',
					isActive
						? 'text-orange-500'
						: 'text-zinc-900 hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300',
				)}
			>
				{link.title}
			</CloseButton>
		</li>
	)
}

export const navigation: Array<NavItem> = [
	{
		title: 'Installation',
		links: [
			{ title: 'Introduction', href: '/' },
			{ title: 'Install from repository', href: '/install/repo' },
			{ title: 'Install from script', href: '/install/script' },
			{ title: 'Build from source', href: '/build' },
			{ title: 'Build AppImage from source', href: '/build-appimage' },
		],
	},
	{
		title: 'Quickstart',
		links: [
			{ title: 'Hyprland Quickstart', href: '/quickstart/hyprland' },
			{ title: 'Gnome Quickstart', href: '/quickstart/gnome' },
			{ title: 'KDE Quickstart', href: '/quickstart/kde' },
			{ title: 'Cosmic Desktop Quickstart', href: '/quickstart/cosmic' },
			{ title: 'Niri Quickstart', href: '/quickstart/niri' },
			{ title: 'General Quickstart', href: '/quickstart/generic' },
		],
	},
	{ title: 'FAQ', href: '/faq' },
	{ title: 'NixOS', href: '/nixos' },

	{
		title: 'Manual',
		links: [
			{ title: 'Configuration', href: '/config' },
			{ title: 'Known Caveats', href: '/caveats' },
			{ title: 'Network and Privacy', href: '/privacy' },
			{ title: 'Launcher Window', href: '/launcher-window' },
			{ title: 'dmenu Mode', href: '/dmenu' },
			{ title: 'Clipboard Management', href: '/clipboard' },
			{ title: 'Window Management', href: '/window' },
			{ title: 'Calculator', href: '/calculator' },
			{ title: 'Application Shortcuts', href: '/shortcuts' },
			{ title: 'File Search', href: '/file-search' },
			{ title: 'Browser Extension', href: '/browser-extension' },
			{ title: 'Fallback Commands', href: '/fallback-commands' },
			{ title: 'Extensions', href: '/install-extensions' },
			{ title: 'Emoji Picker', href: '/emoji' },
			{ title: 'Deeplinks', href: '/deeplinks' },
			{ title: 'Favicon Loading', href: '/favicon' },
		],
	},
	{
		title: 'Theming',
		links: [
			{ title: 'Getting Started', href: '/theming/getting-started' },
			{ title: 'Theme Structure', href: '/theming/theme-structure' },
			{ title: 'Advanced Features', href: '/theming/advanced-features' },
			{ title: 'CLI Tools', href: '/theming/cli-tools' },
			{ title: 'Matugen integration', href: '/theming/matugen' },
		],
	},
	{
		title: 'Script Commands',
		links: [
			{ title: 'Getting Started', href: '/scripts/getting-started' },
			{ title: 'Directives', href: '/scripts/directives' },
			{ title: 'Arguments', href: '/scripts/arguments' },
			{ title: 'Output Modes', href: '/scripts/modes' },
			{ title: 'Raycast Compatibility', href: '/scripts/raycast-compatibility' },
		],
	},
	{
		title: 'Extensions',
		links: [
			{ title: 'Introduction', href: '/extensions/introduction' },
			{ title: 'Create Your First Extension', href: '/extensions/create' },
			{ title: 'File Structure', href: '/extensions/file-structure' },
			{ title: 'Manifest', href: '/extensions/manifest' },
			{ title: 'Debug Raycast Extensions', href: '/extensions/debug-raycast' },
			{
				title: 'API Reference',
				href: 'https://api-reference.vicinae.com',
			},
			{ title: 'Create a view command', href: '/extensions/view-command' },
			{
				title: 'Create a no-view command',
				href: '/extensions/no-view-command',
			},
		],
	}
]

export function Navigation(props: React.ComponentPropsWithoutRef<'nav'>) {
	return (
		<nav {...props}>
			<ul role="list">
				{navigation.map((item, index) =>
					isNavGroup(item) ? (
						<NavigationGroup
							key={item.title}
							group={item}
							className={index === 0 ? 'md:mt-0' : ''}
						/>
					) : (
						<NavigationDirectLink
							key={item.href}
							link={item}
							className={index === 0 ? 'md:mt-0' : ''}
						/>
					),
				)}
				<li className="sticky bottom-0 z-10 mt-6 min-[416px]:hidden">
					<Button href="#" variant="filled" className="w-full">
						Sign in
					</Button>
				</li>
			</ul>
		</nav>
	)
}
