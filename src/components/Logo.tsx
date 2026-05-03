import Image from 'next/image'

export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <Image
      src="/vicinae-dark.svg"
      alt="Vicinae"
      width={40}
      height={40}
      className="h-[40px]"
    />
  )
}
