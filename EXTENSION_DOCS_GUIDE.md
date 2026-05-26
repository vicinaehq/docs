# Extension API Documentation Guide

Rules and conventions for writing Vicinae extension API documentation pages.

## Page Structure

- Title as `# ComponentName`
- One-line description of what the component does
- Single screenshot right below the title — pick the one that best showcases the component's capabilities
- Sections for each major feature, ordered from basic to advanced
- No section for features that have their own dedicated page (e.g. ActionPanel)

## Code Examples

- For root view components (List, Grid, Detail, Form), each example is a complete `export default function Command()` — not a fragment
- For utility APIs (Clipboard, Toast, Cache, etc.), show direct usage without wrapping in a Command function, unless context requires it
- Show the minimum code to demonstrate the feature, nothing more
- Use inline/static values instead of data arrays when possible
- Stub logic with comments like `{/* filtered items */}` or `// perform API call`
- Use `{/* ... */}` to indicate more items would follow
- Only include imports that are actually used in the example
- No full sections/groups unless the example specifically demonstrates sections
- One action in the basic example is enough to show the pattern — don't duplicate ActionPanel docs

## Sections to Include / Skip

- Only give a full section to genuinely distinct features (detail panel, accessories, dropdown, etc.)
- Minor props like `isLoading` get mentioned in prose, not their own section
- Features documented elsewhere (ActionPanel, Action) get a brief inline usage, not a dedicated section
- Controlled search and similar patterns can be short — just show the relevant props

## Screenshots

- One per page, placed right below the title
- Taken from the runnable extension in `docs-screenshots/`
- Stored in `public/extensions/api/<component>/`
- Use the screenshot that shows the most features at once

## Runnable Extension (`docs-screenshots/`)

- One command per screenshottable feature (e.g. `list-basic`, `list-detail`)
- Shared static data in `src/data.ts` — fruits with emoji, color, calories, type, keywords, description
- Reuse the same data across all components (List, Grid, Detail, etc.)
- Each command is self-contained and renders the full UI for its screenshot
- Keep commands minimal — just enough to produce a good screenshot

## Content Theme

- Use fruits with emoji icons for all examples (Apple 🍎, Banana 🍌, Cherry 🍒, etc.)
- Keep it light and easy to scan — the examples are illustrative, not compilable references
- TypeScript types serve as the authoritative prop reference — don't duplicate every prop in docs
