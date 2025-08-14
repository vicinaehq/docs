export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
	return (
		<>
			<img src="/vicinae-dark.svg" className="h-[40px] hidden dark:block" />
			<img src="/vicinae.svg" className="h-[40px] dark:hidden fill-black" />
		</>
	);
}
