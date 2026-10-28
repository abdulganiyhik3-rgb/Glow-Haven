'use client'

import Link from 'next/link'
import { ShoppingBag, X } from 'lucide-react'
import { CartItem } from './cart-item'
import { useCart } from './cart-provider'
import { Modal } from './modal'
import { formatNaira } from '@/lib/format'

// The slide-in shopping bag drawer.
export function ShoppingCart() {
  const { items, totalItems, subtotal, isCartOpen, closeCart } = useCart()

  return (
    <Modal
      open={isCartOpen}
      onClose={closeCart}
      labelledBy="cart-title"
      className="m-0 ml-auto h-dvh max-h-none w-full max-w-md"
    >
      <div className="flex h-full flex-col bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 id="cart-title" className="text-2xl font-semibold">
            {`Your Bag (${totalItems})`}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close shopping bag"
            className="flex size-10 items-center justify-center rounded-full transition hover:bg-secondary hover:text-primary"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        {items.length === 0 ? (
          // Empty state
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="flex size-20 items-center justify-center rounded-full bg-secondary text-primary">
              <ShoppingBag className="size-8" aria-hidden="true" />
            </span>
            <p className="font-serif text-2xl font-semibold">Your bag is empty</p>
            <p className="text-sm text-muted-foreground">
              Treat yourself — discover serums, scents and glosses made to help you glow.
            </p>
            <Link href="/shop" onClick={closeCart} className="btn-primary mt-2">
              Start shopping
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-6">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </ul>

            <div className="flex flex-col gap-4 border-t border-border bg-background px-6 py-6">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-lg font-medium">{formatNaira(subtotal)}</span>
              </div>
              <p className="text-xs text-muted-foreground">Delivery is calculated at the demo checkout.</p>
              <Link href="/checkout" onClick={closeCart} className="btn-primary w-full">
                Go to demo checkout
              </Link>
              <button type="button" onClick={closeCart} className="btn-outline w-full">
                Continue shopping
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}
