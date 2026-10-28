import { Feather, Heart, Leaf } from 'lucide-react'
import { SafeImage } from './safe-image'

const values = [
  { icon: Heart, title: 'Self-care first', text: 'Small rituals that make every day feel special.' },
  { icon: Feather, title: 'Confidence', text: 'Beauty that celebrates you, exactly as you are.' },
  { icon: Leaf, title: 'Everyday gentle', text: 'Thoughtful formulas kind enough for daily use.' },
]

export function BrandStory() {
  return (
    <section id="about" className="mx-auto grid max-w-7xl scroll-mt-32 items-center gap-12 px-4 py-16 md:px-8 lg:grid-cols-2 lg:gap-20 lg:py-24">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-secondary lg:order-last">
        <SafeImage
          src="/images/brand-story.png"
          alt="A calm vanity table with Glow Haven products, a mirror and fresh flowers"
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-6">
        <p className="eyebrow">About Glow Haven</p>
        <h2 className="text-4xl font-semibold leading-tight text-balance md:text-5xl">
          Beauty that feels like a moment just for you
        </h2>
        <p className="leading-relaxed text-muted-foreground text-pretty">
          Glow Haven began with a simple idea: looking after yourself should feel joyful, not complicated. We gather
          everyday essentials and little luxuries — silky serums, soft scents, glossy lips — so your routine becomes a
          ritual that leaves you feeling confident and cared for.
        </p>
        <ul className="mt-2 grid gap-6 sm:grid-cols-3">
          {values.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex flex-col gap-2">
              <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <p className="font-serif text-xl font-semibold">{title}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
