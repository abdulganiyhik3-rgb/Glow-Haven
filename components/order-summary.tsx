import { SafeImage } from './safe-image'
import { formatNaira } from '@/lib/format'
import type { CartItem } from '@/lib/types'

type OrderSummaryProps = {
  items: CartItem[]
  subtotal: number
  deliveryFee: number
  freeDeliveryFrom: number
}

export function OrderSummary({ items, subtotal, deliveryFee, freeDeliveryFrom }: OrderSummaryProps) {
  const total = subtotal + deliveryFee
  const amountToFreeDelivery = freeDeliveryFrom - subtotal

  return (
    <aside aria-labelledby="summary-title" className="flex flex-col gap-5 rounded-[2rem] bg-secondary/60 p-6 lg:sticky lg:top-36">
      <h2 id="summary-title" className="text-2xl font-semibold">
        Order summary
      </h2>

      <ul className="flex flex-col gap-4">
        {items.map(({ product, quantity }) => (
          <li key={product.id} className="flex items-center gap-3">
            <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-card">
              <SafeImage src={product.image} alt="" fill sizes="56px" className="object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium leading-tight">{product.name}</p>
              <p className="text-xs text-muted-foreground">{`Qty ${quantity}`}</p>
            </div>
            <p className="text-sm">{formatNaira(product.price * quantity)}</p>
          </li>
        ))}
      </ul>

      <dl className="flex flex-col gap-2 border-t border-border pt-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd>{formatNaira(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Delivery</dt>
          <dd>{deliveryFee === 0 ? 'Free' : formatNaira(deliveryFee)}</dd>
        </div>
        <div className="flex justify-between border-t border-border pt-3 text-base font-medium">
          <dt>Total</dt>
          <dd>{formatNaira(total)}</dd>
        </div>
      </dl>

      {amountToFreeDelivery > 0 && (
        <p className="rounded-xl bg-card px-4 py-3 text-xs text-muted-foreground">
          {`Add ${formatNaira(amountToFreeDelivery)} more for free delivery.`}
        </p>
      )}
    </aside>
  )
}
