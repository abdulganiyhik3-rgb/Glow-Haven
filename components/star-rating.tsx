import { Star } from 'lucide-react'

type StarRatingProps = {
  rating: number
  reviewCount?: number
}

export function StarRating({ rating, reviewCount }: StarRatingProps) {
  // Build an array [1, 2, 3, 4, 5] and fill each star if the rating reaches it.
  const stars = [1, 2, 3, 4, 5]

  return (
    <div className="flex items-center gap-1.5">
      <span className="sr-only">{`Sample rating: ${rating} out of 5`}</span>
      <div className="flex" aria-hidden="true">
        {stars.map((star) => (
          <Star
            key={star}
            className={
              star <= Math.round(rating) ? 'size-3.5 fill-accent text-accent' : 'size-3.5 text-border'
            }
          />
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="text-xs text-muted-foreground" aria-hidden="true">
          {`${rating} (${reviewCount} sample reviews)`}
        </span>
      )}
    </div>
  )
}
