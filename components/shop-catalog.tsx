'use client'

import { useState } from 'react'
import { Search, SearchX } from 'lucide-react'
import { ProductGrid } from './product-grid'
import { categories, products } from '@/lib/products'
import type { Category } from '@/lib/types'

type Filter = Category | 'All'
type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating'

type ShopCatalogProps = {
  initialQuery: string
  initialCategory: Filter
}

export function ShopCatalog({ initialQuery, initialCategory }: ShopCatalogProps) {
  const [query, setQuery] = useState(initialQuery)
  const [category, setCategory] = useState<Filter>(initialCategory)
  const [sort, setSort] = useState<SortOption>('featured')

  // Step 1: keep only products that match the search text AND the category.
  const search = query.trim().toLowerCase()
  const filtered = products.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category
    const matchesSearch =
      search === '' ||
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search)
    return matchesCategory && matchesSearch
  })

  // Step 2: sort a copy (".toSorted" never changes the original list).
  const visible = filtered.toSorted((a, b) => {
    if (sort === 'price-low') return a.price - b.price
    if (sort === 'price-high') return b.price - a.price
    if (sort === 'rating') return b.rating - a.rating
    return 0 // "featured" keeps the original order
  })

  const filterOptions: Filter[] = ['All', ...categories.map((c) => c.name)]

  return (
    <div className="mt-10 flex flex-col gap-8">
      <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-4 md:flex-row md:items-center md:justify-between md:p-5">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setCategory(option)}
              aria-pressed={category === option}
              className={`rounded-full px-4 py-2 text-sm transition ${
                category === option
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/70'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <label htmlFor="shop-search" className="sr-only">
              Search products
            </label>
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              id="shop-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products"
              className="w-full rounded-full border border-input bg-background py-2.5 pl-10 pr-4 text-sm sm:w-56"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="shrink-0">Sort by</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              className="w-full rounded-full border border-input bg-background px-4 py-2.5 text-sm text-foreground"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="rating">Top rated</option>
            </select>
          </label>
        </div>
      </div>

      <p role="status" className="text-sm text-muted-foreground">
        {`Showing ${visible.length} ${visible.length === 1 ? 'product' : 'products'}`}
      </p>

      {visible.length > 0 ? (
        <ProductGrid products={visible} />
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border px-6 py-16 text-center">
          <SearchX className="size-10 text-accent" aria-hidden="true" />
          <p className="font-serif text-2xl font-semibold">No products found</p>
          <p className="text-sm text-muted-foreground">Try a different search word or category.</p>
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setCategory('All')
            }}
            className="btn-outline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
