import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import { CartProvider } from '@/components/cart-provider'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { ShoppingCart } from '@/components/shopping-cart'
import './globals.css'

// Two fonts: an elegant serif for headings, a clean sans-serif for body text.
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
})
const jost = Jost({ subsets: ['latin'], variable: '--font-jost' })

export const metadata: Metadata = {
  title: 'Glow Haven — Luxury Beauty, Skincare & Fragrance',
  description:
    'Discover everyday essentials and luxurious treats designed to make you feel beautiful. A demo beauty store built for learning.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#fbf7f3',
}

// The layout wraps EVERY page. Because CartProvider sits here, the
// navbar, the shop and the checkout all share the same cart.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} bg-background`}>
      <body className="antialiased">
        <CartProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-card focus:px-4 focus:py-2"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <ShoppingCart />
        </CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
