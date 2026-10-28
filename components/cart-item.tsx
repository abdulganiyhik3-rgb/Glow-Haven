'use client'

import { Trash2 } from 'lucide-react'
import { MAX_QUANTITY, useCart } from './cart-provider'
import { QuantitySelector } from './quantity-selector'
import { SafeImage } from './safe-image'
import { formatNaira } from '@/lib/format'
import type { CartItem as CartItemType } from '@/lib/types'

// One row in the shopping bag.
export function CartItem({ item }: { item: CartItemType }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart()
  const { product, quantity } = item
  const lineTotal = product.price * quantity // price for this row only

  return (
    <li className="flex gap-4 py-5">
      <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-secondary">
        <SafeImage src={product.image} alt={product.name} fill sizes="96px" className="object-cover" />
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-serif text-lg font-semibold leading-tight">{product.name}</p>
            <p className="text-xs text-muted-foreground">{`${formatNaira(product.price)} each`}</p>
          </div>
          <button
            type="button"
            onClick={() => removeFromCart(product.id)}
            aria-label={`Remove ${product.name} from bag`}
            className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-secondary hover:text-destructive"
          >
            <Trash2 className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <QuantitySelector
            size="sm"
            quantity={quantity}
            label={product.name}
            max={MAX_QUANTITY}
            onDecrease={() => decreaseQuantity(product.id)}
            onIncrease={() => increaseQuantity(product.id)}
          />
          <p className="font-medium">{formatNaira(lineTotal)}</p>
        </div>
      </div>
    </li>
  )
}
