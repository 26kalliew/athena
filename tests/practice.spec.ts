import { test, expect } from '@playwright/test'

// Full practice session flow — flip cards, mark got/missed, reach score screen
test.describe('practice session', () => {
  test('completes a two-card deck and shows the correct score', async ({ page }) => {
    // Fixture seeds a note + 2 cards and redirects to the practice page
    await page.goto('/test-fixtures/practice-session')
    await page.waitForURL(/\/notes\/[^/]+\/practice/, { timeout: 10000 })

    // --- Card 1 ---
    await expect(page.getByText('1 / 2')).toBeVisible()
    await expect(page.getByText('What is JSX?')).toBeVisible()
    await expect(page.getByText('Click card to reveal answer')).toBeVisible()

    // Flip card 1
    await page.getByText('What is JSX?').click()
    await expect(page.getByText('JavaScript XML syntax extension.')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Got it' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Missed' })).toBeVisible()

    // Mark card 1 as "Got it"
    await page.getByRole('button', { name: 'Got it' }).click()

    // --- Card 2 ---
    await expect(page.getByText('2 / 2')).toBeVisible()
    await expect(page.getByText('What is a hook?')).toBeVisible()

    // Flip card 2
    await page.getByText('What is a hook?').click()
    await expect(page.getByText('A function that uses React state.')).toBeVisible()

    // Mark card 2 as "Missed"
    await page.getByRole('button', { name: 'Missed' }).click()

    // --- Score screen ---
    await expect(page.getByRole('heading', { name: 'Done!' })).toBeVisible()
    await expect(page.getByText('1 / 2 correct')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Back to note' })).toBeVisible()
  })
})
