import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Logo } from './logo'

const shopLinks = [
  { label: 'All Products', href: '/shop' },
  { label: 'Skincare', href: '/shop?category=skincare' },
  { label: 'Fragrances', href: '/shop?category=fragrances' },
  { label: 'Lip Care', href: '/shop?category=lip-care' },
  { label: 'Body Care', href: '/shop?category=body-care' },
]

const companyLinks = [
  { label: 'About Us', href: '/#about' },
  { label: 'Reviews', href: '/#reviews' },
  { label: 'Newsletter', href: '/#newsletter' },
  { label: 'Demo Checkout', href: '/checkout' },
]

// Placeholder social links — replace "#" with your real profile URLs.
const socialLinks = ['Instagram', 'TikTok', 'Pinterest', 'X (Twitter)']

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Everyday essentials and luxurious treats for self-care, confidence and your own kind of glow.
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Social media">
            {socialLinks.map((name) => (
              <li key={name}>
                <a href="#" className="text-sm text-foreground/80 underline-offset-4 hover:text-primary hover:underline">
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <FooterLinks title="Shop" links={shopLinks} />
        <FooterLinks title="Glow Haven" links={companyLinks} />

        <div>
          <h2 className="mb-4 font-sans text-xs font-medium uppercase tracking-[0.25em] text-primary">Contact</h2>
          <address className="flex flex-col gap-3 text-sm not-italic text-muted-foreground">
            <span className="flex items-center gap-2">
              <MapPin className="size-4 text-accent" aria-hidden="true" />
              123 Sample Street, Lagos (placeholder)
            </span>
            <a href="mailto:hello@example.com" className="flex items-center gap-2 hover:text-primary">
              <Mail className="size-4 text-accent" aria-hidden="true" />
              hello@example.com
            </a>
            <a href="tel:+2340000000000" className="flex items-center gap-2 hover:text-primary">
              <Phone className="size-4 text-accent" aria-hidden="true" />
              +234 000 000 0000
            </a>
          </address>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-muted-foreground md:px-8">
          {`© ${new Date().getFullYear()} Glow Haven. A demonstration store built for learning — products, prices and reviews are sample data.`}
        </p>
      </div>
    </footer>
  )
}

function FooterLinks({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="mb-4 font-sans text-xs font-medium uppercase tracking-[0.25em] text-primary">{title}</h2>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-sm text-foreground/80 transition hover:text-primary">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
