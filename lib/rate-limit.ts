// In-memory per-IP rate limiter for form API routes.
// Note: this is per server instance (resets on redeploy/restart), which is
// enough for light abuse protection on a low-traffic office site.

const WINDOW_MS = 60_000
const MAX_REQUESTS = 5

const hits = new Map<string, number[]>()

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim()
    if (first) return first
  }
  const realIp = request.headers.get("x-real-ip")?.trim()
  if (realIp) return realIp
  return "unknown"
}

export function isRateLimited(key: string): boolean {
  const now = Date.now()
  const windowStart = now - WINDOW_MS
  const timestamps = (hits.get(key) ?? []).filter((t) => t > windowStart)
  if (timestamps.length >= MAX_REQUESTS) {
    hits.set(key, timestamps)
    return true
  }
  timestamps.push(now)
  hits.set(key, timestamps)
  return false
}
