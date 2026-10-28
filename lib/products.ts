import type { Category, Product } from './types'

// DEMO DATA: these products, prices and ratings are made up for learning purposes.
// Try adding your own product to this list — it will appear in the shop automatically!
export const products: Product[] = [
  {
    id: 'rose-glow-serum',
    name: 'Rose Glow Serum',
    category: 'Skincare',
    price: 18500,
    previousPrice: 22000,
    rating: 4.8,
    reviewCount: 124,
    image: '/images/products/rose-glow-serum.png',
    description:
      'A lightweight serum with rosehip oil and vitamin C that helps skin look brighter and more even. Apply 2–3 drops each morning before moisturiser.',
  },
  {
    id: 'silk-moisturizer',
    name: 'Silk Cloud Moisturiser',
    category: 'Skincare',
    price: 15000,
    rating: 4.6,
    reviewCount: 89,
    image: '/images/products/silk-moisturizer.png',
    description:
      'A whipped, fast-absorbing cream with shea and hyaluronic acid for soft, hydrated skin that never feels greasy.',
  },
  {
    id: 'velvet-bloom-perfume',
    name: 'Velvet Bloom Eau de Parfum',
    category: 'Fragrances',
    price: 42000,
    rating: 4.9,
    reviewCount: 203,
    image: '/images/products/velvet-bloom-perfume.png',
    description:
      'A soft floral scent of peony, pink pepper and white musk. Romantic, fresh and long-lasting from day to evening.',
  },
  {
    id: 'amber-dusk-perfume',
    name: 'Amber Dusk Eau de Parfum',
    category: 'Fragrances',
    price: 38500,
    previousPrice: 45000,
    rating: 4.7,
    reviewCount: 96,
    image: '/images/products/amber-dusk-perfume.png',
    description:
      'A warm, cosy fragrance with notes of amber, vanilla and sandalwood. Perfect for evenings and special occasions.',
  },
  {
    id: 'petal-lip-gloss',
    name: 'Petal Shine Lip Gloss',
    category: 'Lip Care',
    price: 6500,
    rating: 4.5,
    reviewCount: 312,
    image: '/images/products/petal-lip-gloss.png',
    description:
      'A non-sticky gloss with a sheer rosy tint and a delicate shimmer. Enriched with jojoba oil to keep lips comfortable.',
  },
  {
    id: 'honey-lip-balm',
    name: 'Honey Melt Lip Balm',
    category: 'Lip Care',
    price: 4500,
    previousPrice: 5500,
    rating: 4.4,
    reviewCount: 178,
    image: '/images/products/honey-lip-balm.png',
    description:
      'A rich overnight balm made with honey and cocoa butter to soothe dry, chapped lips by morning.',
  },
  {
    id: 'golden-body-oil',
    name: 'Golden Hour Body Oil',
    category: 'Body Care',
    price: 21000,
    rating: 4.8,
    reviewCount: 145,
    image: '/images/products/golden-body-oil.png',
    description:
      'A shimmering dry oil that leaves skin glowing and lightly scented. Smooth over damp skin after your shower.',
  },
  {
    id: 'shea-body-butter',
    name: 'Rose Shea Body Butter',
    category: 'Body Care',
    price: 12500,
    rating: 4.6,
    reviewCount: 110,
    image: '/images/products/shea-body-butter.png',
    description:
      'A thick, whipped body butter with raw shea and rose extract for deeply nourished, soft skin all day long.',
  },
]

// Category cards on the homepage. "slug" is the URL-friendly version of the name.
export const categories: { name: Category; slug: string; image: string; tagline: string }[] = [
  { name: 'Skincare', slug: 'skincare', image: '/images/category-skincare.png', tagline: 'Serums & creams' },
  { name: 'Fragrances', slug: 'fragrances', image: '/images/category-fragrances.png', tagline: 'Signature scents' },
  { name: 'Lip Care', slug: 'lip-care', image: '/images/category-lip-care.png', tagline: 'Glosses & balms' },
  { name: 'Body Care', slug: 'body-care', image: '/images/category-body-care.png', tagline: 'Oils & butters' },
]

// Turns "lip-care" from the URL back into "Lip Care". Returns undefined if not found.
export function getCategoryFromSlug(slug: string | undefined): Category | undefined {
  return categories.find((category) => category.slug === slug)?.name
}
