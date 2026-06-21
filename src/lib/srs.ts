const MAX_INTERVAL_DAYS = 30

export function nextReviewDate(
  reviewedAt: Date,
  rating: 'got' | 'missed',
  currentIntervalDays: number = 1
): Date {
  const intervalDays =
    rating === 'missed' ? 1 : Math.min(currentIntervalDays * 2, MAX_INTERVAL_DAYS)
  const next = new Date(reviewedAt)
  next.setDate(next.getDate() + intervalDays)
  return next
}
