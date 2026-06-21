import { describe, it, expect } from 'vitest'
import { nextReviewDate } from './srs'

const DAY = 24 * 60 * 60 * 1000

function daysAfter(date: Date, result: Date): number {
  return Math.round((result.getTime() - date.getTime()) / DAY)
}

describe('nextReviewDate', () => {
  const base = new Date('2026-01-01T12:00:00Z')

  it('first-ever review: "got" schedules 2 days out (interval doubles from default 1)', () => {
    const next = nextReviewDate(base, 'got')
    expect(daysAfter(base, next)).toBe(2)
  })

  it('"got" with an existing interval doubles it', () => {
    const next = nextReviewDate(base, 'got', 4)
    expect(daysAfter(base, next)).toBe(8)
  })

  it('"missed" always resets to 1 day regardless of streak', () => {
    const next = nextReviewDate(base, 'missed', 16)
    expect(daysAfter(base, next)).toBe(1)
  })

  it('"got" caps the interval at 30 days', () => {
    const next = nextReviewDate(base, 'got', 20)
    expect(daysAfter(base, next)).toBe(30)
  })
})
