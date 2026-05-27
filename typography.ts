import { type Config } from 'tailwindcss'

export default {
  theme: {
    typography: ({ theme }) => ({
      DEFAULT: {
        css: {
          '--tw-prose-body': theme('colors.stone.100'),
          '--tw-prose-headings': 'white',
          '--tw-prose-links': theme('colors.sand.400'),
          '--tw-prose-links-hover': theme('colors.sand.200'),
          '--tw-prose-links-underline': 'transparent',
          '--tw-prose-bold': 'white',
          '--tw-prose-counters': theme('colors.stone.400'),
          '--tw-prose-bullets': theme('colors.stone.500'),
          '--tw-prose-hr': theme('colors.sand.700 / 0.2'),
          '--tw-prose-quotes': theme('colors.stone.200'),
          '--tw-prose-quote-borders': theme('colors.sand.500 / 0.3'),
          '--tw-prose-captions': theme('colors.stone.500'),
          '--tw-prose-code': theme('colors.sage.300'),
          '--tw-prose-code-bg': theme('colors.ink.800 / 0.6'),
          '--tw-prose-code-ring': theme('colors.sand.700 / 0.2'),
          '--tw-prose-th-borders': theme('colors.sand.700 / 0.25'),
          '--tw-prose-td-borders': theme('colors.sand.700 / 0.15'),

          color: 'var(--tw-prose-body)',
          fontSize: theme('fontSize.base')[0],
          lineHeight: theme('lineHeight.7'),

          p: {
            marginTop: theme('spacing.6'),
            marginBottom: theme('spacing.6'),
          },
          '[class~="lead"]': {
            fontSize: theme('fontSize.base')[0],
            ...theme('fontSize.base')[1],
          },

          ol: {
            listStyleType: 'decimal',
            marginTop: theme('spacing.5'),
            marginBottom: theme('spacing.5'),
            paddingLeft: '1.625rem',
          },
          'ol[type="A"]': { listStyleType: 'upper-alpha' },
          'ol[type="a"]': { listStyleType: 'lower-alpha' },
          'ol[type="A" s]': { listStyleType: 'upper-alpha' },
          'ol[type="a" s]': { listStyleType: 'lower-alpha' },
          'ol[type="I"]': { listStyleType: 'upper-roman' },
          'ol[type="i"]': { listStyleType: 'lower-roman' },
          'ol[type="I" s]': { listStyleType: 'upper-roman' },
          'ol[type="i" s]': { listStyleType: 'lower-roman' },
          'ol[type="1"]': { listStyleType: 'decimal' },
          ul: {
            listStyleType: 'disc',
            marginTop: theme('spacing.5'),
            marginBottom: theme('spacing.5'),
            paddingLeft: '1.625rem',
          },
          li: {
            marginTop: theme('spacing.2'),
            marginBottom: theme('spacing.2'),
          },
          ':is(ol, ul) > li': {
            paddingLeft: theme('spacing[1.5]'),
          },
          'ol > li::marker': {
            fontWeight: '400',
            color: 'var(--tw-prose-counters)',
          },
          'ul > li::marker': {
            color: 'var(--tw-prose-bullets)',
          },
          '> ul > li p': {
            marginTop: theme('spacing.3'),
            marginBottom: theme('spacing.3'),
          },
          '> ul > li > *:first-child': { marginTop: theme('spacing.5') },
          '> ul > li > *:last-child': { marginBottom: theme('spacing.5') },
          '> ol > li > *:first-child': { marginTop: theme('spacing.5') },
          '> ol > li > *:last-child': { marginBottom: theme('spacing.5') },
          'ul ul, ul ol, ol ul, ol ol': {
            marginTop: theme('spacing.3'),
            marginBottom: theme('spacing.3'),
          },

          hr: {
            borderColor: 'var(--tw-prose-hr)',
            borderTopWidth: 1,
            marginTop: theme('spacing.16'),
            marginBottom: theme('spacing.16'),
            maxWidth: 'none',
            marginLeft: `calc(-1 * ${theme('spacing.4')})`,
            marginRight: `calc(-1 * ${theme('spacing.4')})`,
            '@media (min-width: 640px)': {
              marginLeft: `calc(-1 * ${theme('spacing.6')})`,
              marginRight: `calc(-1 * ${theme('spacing.6')})`,
            },
            '@media (min-width: 1024px)': {
              marginLeft: `calc(-1 * ${theme('spacing.8')})`,
              marginRight: `calc(-1 * ${theme('spacing.8')})`,
            },
          },

          blockquote: {
            fontWeight: '500',
            fontStyle: 'italic',
            color: 'var(--tw-prose-quotes)',
            borderLeftWidth: '0.25rem',
            borderLeftColor: 'var(--tw-prose-quote-borders)',
            quotes: '"\\201C""\\201D""\\2018""\\2019"',
            marginTop: theme('spacing.8'),
            marginBottom: theme('spacing.8'),
            paddingLeft: theme('spacing.5'),
          },
          'blockquote p:first-of-type::before': { content: 'open-quote' },
          'blockquote p:last-of-type::after': { content: 'close-quote' },

          h1: {
            color: 'var(--tw-prose-headings)',
            fontWeight: '700',
            fontSize: theme('fontSize.2xl')[0],
            ...theme('fontSize.2xl')[1],
            marginBottom: theme('spacing.2'),
          },
          h2: {
            color: 'var(--tw-prose-headings)',
            fontWeight: '600',
            fontSize: theme('fontSize.lg')[0],
            ...theme('fontSize.lg')[1],
            marginTop: theme('spacing.16'),
            marginBottom: theme('spacing.2'),
          },
          h3: {
            color: 'var(--tw-prose-headings)',
            fontSize: theme('fontSize.base')[0],
            ...theme('fontSize.base')[1],
            fontWeight: '600',
            marginTop: theme('spacing.10'),
            marginBottom: theme('spacing.2'),
          },

          'img, video, figure': {
            marginTop: theme('spacing.8'),
            marginBottom: theme('spacing.8'),
          },
          'figure > *': { marginTop: '0', marginBottom: '0' },
          figcaption: {
            color: 'var(--tw-prose-captions)',
            fontSize: theme('fontSize.xs')[0],
            ...theme('fontSize.xs')[1],
            marginTop: theme('spacing.2'),
          },

          table: {
            width: '100%',
            tableLayout: 'auto',
            textAlign: 'left',
            marginTop: theme('spacing.8'),
            marginBottom: theme('spacing.8'),
            lineHeight: theme('lineHeight.6'),
            fontSize: theme('fontSize.sm')[0],
            borderCollapse: 'separate',
            borderSpacing: '0',
            border: `1px solid ${theme('colors.white / 0.07')}`,
            borderRadius: theme('borderRadius.xl'),
            overflow: 'hidden',
          },
          thead: {
            backgroundColor: theme('colors.white / 0.04'),
          },
          'thead th': {
            color: theme('colors.stone.400'),
            fontWeight: '500',
            fontSize: theme('fontSize.xs')[0],
            letterSpacing: '0.025em',
            textTransform: 'uppercase',
            verticalAlign: 'bottom',
            paddingTop: theme('spacing[2.5]'),
            paddingRight: theme('spacing.4'),
            paddingBottom: theme('spacing[2.5]'),
            paddingLeft: theme('spacing.4'),
            borderBottom: `1px solid ${theme('colors.white / 0.07')}`,
          },
          'thead th:first-child': { paddingLeft: theme('spacing.5') },
          'thead th:last-child': { paddingRight: theme('spacing.5') },
          'tbody tr': {
            borderBottomWidth: '0',
            transition: 'background-color 150ms ease',
          },
          'tbody tr:hover': {
            backgroundColor: theme('colors.white / 0.02'),
          },
          'tbody tr:not(:last-child) td': {
            borderBottom: `1px solid ${theme('colors.white / 0.04')}`,
          },
          'tbody td': { verticalAlign: 'baseline' },
          tfoot: {
            borderTopWidth: '1px',
            borderTopColor: 'var(--tw-prose-th-borders)',
          },
          'tfoot td': { verticalAlign: 'top' },
          ':is(tbody, tfoot) td': {
            paddingTop: theme('spacing.3'),
            paddingRight: theme('spacing.4'),
            paddingBottom: theme('spacing.3'),
            paddingLeft: theme('spacing.4'),
          },
          ':is(tbody, tfoot) td:first-child': { paddingLeft: theme('spacing.5') },
          ':is(tbody, tfoot) td:last-child': { paddingRight: theme('spacing.5') },

          a: {
            color: 'var(--tw-prose-links)',
            textDecoration: 'none',
            fontWeight: '500',
            transitionProperty: 'color',
            transitionDuration: '200ms',
            transitionTimingFunction: 'ease',
            '&:hover': {
              color: 'var(--tw-prose-links-hover)',
            },
          },
          ':is(h1, h2, h3) a': { fontWeight: 'inherit' },
          strong: {
            color: 'var(--tw-prose-bold)',
            fontWeight: '600',
          },
          ':is(a, blockquote, thead th) strong': { color: 'inherit' },
          code: {
            color: 'var(--tw-prose-code)',
            borderRadius: theme('borderRadius.lg'),
            paddingTop: theme('padding.1'),
            paddingRight: theme('padding[1.5]'),
            paddingBottom: theme('padding.1'),
            paddingLeft: theme('padding[1.5]'),
            boxShadow: 'inset 0 0 0 1px var(--tw-prose-code-ring)',
            backgroundColor: 'var(--tw-prose-code-bg)',
            fontSize: theme('fontSize.xs')[0],
          },
          ':is(a, h1, h2, h3, blockquote, thead th) code': {
            color: 'inherit',
          },
          'h2 code': {
            fontSize: theme('fontSize.base')[0],
            fontWeight: 'inherit',
          },
          'h3 code': {
            fontSize: theme('fontSize.sm')[0],
            fontWeight: 'inherit',
          },

          ':is(h1, h2, h3) + *': { marginTop: '0' },
          '> :first-child': { marginTop: '0 !important' },
          '> :last-child': { marginBottom: '0 !important' },
        },
      },
    }),
  },
} satisfies Config
