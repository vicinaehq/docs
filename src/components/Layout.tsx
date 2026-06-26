'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { DocsModeSwitch } from '@/components/DocsMode'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { DiscordLink, GithubLink } from '@/components/Header'
import { Logo } from '@/components/Logo'
import { Navigation } from '@/components/Navigation'
import { ReadingProgress } from '@/components/ReadingProgress'
import { Search } from '@/components/Search'
import { Sponsors } from '@/components/Sponsors'
import { SectionProvider, type Section } from '@/components/SectionProvider'
import { TableOfContents } from '@/components/TableOfContents'

export function Layout({
  children,
  allSections,
}: {
  children: React.ReactNode
  allSections: Record<string, Array<Section>>
}) {
  let pathname = usePathname()

  return (
    <SectionProvider sections={allSections[pathname] ?? []}>
      <div
        className="pointer-events-none fixed top-0 right-0 z-0 h-[600px] w-[600px] opacity-40"
        style={{
          background:
            'radial-gradient(circle, rgba(154,123,63,0.07) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="pointer-events-none fixed bottom-0 left-0 z-0 h-[500px] w-[500px] opacity-40"
        style={{
          background:
            'radial-gradient(circle, rgba(86,122,108,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <ReadingProgress />

      <div className="h-full lg:ml-72">
        <motion.header
          layoutScroll
          className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex"
        >
          <div className="contents lg:pointer-events-auto lg:block lg:w-72">
            <div className="hidden lg:flex lg:h-full lg:flex-col lg:overflow-y-auto lg:border-r lg:border-white/[0.06] lg:bg-ink-950 lg:px-5 lg:pt-5 lg:pb-8">
              <Link href="/" aria-label="Home">
                <Logo className="h-6" />
              </Link>
              <div className="mt-5">
                <Search />
              </div>
              <div className="mt-5">
                <DocsModeSwitch />
              </div>
              <Navigation className="hidden lg:mt-5 lg:block" />
            </div>
          </div>
          <div className="lg:hidden">
            <Header />
          </div>
        </motion.header>
        <div className="relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8 lg:pt-8 xl:mr-64">
          <main className="flex-auto">
            <Breadcrumbs />
            {children}
          </main>
          <Footer />
        </div>
        <div className="fixed top-0 right-0 z-30 hidden items-center gap-2 p-5 lg:flex">
          <GithubLink />
          <DiscordLink />
        </div>
        <aside className="fixed top-14 right-0 bottom-0 z-20 hidden w-64 flex-col overflow-hidden border-l border-white/[0.06] px-6 pt-6 pb-8 xl:flex">
          <div className="min-h-0 flex-1 overflow-y-auto">
            <TableOfContents />
          </div>
          <Sponsors />
        </aside>
      </div>
    </SectionProvider>
  )
}
