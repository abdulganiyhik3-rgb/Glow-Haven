'use client'

import { useState } from 'react'
import { ArrowLeft, ShoppingBag, X } from 'lucide-react'
import { MAX_QUANTITY, useCart } from './cart-provider'
import { Modal } from './modal'
import { QuantitySelector } from './quantity-selector'
import { SafeImage } from './safe-image'
import { StarRating } from './star-rating'
import { formatNaira } from '@/lib/format'
import type { Product } from '@/lib/types'

type ProductDetailsProps = {
  product: Product | null // null means "no product is open"
  onClose: () => void
}

export function ProductDetails({ product, onClose }: ProductDetailsProps) {
  return (
    <Modal
      open={product !== null}
      onClose={onClose}
      labelledBy="product-details-title"
      className="m-auto w-[min(56rem,calc(100%-2rem))] max-h-[calc(100dvh-2rem)]"
    >
      {/* "key" resets the quantity back to 1 whenever a different product opens */}
      {product && <ProductDetailsContent key={product.id} product={product} onClose={onClose} />}
    </Modal>
  )
}

function ProductDetailsContent({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addToCart, openCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  function handleAddToCart() {
    addToCart(product, quantity)
    onClose()
    openCart()
  }

  return (
    <div className="relative grid overflow-hidden rounded-3xl bg-card md:grid-cols-2">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close product details"
        className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-card/90 text-foreground shadow-sm transition hover:text-primary"
      >
        <X className="size-4" aria-hidden="true" />
      </button>

      <div className="relative aspect-square bg-secondary md:aspect-auto md:min-h-[32rem]">
        <SafeImage
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 768px) 28rem, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-5 p-6 md:p-10">
        <p className="eyebrow">{product.category}</p>
        <h2 id="product-details-title" className="text-4xl font-semibold leading-tight text-balance">
          {product.name}
        </h2>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />

        <p className="flex items-baseline gap-3">
          <span className="text-2xl font-medium">{formatNaira(product.price)}</span>
          {product.previousPrice && (
            <span className="text-muted-foreground line-through">
              <span className="sr-only">Previous price: </span>
              {formatNaira(product.previousPrice)}
            </span>
          )}
        </p>

        <p className="leading-relaxed text-muted-foreground text-pretty">{product.description}</p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <QuantitySelector
            quantity={quantity}
            label={product.name}
            max={MAX_QUANTITY}
            onDecrease={() => setQuantity((q) => Math.max(q - 1, 1))}
            onIncrease={() => setQuantity((q) => Math.min(q + 1, MAX_QUANTITY))}
          />
          <button type="button" onClick={handleAddToCart} className="btn-primary flex-1">
            <ShoppingBag className="size-4" aria-hidden="true" />
            {`Add to cart — ${formatNaira(product.price * quantity)}`}
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-auto inline-flex items-center gap-2 self-start text-sm text-muted-foreground transition hover:text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to shop
        </button>

        <p className="text-xs text-muted-foreground">
          Demo product — details, prices and ratings are sample data for learning.
        </p>
      </div>
    </div>
  )
}
