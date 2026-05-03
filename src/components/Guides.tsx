import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'

const guides = [
  {
    href: '/authentication',
    name: 'Authentication',
    description: 'Learn how to authenticate your API requests.',
  },
  {
    href: '/pagination',
    name: 'Pagination',
    description: 'Understand how to work with paginated responses.',
  },
  {
    href: '/errors',
    name: 'Errors',
    description:
      'Read about the different types of errors returned by the API.',
  },
  {
    href: '/webhooks',
    name: 'Webhooks',
    description:
      'Learn how to programmatically configure webhooks for your app.',
  },
]

export function Guides() {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="guides">
        Guides
      </Heading>
      <div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-sand-700/15 pt-10 sm:grid-cols-2 xl:grid-cols-4">
        {guides.map((guide) => (
          <div key={guide.href}>
            <h3 className="text-sm font-semibold text-white">
              {guide.name}
            </h3>
            <p className="mt-1 text-sm text-stone-400">{guide.description}</p>
            <p className="mt-4">
              <Button href={guide.href} variant="text" arrow="right">
                Read more
              </Button>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
