import { Minus, Plus } from 'lucide-react'

type QuantitySelectorProps = {
  quantity: number
  onDecrease: () => void
  onIncrease: () => void
  max?: number
  label: string // e.g. "Rose Glow Serum" — read aloud by screen readers
  size?: 'sm' | 'md'
}

// A reusable "−  2  +" control. It doesn't store the number itself —
// the parent passes it in (via props) and decides what happens on click.
export function QuantitySelector({
  quantity,
  onDecrease,
  onIncrease,
  max = 10,
  label,
  size = 'md',
}: QuantitySelectorProps) {
  const buttonSize = size === 'sm' ? 'size-8' : 'size-10'

  return (
    <div className="inline-flex items-center rounded-full border border-input bg-card">
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= 1}
        aria-label={`Decrease quantity of ${label}`}
        className={`${buttonSize} flex items-center justify-center rounded-full text-foreground transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <Minus className="size-3.5" aria-hidden="true" />
      </button>
      <span className="min-w-8 text-center text-sm font-medium tabular-nums" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        disabled={quantity >= max}
        aria-label={`Increase quantity of ${label}`}
        className={`${buttonSize} flex items-center justify-center rounded-full text-foreground transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <Plus className="size-3.5" aria-hidden="true" />
      </button>
    </div>
  )
}
