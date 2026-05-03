import { GridPattern } from '@/components/GridPattern'

export function HeroPattern() {
  return (
    <div className="absolute inset-0 -z-10 mx-0 max-w-none overflow-hidden">
      <div className="absolute top-0 left-1/2 ml-[-38rem] h-100 w-325 mask-[linear-gradient(white,transparent)]">
        <div className="absolute inset-0 bg-linear-to-r from-[#36b49f]/30 to-[#DBFF75]/30 opacity-100 mask-[radial-gradient(farthest-side_at_top,white,transparent)]">
          <GridPattern
            width={72}
            height={56}
            x={-12}
            y={4}
            squares={[
              [4, 3],
              [2, 1],
              [7, 3],
              [10, 6],
            ]}
            className="absolute inset-x-0 inset-y-[-50%] h-[200%] w-full skew-y-[-18deg] fill-white/2.5 stroke-white/5 mix-blend-overlay"
          />
        </div>
      </div>
    </div>
  )
}
