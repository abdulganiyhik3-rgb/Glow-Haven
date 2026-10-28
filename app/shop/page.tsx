import type { Metadata } from 'next'
import { ShopCatalog } from '@/components/shop-catalog'
import { getCategoryFromSlug } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Shop All — Glow Haven',
  description: 'Browse demo skincare, fragrances, lip care and body care products.',
}

type ShopPageProps = {
  searchParams: Promise<{ q?: string; category?: string }>
}

// Reads ?q=... and ?category=... from the URL, e.g. /shop?category=skincare
export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { q = '', category } = await searchParams
  const initialCategory = getCategoryFromSlug(category) ?? 'All'

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 lg:py-16">
      <div className="flex max-w-2xl flex-col gap-3">
        <p className="eyebrow">The Shop</p>
        <h1 className="text-5xl font-semibold leading-tight md:text-6xl">Find your glow</h1>
        <p className="leading-relaxed text-muted-foreground">
          All products and prices are demo data for learning. Nothing here can actually be purchased.
        </p>
      </div>
      {/* The "key" makes the catalog reset when a new search arrives from the navbar */}
      <ShopCatalog key={`${q}-${initialCategory}`} initialQuery={q} initialCategory={initialCategory} />
    </div>
  )
}
