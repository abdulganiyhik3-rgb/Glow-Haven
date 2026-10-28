// Simple checks used by the newsletter and checkout forms.

// Something@something.something — good enough for a beginner project.
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

// Accepts Nigerian numbers like 08012345678 or +2348012345678 (spaces/dashes allowed).
export function isValidNigerianPhone(phone: string): boolean {
  const digitsOnly = phone.replace(/[\s-]/g, '')
  return /^(\+234|0)[789][01]\d{8}$/.test(digitsOnly)
}
