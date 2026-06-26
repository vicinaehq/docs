import Image from 'next/image'

interface Sponsor {
	name: string
	href: string
	src: string
	width: number
	height: number
}

interface SponsorTier {
	tier: 'gold' | 'silver'
	/** Logo height for this tier — higher tiers get slightly larger logos. */
	logoHeight: string
	sponsors: Array<Sponsor>
}

const sponsorTiers: Array<SponsorTier> = [
	{
		tier: 'gold',
		logoHeight: 'h-6',
		sponsors: [
			{
				name: 'Depot',
				href: 'https://depot.dev/?utm_source=vicinae&utm_medium=docs',
				src: '/brands/depot.svg',
				width: 256,
				height: 64,
			},
		],
	},
	{
		tier: 'silver',
		logoHeight: 'h-4',
		sponsors: [
			{
				name: 'CodeRabbit',
				href: 'https://coderabbit.link/vicinaehq',
				src: '/brands/coderabbit.svg',
				width: 2152,
				height: 313,
			},
		],
	},
]

export function Sponsors() {
	return (
		<div className="shrink-0 border-t border-white/[0.06] pt-5">
			<h2 className="text-2xs font-medium tracking-wider uppercase text-stone-600">
				Our Sponsors
			</h2>
			<ul role="list" className="mt-4 space-y-4">
				{sponsorTiers.flatMap((tier) =>
					tier.sponsors.map((sponsor) => (
						<li key={sponsor.name}>
							<a
								href={sponsor.href}
								target="_blank"
								rel="noreferrer noopener sponsored"
								aria-label={sponsor.name}
								className="flex"
							>
								<Image
									src={sponsor.src}
									alt={sponsor.name}
									width={sponsor.width}
									height={sponsor.height}
									className={`${tier.logoHeight} w-auto`}
								/>
							</a>
						</li>
					)),
				)}
			</ul>
		</div>
	)
}
