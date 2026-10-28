'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { products } from '@/lib/products'
import type { CartItem, Product } from '@/lib/types'

const STORAGE_KEY = 'glow-haven-cart'
const MAX_QUANTITY = 10

// Everything other components can read or call from the cart.
type CartContextValue = {
  items: CartItem[]
  hasLoaded: boolean // false until the saved cart has been read from localStorage
  totalItems: number
  subtotal: number
  addToCart: (product: Product, quantity?: number) => void
  increaseQuantity: (productId: string) => void
  decreaseQuantity: (productId: string) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

// We only save { id, quantity } in localStorage, not the whole product.
// That way, if a price changes in products.ts, the cart always uses the latest price.
type StoredCartItem = { id: string; quantity: number }

function loadCartFromStorage(): CartItem[] {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) return []

    const parsed: unknown = JSON.parse(saved)
    if (!Array.isArray(parsed)) return []

    const cart: CartItem[] = []
    for (const entry of parsed as StoredCartItem[]) {
      const product = products.find((p) => p.id === entry?.id)
      const quantity = Number(entry?.quantity)
      // Skip anything broken: unknown products or silly quantities.
      if (product && Number.isInteger(quantity) && quantity > 0) {
        cart.push({ product, quantity: Math.min(quantity, MAX_QUANTITY) })
      }
    }
    return cart
  } catch {
    // localStorage can be blocked (private mode) or contain invalid JSON.
    return []
  }
}

function saveCartToStorage(items: CartItem[]) {
  try {
    const simplified: StoredCartItem[] = items.map((item) => ({
      id: item.product.id,
      quantity: item.quantity,
    }))
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(simplified))
  } catch {
    // If saving fails, the cart still works — it just won't survive a refresh.
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [hasLoaded, setHasLoaded] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  // 1. When the page first opens in the browser, load the saved cart.
  useEffect(() => {
    setItems(loadCartFromStorage())
    setHasLoaded(true)
  }, [])

  // 2. Every time the cart changes, save it. We wait until it has loaded,
  //    otherwise we would overwrite the saved cart with an empty one.
  useEffect(() => {
    if (hasLoaded) saveCartToStorage(items)
  }, [items, hasLoaded])

  function addToCart(product: Product, quantity = 1) {
    setItems((currentItems) => {
      const existing = currentItems.find((item) => item.product.id === product.id)
      if (existing) {
        // Already in the cart: just add to its quantity.
        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, MAX_QUANTITY) }
            : item,
        )
      }
      // New product: add a new line to the cart.
      return [...currentItems, { product, quantity: Math.min(quantity, MAX_QUANTITY) }]
    })
  }

  function increaseQuantity(productId: string) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY) }
          : item,
      ),
    )
  }

  function decreaseQuantity(productId: string) {
    // Math.max(..., 1) stops the quantity going to 0 or below.
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item,
      ),
    )
  }

  function removeFromCart(productId: string) {
    setItems((currentItems) => currentItems.filter((item) => item.product.id !== productId))
  }

  function clearCart() {
    setItems([])
  }

  // These are calculated from the items every render, never hardcoded.
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        hasLoaded,
        items,
        totalItems,
        subtotal,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// A small helper so components can write `const { items } = useCart()`.
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used inside <CartProvider>')
  }
  return context
}

export { MAX_QUANTITY }
