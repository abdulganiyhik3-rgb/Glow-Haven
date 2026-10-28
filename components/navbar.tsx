'use client'

import Form from 'next/form'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useCart } from './cart-provider'
import { Logo } from './logo'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/#collections' },
  { label: 'About Us', href: '/#about' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const { totalItems, openCart } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <p className="bg-secondary px-4 py-2 text-center text-xs tracking-wide text-secondary-foreground">
        Demo store for learning — no real orders or payments are processed.
      </p>

      <nav aria-label="Main" className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8">
        <Logo />

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link href={link.href} className="text-sm tracking-wide text-foreground/80 transition hover:text-primary">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <SearchForm className="hidden md:flex" />

          <button
            type="button"
            onClick={openCart}
            className="relative flex size-11 items-center justify-center rounded-full text-foreground transition hover:bg-secondary hover:text-primary"
            aria-label={`Open shopping bag, ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}
          >
            <ShoppingBag className="size-5" aria-hidden="true" />
            {totalItems > 0 && (
              <span className="absolute right-0.5 top-0.5 flex min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[0.65rem] font-medium leading-5 text-primary-foreground">
                {totalItems}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex size-11 items-center justify-center rounded-full text-foreground transition hover:bg-secondary lg:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu: only rendered when isMenuOpen is true */}
      {isMenuOpen && (
        <div id="mobile-menu" className="border-t border-border bg-background px-4 pb-6 pt-4 lg:hidden">
          <SearchForm className="mb-4 flex md:hidden" onSubmit={() => setIsMenuOpen(false)} />
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-xl px-3 py-3 font-serif text-xl text-foreground transition hover:bg-secondary hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}

// A search form that sends the user to /shop?q=whatever-they-typed
function SearchForm({ className, onSubmit }: { className?: string; onSubmit?: () => void }) {
  return (
    <Form action="/shop" role="search" onSubmit={onSubmit} className={`items-center ${className ?? ''}`}>
      <label htmlFor={onSubmit ? 'mobile-search' : 'desktop-search'} className="sr-only">
        Search products
      </label>
      <div className="relative w-full">
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          id={onSubmit ? 'mobile-search' : 'desktop-search'}
          name="q"
          type="search"
          placeholder="Search products"
          className="w-full rounded-full border border-input bg-card py-2.5 pl-10 pr-4 text-sm placeholder:text-muted-foreground/70 md:w-52"
        />
      </div>
    </Form>
  )
}
