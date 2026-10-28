import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { SafeImage } from './safe-image'

export function HeroSection() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 md:px-8 lg:grid-cols-2 lg:gap-16 lg:py-20">
      {/* Left column: text. On phones it stacks above the image. */}
      <div className="flex flex-col items-start gap-6">
        <p className="eyebrow flex items-center gap-2">
          <Sparkles className="size-3.5 text-accent" aria-hidden="true" />
          New season essentials
        </p>
        <h1 className="text-5xl font-semibold leading-[1.05] text-balance md:text-7xl">
          Your Beauty, <em className="font-medium text-primary">Your Glow.</em>
        </h1>
        <p className="max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
          Discover everyday essentials and luxurious treats designed to make you feel beautiful.
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link href="/shop" className="btn-primary">
            Shop Collection
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium tracking-wide text-foreground underline decoration-accent decoration-2 underline-offset-8 transition hover:text-primary"
          >
            Explore Our Story
          </Link>
        </div>
      </div>

      {/* Right column: campaign image with a small floating card */}
      <div className="relative">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-secondary">
          <SafeImage
            src="/images/hero.png"
            alt="Glow Haven serum, perfume and lip gloss arranged with soft pink flowers"
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute -bottom-6 left-4 rounded-2xl border border-border bg-card/95 px-5 py-4 shadow-lg backdrop-blur md:-left-8">
          <p className="font-serif text-2xl font-semibold text-primary">Clean &amp; kind</p>
          <p className="text-xs text-muted-foreground">Gentle formulas for every day</p>
        </div>
      </div>
    </section>
  )
}
