'use client'

import Link from 'next/link'
import { useState } from 'react'
import { CheckCircle2, ShoppingBag } from 'lucide-react'
import { useCart } from './cart-provider'
import { OrderSummary } from './order-summary'
import { isValidEmail, isValidNigerianPhone } from '@/lib/validation'

type FormValues = {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  delivery: 'lagos' | 'nationwide'
}
type FormErrors = Partial<Record<keyof FormValues, string>>

const emptyForm: FormValues = { fullName: '', email: '', phone: '', address: '', city: '', delivery: 'lagos' }

// Sample delivery fees (demo values). Orders of ₦50,000+ ship free.
export const DELIVERY_FEES = { lagos: 2500, nationwide: 4500 } as const
export const FREE_DELIVERY_FROM = 50000

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  if (values.fullName.trim().length < 2) errors.fullName = 'Please enter your full name.'
  if (!isValidEmail(values.email)) errors.email = 'Please enter a valid email, e.g. name@example.com.'
  if (!isValidNigerianPhone(values.phone)) errors.phone = 'Please enter a Nigerian number, e.g. 08012345678.'
  if (values.address.trim().length < 5) errors.address = 'Please enter your delivery address.'
  if (values.city.trim().length < 2) errors.city = 'Please enter your city.'
  return errors
}

export function CheckoutForm() {
  const { items, hasLoaded, subtotal, clearCart } = useCart()
  const [values, setValues] = useState<FormValues>(emptyForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [orderNumber, setOrderNumber] = useState<string | null>(null)

  const deliveryFee = subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEES[values.delivery]

  // One function updates whichever field changed, using the input's "name".
  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined })) // clear that field's error while typing
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const newErrors = validate(values)
    setErrors(newErrors)

    const firstError = Object.keys(newErrors)[0]
    if (firstError) {
      document.getElementById(`checkout-${firstError}`)?.focus()
      return
    }

    // Pretend the order went through.
    setOrderNumber(`GH-DEMO-${Math.floor(100000 + Math.random() * 900000)}`)
    clearCart()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (orderNumber) {
    return (
      <div role="status" className="flex flex-col items-center gap-4 rounded-[2rem] border border-border bg-card px-6 py-16 text-center">
        <CheckCircle2 className="size-14 text-primary" aria-hidden="true" />
        <h2 className="text-4xl font-semibold">Thank you, {values.fullName.split(' ')[0]}!</h2>
        <p className="max-w-md text-muted-foreground">
          {`Your demo order ${orderNumber} was "placed". Remember: this is practice only — nothing was charged and nothing will be shipped.`}
        </p>
        <Link href="/shop" className="btn-primary mt-2">
          Keep browsing
        </Link>
      </div>
    )
  }

  if (!hasLoaded) {
    return <div className="h-96 animate-pulse rounded-[2rem] bg-secondary/60" aria-label="Loading your bag" />
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-[2rem] border border-dashed border-border px-6 py-16 text-center">
        <ShoppingBag className="size-10 text-accent" aria-hidden="true" />
        <h2 className="text-3xl font-semibold">Your bag is empty</h2>
        <p className="text-muted-foreground">Add a few favourites before heading to checkout.</p>
        <Link href="/shop" className="btn-primary mt-2">
          Go to the shop
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-start">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6 rounded-[2rem] border border-border bg-card p-6 md:p-8">
        <h2 className="text-3xl font-semibold">Delivery details</h2>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Full name" name="fullName" autoComplete="name" value={values.fullName} error={errors.fullName} onChange={handleChange} />
          <Field label="Email" name="email" type="email" autoComplete="email" value={values.email} error={errors.email} onChange={handleChange} />
          <Field label="Phone number" name="phone" type="tel" autoComplete="tel" placeholder="08012345678" value={values.phone} error={errors.phone} onChange={handleChange} />
          <Field label="City" name="city" autoComplete="address-level2" value={values.city} error={errors.city} onChange={handleChange} />
          <div className="md:col-span-2">
            <Field label="Street address" name="address" autoComplete="street-address" value={values.address} error={errors.address} onChange={handleChange} />
          </div>
        </div>

        <fieldset className="flex flex-col gap-3">
          <legend className="mb-3 text-sm font-medium">Delivery option</legend>
          {(['lagos', 'nationwide'] as const).map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-input px-4 py-3 has-[:checked]:border-primary has-[:checked]:bg-secondary/60"
            >
              <span className="flex items-center gap-3">
                <input
                  type="radio"
                  name="delivery"
                  value={option}
                  checked={values.delivery === option}
                  onChange={handleChange}
                  className="size-4 accent-primary"
                />
                <span className="text-sm">{option === 'lagos' ? 'Within Lagos (1–2 days)' : 'Nationwide (3–5 days)'}</span>
              </span>
              <span className="text-sm text-muted-foreground">{`₦${DELIVERY_FEES[option].toLocaleString('en-NG')}`}</span>
            </label>
          ))}
        </fieldset>

        <button type="submit" className="btn-primary w-full md:w-auto md:self-start">
          Place demo order
        </button>
      </form>

      <OrderSummary items={items} subtotal={subtotal} deliveryFee={deliveryFee} freeDeliveryFrom={FREE_DELIVERY_FROM} />
    </div>
  )
}

type FieldProps = {
  label: string
  name: keyof FormValues
  value: string
  error?: string
  type?: string
  autoComplete?: string
  placeholder?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

// A labelled input that shows its error message underneath.
function Field({ label, name, value, error, type = 'text', autoComplete, placeholder, onChange }: FieldProps) {
  const id = `checkout-${name}`
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`rounded-xl border bg-background px-4 py-3 text-sm ${error ? 'border-destructive' : 'border-input'}`}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
