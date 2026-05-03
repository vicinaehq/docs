import glob from 'fast-glob'
import { type Metadata } from 'next'
import { Outfit } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { GeistMono } from 'geist/font/mono'

import { Layout } from '@/components/Layout'
import { type Section } from '@/components/SectionProvider'

import '@/styles/tailwind.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
})

const geistMono = GeistMono

export const metadata: Metadata = {
  title: {
    template: '%s - Vicinae Docs',
    default: 'Vicinae Documentation',
  },
  description:
    'A keyboard-driven command launcher for Linux, inspired by Raycast.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let pages = await glob('**/*.mdx', { cwd: 'src/app' })
  let allSectionsEntries = (await Promise.all(
    pages.map(async (filename) => [
      '/' + filename.replace(/(^|\/)page\.mdx$/, ''),
      (await import(`./${filename}`)).sections,
    ]),
  )) as Array<[string, Array<Section>]>
  let allSections = Object.fromEntries(allSectionsEntries)

  return (
    <html
      lang="en"
      className={`h-full dark ${outfit.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full bg-ink-900 font-sans text-stone-100 antialiased">
        <div className="w-full">
          <Layout allSections={allSections}>{children}</Layout>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
