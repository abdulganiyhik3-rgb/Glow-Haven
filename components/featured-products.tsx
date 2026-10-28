import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ProductGrid } from './product-grid'
import { SectionHeading } from './section-heading'
import { products } from '@/lib/products'

export function FeaturedProducts() {
  return (
    <section id="featured" className="bg-secondary/50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Bestsellers"
            title="Featured favourites"
            description="Demo products — names, prices and ratings are sample data for this learning project."
          />
          <Link href="/shop" className="btn-outline shrink-0 self-start md:self-auto">
            View all products
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-10">
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  )
}
