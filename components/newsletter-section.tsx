'use client'

import { useState } from 'react'
import { CheckCircle2, Mail } from 'lucide-react'
import { isValidEmail } from '@/lib/validation'

type Status = 'idle' | 'error' | 'success'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault() // stop the browser from reloading the page

    if (!email.trim()) {
      setStatus('error')
      setMessage('Please enter your email address.')
      return
    }
    if (!isValidEmail(email)) {
      setStatus('error')
      setMessage('That email doesn’t look quite right. Try something like name@example.com.')
      return
    }

    // No mailing-list service is connected, so we are honest about it.
    setStatus('success')
    setMessage(`Looks good! This is a demo, so ${email.trim()} was not added to a real mailing list.`)
    setEmail('')
  }

  return (
    <section id="newsletter" className="mx-auto max-w-7xl scroll-mt-32 px-4 py-16 md:px-8 lg:py-24">
      <div className="flex flex-col items-center gap-6 rounded-[2.5rem] bg-primary px-6 py-14 text-center text-primary-foreground md:px-16">
        <span className="flex size-14 items-center justify-center rounded-full bg-primary-foreground/15">
          <Mail className="size-6" aria-hidden="true" />
        </span>
        <h2 className="max-w-xl text-4xl font-semibold leading-tight text-balance md:text-5xl">
          Join the Glow List
        </h2>
        <p className="max-w-md leading-relaxed text-primary-foreground/85">
          Be first to hear about new arrivals, beauty tips and members-only treats.
        </p>

        <form onSubmit={handleSubmit} noValidate className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={status === 'error'}
            aria-describedby="newsletter-message"
            className="flex-1 rounded-full border border-primary-foreground/30 bg-primary-foreground px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            className="rounded-full bg-foreground px-7 py-3 text-sm font-medium tracking-wide text-background transition hover:bg-foreground/85"
          >
            Subscribe
          </button>
        </form>

        <p
          id="newsletter-message"
          role="status"
          className={`flex min-h-6 items-center gap-2 text-sm ${status === 'error' ? 'font-medium text-white underline decoration-white/50 underline-offset-4' : 'text-primary-foreground/90'}`}
        >
          {status === 'success' && <CheckCircle2 className="size-4" aria-hidden="true" />}
          {message}
        </p>
      </div>
    </section>
  )
}
