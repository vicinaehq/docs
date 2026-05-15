import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { remark } from 'remark'
import remarkMdx from 'remark-mdx'
import { toString } from 'mdast-util-to-string'
import { visit, SKIP } from 'unist-util-visit'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const appDir = resolve(root, 'src/app')
const publicDir = resolve(root, 'public')

const SITE_URL = 'https://docs.vicinae.com'
const SITE_TITLE = 'Vicinae'
const SITE_DESCRIPTION =
  'Vicinae is a cross-desktop, keyboard-driven application launcher for Linux. It supports extensions, theming, clipboard management, and more.'

function parseNavigation() {
  const src = readFileSync(
    resolve(root, 'src/components/Navigation.tsx'),
    'utf-8',
  )
  const match = src.match(
    /export const navigation[^=]*=\s*(\[[\s\S]*?\n\])\s*$/m,
  )
  if (!match) throw new Error('Could not extract navigation array')
  return new Function(`return ${match[1]}`)()
}

function readPage(href) {
  const pagePath = href === '/' ? '' : href
  const filePath = resolve(appDir, `.${pagePath}/page.mdx`)
  try {
    return readFileSync(filePath, 'utf-8')
  } catch {
    return null
  }
}

function remarkStripMdx() {
  return (tree) => {
    visit(tree, (node, index, parent) => {
      if (
        node.type === 'mdxjsEsm' ||
        node.type === 'mdxTextExpression' ||
        node.type === 'mdxFlowExpression'
      ) {
        parent.children.splice(index, 1)
        return [SKIP, index]
      }

      if (
        node.type === 'mdxJsxFlowElement' ||
        node.type === 'mdxJsxTextElement'
      ) {
        if (node.children?.length) {
          parent.children.splice(index, 1, ...node.children)
          return [SKIP, index]
        }
        parent.children.splice(index, 1)
        return [SKIP, index]
      }
    })
  }
}

function remarkAbsoluteUrls() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        (node.type === 'link' || node.type === 'image') &&
        node.url?.startsWith('/')
      ) {
        node.url = SITE_URL + node.url
      }
    })
  }
}

const processor = remark().use(remarkMdx).use(remarkStripMdx).use(remarkAbsoluteUrls)
const parser = remark().use(remarkMdx)

async function stripMdx(content) {
  const result = await processor.process(content)
  return String(result).replace(/\n{3,}/g, '\n\n').trim()
}

async function extractDescription(content) {
  const tree = parser.parse(content)
  let foundH1 = false
  for (const node of tree.children) {
    if (node.type === 'heading' && node.depth === 1) {
      foundH1 = true
      continue
    }
    if (foundH1 && node.type === 'paragraph') {
      return toString(node).replace(/\{[^}]*\}/g, '').replace(/\s+/g, ' ').trim()
    }
  }
  return null
}

function flattenNav(nav) {
  const pages = []
  for (const item of nav) {
    if ('links' in item) {
      for (const link of item.links) {
        if (link.href.startsWith('http')) continue
        pages.push({ section: item.title, title: link.title, href: link.href })
      }
    } else {
      pages.push({ section: null, title: item.title, href: item.href })
    }
  }
  return pages
}

function mdPath(href) {
  return href === '/' ? '/index.md' : `${href}.md`
}

function generateIndex(pages) {
  const lines = [`# ${SITE_TITLE}`, '', `> ${SITE_DESCRIPTION}`, '']

  let currentSection = null
  for (const page of pages) {
    if (page.section !== currentSection) {
      currentSection = page.section
      if (currentSection) {
        lines.push('', `## ${currentSection}`, '')
      }
    }
    lines.push(`- [${page.title}](${SITE_URL}${mdPath(page.href)})`)
  }

  return lines.join('\n').replace(/\n{3,}/g, '\n\n') + '\n'
}

async function generateFull(pages) {
  const lines = [`# ${SITE_TITLE}`, '', `> ${SITE_DESCRIPTION}`, '']

  let currentSection = null
  for (const page of pages) {
    if (page.section !== currentSection) {
      currentSection = page.section
      if (currentSection) {
        lines.push(`## ${currentSection}`, '')
      }
    }

    const raw = readPage(page.href)
    if (!raw) {
      lines.push(
        `### ${page.title}`,
        '',
        `> Page not found for ${page.href}`,
        '',
      )
      continue
    }

    const content = await stripMdx(raw)
    lines.push(content, '', '---', '')
  }

  return lines.join('\n') + '\n'
}

async function generatePageMds(pages) {
  let count = 0
  for (const page of pages) {
    const raw = readPage(page.href)
    if (!raw) continue

    const content = await stripMdx(raw)
    const outPath = resolve(publicDir, mdPath(page.href).slice(1))
    mkdirSync(dirname(outPath), { recursive: true })
    writeFileSync(outPath, content + '\n')
    count++
  }
  return count
}

const nav = parseNavigation()
const pages = flattenNav(nav)

const sitemap = await Promise.all(
  pages.map(async (p) => {
    const raw = readPage(p.href)
    const description = raw ? await extractDescription(raw) : null
    return { title: p.title, url: `${SITE_URL}${p.href}`, ...(description && { description }) }
  }),
)

const sitemapXml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...pages.map(
    (p) => `  <url><loc>${SITE_URL}${p.href}</loc></url>`,
  ),
  '</urlset>',
  '',
].join('\n')

writeFileSync(resolve(publicDir, 'llms.txt'), generateIndex(pages))
writeFileSync(resolve(publicDir, 'sitemap.json'), JSON.stringify(sitemap, null, 2) + '\n')
writeFileSync(resolve(publicDir, 'sitemap.xml'), sitemapXml)
const [, mdCount] = await Promise.all([
  generateFull(pages).then((full) =>
    writeFileSync(resolve(publicDir, 'llms-full.txt'), full),
  ),
  generatePageMds(pages),
])

console.log(
  `Generated llms.txt, llms-full.txt, sitemap.json, sitemap.xml, and ${mdCount} page .md files`,
)
