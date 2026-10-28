'use client'

import { useState } from 'react'
import { ProductCard } from './product-card'
import { ProductDetails } from './product-details'
import type { Product } from '@/lib/types'

// Shows a list of products in a responsive grid:
// 1 column on phones, 2 on tablets, 4 on large screens.
export function ProductGrid({ products }: { products: Product[] }) {
  // Which product is open in the details popup (null = none).
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <li key={product.id} className="flex">
            <ProductCard product={product} onQuickView={setSelectedProduct} />
          </li>
        ))}
      </ul>
      <ProductDetails product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  )
}
