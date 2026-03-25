export function formatCurrency(amount: number, currency: string, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100)
}

export function formatDate(
  date: Date | string,
  locale = 'en-US',
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' },
): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat(locale, options).format(d)
}

export function formatRelativeTime(date: Date | string, locale = 'en-US'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffSeconds = Math.round((d.getTime() - now.getTime()) / 1000)
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

  const absSeconds = Math.abs(diffSeconds)

  if (absSeconds < 60) return rtf.format(diffSeconds, 'second')
  if (absSeconds < 3600) return rtf.format(Math.round(diffSeconds / 60), 'minute')
  if (absSeconds < 86400) return rtf.format(Math.round(diffSeconds / 3600), 'hour')
  if (absSeconds < 2592000) return rtf.format(Math.round(diffSeconds / 86400), 'day')
  if (absSeconds < 31536000) return rtf.format(Math.round(diffSeconds / 2592000), 'month')
  return rtf.format(Math.round(diffSeconds / 31536000), 'year')
}

export function formatNumber(value: number, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(value)
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return `${str.slice(0, maxLength - 3)}...`
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function generateId(prefix?: string): string {
  const uuid = crypto.randomUUID()
  return prefix ? `${prefix}_${uuid}` : uuid
}
