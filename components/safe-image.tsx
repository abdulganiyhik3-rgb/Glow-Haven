'use client'

import Image, { type ImageProps } from 'next/image'
import { useState } from 'react'
import { Flower2 } from 'lucide-react'
import { cn } from '@/lib/utils'

// Works like Next.js <Image>, but shows a soft placeholder if the image fails to load.
export function SafeImage({ className, alt, ...props }: ImageProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn('flex h-full w-full items-center justify-center bg-secondary text-primary/50', className)}
      >
        <Flower2 className="size-10" aria-hidden="true" />
      </div>
    )
  }

  return <Image alt={alt} className={className} onError={() => setHasError(true)} {...props} />
}
