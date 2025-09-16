import Image from "next/image";

export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
	return (
		<>
			<Image src="/vicinae-dark.svg" alt="logo-dark" width={40} height={40} className="h-[40px] hidden dark:block" />
			<Image src="/vicinae.svg" alt="Logo" width={40} height={40} className="h-[40px] dark:hidden fill-black" />
		</>
	);
}
