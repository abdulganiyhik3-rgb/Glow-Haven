import { BrandStory } from '@/components/brand-story'
import { CategorySection } from '@/components/category-section'
import { FeaturedProducts } from '@/components/featured-products'
import { HeroSection } from '@/components/hero-section'
import { NewsletterSection } from '@/components/newsletter-section'
import { Testimonials } from '@/components/testimonials'

// The homepage is just a list of sections. Each one is its own component file.
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <BrandStory />
      <Testimonials />
      <NewsletterSection />
    </>
  )
}
