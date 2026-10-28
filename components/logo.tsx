import Link from 'next/link'
import { Flower2 } from 'lucide-react'

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 rounded-md" aria-label="Glow Haven home">
      <span className="flex size-8 items-center justify-center rounded-full bg-secondary text-primary">
        <Flower2 className="size-4.5" aria-hidden="true" />
      </span>
      <span className="font-serif text-2xl font-semibold tracking-wide text-foreground">Glow Haven</span>
    </Link>
  )
}
