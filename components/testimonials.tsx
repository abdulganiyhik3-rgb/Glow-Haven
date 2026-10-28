import { Quote } from 'lucide-react'
import { SectionHeading } from './section-heading'
import { StarRating } from './star-rating'

// DEMO CONTENT: these are invented example reviews, not real customers.
const testimonials = [
  {
    name: 'Adaeze O.',
    location: 'Lagos',
    rating: 5,
    text: 'The Rose Glow Serum has become my favourite morning step. My skin feels so soft and looks brighter.',
  },
  {
    name: 'Tolu A.',
    location: 'Abuja',
    rating: 5,
    text: 'Velvet Bloom smells expensive and lasts all day. I get compliments every single time I wear it.',
  },
  {
    name: 'Chioma E.',
    location: 'Port Harcourt',
    rating: 4,
    text: 'I love the body oil — just enough shimmer for a glow without looking glittery. Beautiful packaging too.',
  },
]

export function Testimonials() {
  return (
    <section id="reviews" className="bg-secondary/50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          align="center"
          eyebrow="Kind words"
          title="Loved by our glow community"
          description="Sample testimonials for demonstration only — these are not verified customer reviews."
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((review) => (
            <li key={review.name}>
              <figure className="flex h-full flex-col gap-5 rounded-3xl border border-border bg-card p-8">
                <Quote className="size-8 text-accent" aria-hidden="true" />
                <StarRating rating={review.rating} />
                <blockquote className="flex-1 font-serif text-xl leading-relaxed text-foreground">
                  {`“${review.text}”`}
                </blockquote>
                <figcaption className="text-sm">
                  <span className="font-medium">{review.name}</span>
                  <span className="text-muted-foreground">{` · ${review.location} · Sample review`}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
