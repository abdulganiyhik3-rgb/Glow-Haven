import type { Metadata } from 'next'
import { CheckoutForm } from '@/components/checkout-form'

export const metadata: Metadata = {
  title: 'Demo Checkout — Glow Haven',
  description: 'A practice checkout. No payment is taken and no order is placed.',
}

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 lg:py-16">
      <div className="mb-8 flex flex-col gap-3">
        <p className="eyebrow">Demo checkout</p>
        <h1 className="text-5xl font-semibold leading-tight">Almost glowing</h1>
        <p className="max-w-xl rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-foreground">
          This is a practice checkout. No payment is collected and no real order is placed — please don&apos;t enter
          card details anywhere on this site.
        </p>
      </div>
      <CheckoutForm />
    </div>
  )
}
