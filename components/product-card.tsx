'use client'

import { useEffect, useState } from 'react'
import { Check, Eye, ShoppingBag } from 'lucide-react'
import { useCart } from './cart-provider'
import { SafeImage } from './safe-image'
import { StarRating } from './star-rating'
import { formatNaira } from '@/lib/format'
import type { Product } from '@/lib/types'

type ProductCardProps = {
  product: Product // the product to show (passed in as a prop)
  onQuickView: (product: Product) => void // what to do when "Quick view" is clicked
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart } = useCart()
  const [justAdded, setJustAdded] = useState(false)

  // After adding, show "Added" for 1.5 seconds, then switch back.
  useEffect(() => {
    if (!justAdded) return
    const timer = setTimeout(() => setJustAdded(false), 1500)
    return () => clearTimeout(timer)
  }, [justAdded])

  function handleAddToCart() {
    addToCart(product)
    setJustAdded(true)
  }

  const isOnSale = product.previousPrice !== undefined

  return (
    <article className="group flex w-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgb(158_79_98/0.35)]">
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <SafeImage
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {isOnSale && (
          <span className="absolute left-4 top-4 rounded-full bg-card/90 px-3 py-1 text-xs font-medium text-primary">
            Sale
          </span>
        )}
        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-card/95 px-4 py-2 text-xs font-medium text-foreground shadow-sm transition hover:text-primary md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:focus-visible:translate-y-0 md:focus-visible:opacity-100"
        >
          <Eye className="size-3.5" aria-hidden="true" />
          Quick view
          <span className="sr-only">{`of ${product.name}`}</span>
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{product.category}</p>
        <h3 className="text-xl font-semibold leading-tight">
          <button type="button" onClick={() => onQuickView(product)} className="text-left hover:text-primary">
            {product.name}
          </button>
        </h3>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />

        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <p className="flex flex-col">
            <span className="text-lg font-medium text-foreground">{formatNaira(product.price)}</span>
            {isOnSale && (
              <span className="text-sm text-muted-foreground line-through">
                <span className="sr-only">Previous price: </span>
                {formatNaira(product.previousPrice!)}
              </span>
            )}
          </p>
          <button
            type="button"
            onClick={handleAddToCart}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-xs font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            {justAdded ? (
              <Check className="size-3.5" aria-hidden="true" />
            ) : (
              <ShoppingBag className="size-3.5" aria-hidden="true" />
            )}
            {justAdded ? 'Added' : 'Add to cart'}
            <span className="sr-only">{`: ${product.name}`}</span>
          </button>
        </div>
      </div>
    </article>
  )
}
