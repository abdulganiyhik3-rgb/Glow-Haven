type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

// Reused at the top of most sections so headings look the same everywhere.
export function SectionHeading({ eyebrow, title, description, align = 'left' }: SectionHeadingProps) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start'

  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alignment}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="text-4xl font-semibold leading-tight text-balance md:text-5xl">{title}</h2>
      {description && <p className="leading-relaxed text-muted-foreground text-pretty">{description}</p>}
    </div>
  )
}
