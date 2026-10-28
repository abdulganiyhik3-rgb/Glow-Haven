'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

type ModalProps = {
  open: boolean
  onClose: () => void
  labelledBy: string // id of the heading that names this dialog
  className?: string
  children: React.ReactNode
}

// Uses the browser's built-in <dialog> element. With showModal() the browser
// gives us keyboard focus trapping and closing with the Escape key for free.
export function Modal({ open, onClose, labelledBy, className, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={labelledBy}
      onClose={onClose}
      // Clicking the dark backdrop (the dialog element itself, not its content) closes it.
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose()
      }}
      className={cn('bg-transparent p-0 text-foreground', className)}
    >
      {children}
    </dialog>
  )
}
