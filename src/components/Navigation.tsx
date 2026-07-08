'use client'

import clsx from 'clsx'
import { ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { useDocsModeStore } from '@/components/DocsMode'
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
	let isInsideMobileNavigation = useIsInsideMobileNavigation()
	let linkProps = {
		href,
		'aria-current': active ? ('page' as const) : undefined,
		className: clsx(
			'flex justify-between gap-2 py-1 pr-3 text-sm transition-colors duration-200',
			isAnchorLink ? 'pl-7' : 'pl-4',
			active
				? 'font-medium text-stone-100'
				: 'text-stone-500 hover:text-stone-300',
		),
	}

	if (isInsideMobileNavigation) {
		return (
			<CloseButton as={Link} {...linkProps}>
				<span className="truncate">{children}</span>
				{tag && (
					<Tag variant="small" color="zinc">
						{tag}
					</Tag>
				)}
			</CloseButton>
		)
	}

	return (
		<Link {...linkProps}>
			<span className="truncate">{children}</span>
			{tag && (
				<Tag variant="small" color="zinc">
					{tag}
				</Tag>
			)}
		</Link>
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
			className="absolute left-2 h-6 w-px bg-sand-500"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { delay: 0.2 } }}
			exit={{ opacity: 0 }}
			style={{ top }}
		/>
	)
}


function NavigationGroup({
	group,
	className,
}: {
	group: NavGroup
	className?: string
}) {
	let isInsideMobileNavigation = useIsInsideMobileNavigation()
	let pathname = useInitialValue(usePathname(), isInsideMobileNavigation)

	let isActiveGroup =
		group.links.findIndex((link) => link.href === pathname) !== -1

	let [isExpanded, setIsExpanded] = useState(isActiveGroup)

	useEffect(() => {
		if (isActiveGroup) {
			setIsExpanded(true)
		}
	}, [isActiveGroup])

	return (
		<li className={clsx('relative mt-4', className)}>
			<button
				onClick={() => setIsExpanded(!isExpanded)}
				className="flex w-full items-center justify-between text-left"
			>
				<h2 className="text-2xs font-medium tracking-wider uppercase text-stone-600">
					{group.title}
				</h2>
				<ChevronRight
					className={clsx(
						'h-3.5 w-3.5 text-stone-700 transition-transform duration-200',
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
						<div className="absolute inset-y-0 left-2 w-px bg-white/[0.04]" />
						<AnimatePresence initial={false}>
							{isActiveGroup && (
								<ActivePageMarker group={group} pathname={pathname} />
							)}
						</AnimatePresence>
						<ul role="list" className="border-l border-transparent">
							{group.links.map((link) => (
								<li key={link.href} className="relative">
									<NavLink href={link.href} active={link.href === pathname}>
										{link.title}
									</NavLink>
								</li>
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

	let linkClassName = clsx(
		'block text-2xs font-medium tracking-wider uppercase transition-colors duration-200',
		isActive ? 'text-sand-400' : 'text-stone-600 hover:text-stone-400',
	)

	return (
		<li className={clsx('relative mt-4', className)}>
			{isInsideMobileNavigation ? (
				<CloseButton as={Link} href={link.href} className={linkClassName}>
					{link.title}
				</CloseButton>
			) : (
				<Link href={link.href} className={linkClassName}>
					{link.title}
				</Link>
			)}
		</li>
	)
}

export const userNavigation: Array<NavItem> = [
	{
		title: 'Installation',
		links: [
			{ title: 'Introduction', href: '/' },
			{ title: 'Linux', href: '/install/linux' },
			{ title: 'macOS', href: '/install/macos' },
			{ title: 'Build from source (Linux)', href: '/build' },
			{ title: 'Build from source (macOS)', href: '/build-macos' },
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
			{ title: 'Global Shortcuts', href: '/global-shortcuts' },
			{ title: 'Telemetry', href: '/telemetry' },
			{ title: 'dmenu Mode', href: '/dmenu' },
			{ title: 'Snippets', href: '/snippets' },
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
			{
				title: 'Raycast Compatibility',
				href: '/scripts/raycast-compatibility',
			},
		],
	},
]

export const devNavigation: Array<NavItem> = [
	{
		title: 'Getting Started',
		links: [
			{ title: 'Introduction', href: '/extensions/introduction' },
			{ title: 'Create Your First Extension', href: '/extensions/create' },
			{ title: 'View Commands', href: '/extensions/view-command' },
			{ title: 'No-View Commands', href: '/extensions/no-view-command' },
			{ title: 'File Structure', href: '/extensions/file-structure' },
			{ title: 'Manifest', href: '/extensions/manifest' },
			{ title: 'Arguments', href: '/extensions/arguments' },
			{ title: 'Preferences', href: '/extensions/preferences' },
			{ title: 'Raycast Compatibility', href: '/extensions/raycast' },
		],
	},
	{
		title: 'User Interface',
		links: [
			{ title: 'List', href: '/extensions/api/list' },
			{ title: 'Grid', href: '/extensions/api/grid' },
			{ title: 'Detail', href: '/extensions/api/detail' },
			{ title: 'Form', href: '/extensions/api/form' },
			{ title: 'ActionPanel', href: '/extensions/api/action-panel' },
			{ title: 'Actions', href: '/extensions/api/actions' },
			{ title: 'Images', href: '/extensions/api/images' },
			{ title: 'Colors', href: '/extensions/api/colors' },
		],
	},
	{
		title: 'Navigation',
		links: [
			{ title: 'useNavigation', href: '/extensions/api/use-navigation' },
		],
	},
	{
		title: 'Feedback',
		links: [
			{ title: 'Toast', href: '/extensions/api/toast' },
			{ title: 'Alert', href: '/extensions/api/alert' },
		],
	},
	{
		title: 'System',
		links: [
			{ title: 'Clipboard', href: '/extensions/api/clipboard' },
			{ title: 'Cache', href: '/extensions/api/cache' },
			{ title: 'Local Storage', href: '/extensions/api/local-storage' },
			{ title: 'Preferences', href: '/extensions/api/preferences' },
			{ title: 'Environment', href: '/extensions/api/environment' },
			{ title: 'Keyboard', href: '/extensions/api/keyboard' },
			{ title: 'OAuth', href: '/extensions/api/oauth' },
			{ title: 'AI', href: '/extensions/api/ai' },
			{ title: 'Utilities', href: '/extensions/api/utilities' },
			{ title: 'Window Management', href: '/extensions/api/window-management' },
			{ title: 'File Search', href: '/extensions/api/file-search' },
			{ title: 'Commands', href: '/extensions/api/commands' },
		],
	},
]

export function useCurrentNavigation(): Array<NavItem> {
	let { mode } = useDocsModeStore()
	return mode === 'developer' ? devNavigation : userNavigation
}

export function Navigation(props: React.ComponentPropsWithoutRef<'nav'>) {
	let items = useCurrentNavigation()

	return (
		<nav {...props}>
			<ul role="list">
				{items.map((item, index) =>
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
			</ul>
		</nav>
	)
}
