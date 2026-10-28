import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SafeImage } from './safe-image'

type CategoryCardProps = {
  name: string
  slug: string
  image: string
  tagline: string
}

// Clicking a card opens the shop already filtered, e.g. /shop?category=skincare
export function CategoryCard({ name, slug, image, tagline }: CategoryCardProps) {
  return (
    <Link
      href={`/shop?category=${slug}`}
      className="group relative block aspect-[3/4] overflow-hidden rounded-3xl bg-secondary"
    >
      <SafeImage
        src={image}
        alt=""
        fill
        sizes="(min-width: 1024px) 25vw, 50vw"
        className="object-cover transition duration-700 group-hover:scale-105"
      />
      {/* Dark gradient at the bottom so the white text is readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-5 text-white">
        <div>
          <h3 className="text-2xl font-semibold md:text-3xl">{name}</h3>
          <p className="text-xs tracking-wide text-white/85">{tagline}</p>
        </div>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur transition group-hover:bg-white group-hover:text-primary">
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  )
}
