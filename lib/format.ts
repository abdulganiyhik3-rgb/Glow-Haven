// Intl.NumberFormat is built into JavaScript. It formats numbers as money
// for any country. "en-NG" + "NGN" gives us Nigerian naira, e.g. ₦18,500.
const nairaFormatter = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0,
})

export function formatNaira(amount: number): string {
  return nairaFormatter.format(amount)
}
