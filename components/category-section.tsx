import { CategoryCard } from './category-card'
import { SectionHeading } from './section-heading'
import { categories } from '@/lib/products'

export function CategorySection() {
  return (
    <section id="collections" className="mx-auto max-w-7xl scroll-mt-32 px-4 py-16 md:px-8 lg:py-24">
      <SectionHeading eyebrow="Collections" title="Shop by category" />
      <ul className="mt-10 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
        {categories.map((category) => (
          <li key={category.slug}>
            {/* "{...category}" passes every field (name, slug, image, tagline) as props */}
            <CategoryCard {...category} />
          </li>
        ))}
      </ul>
    </section>
  )
}
