export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
	return (
		<>
			<img src="/banner-light.png" className="h-[40px] hidden dark:block" />
			<img src="/banner-dark.png" className="h-[40px] dark:hidden" />
		</>
	);
}
