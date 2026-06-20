import { test, expect } from '@playwright/test'

// Fix 1 — createNote missing error handling
test.describe('new note page — save error handling', () => {
  test('re-enables Save and shows a toast when the server action fails', async ({ page }) => {
    await page.goto('/notes/new')

    // Intercept the Server Action POST and return a 500 before filling the form
    await page.route('**/notes/new', async route => {
      if (route.request().method() === 'POST') {
        await route.fulfill({ status: 500, body: 'Internal Server Error' })
      } else {
        await route.continue()
      }
    })

    await page.getByPlaceholder('Title').fill('Test Note')
    await page.getByRole('button', { name: 'Save' }).click()

    // Button must not stay stuck at "Saving…" — it should return to "Save"
    await expect(page.getByRole('button', { name: 'Save' })).toBeEnabled({ timeout: 8000 })

    // A sonner toast must appear
    await expect(page.locator('[data-sonner-toast]')).toBeVisible({ timeout: 8000 })
  })
})

// Fix 6 — notes/[id]/loading.tsx skeleton
test.describe('note detail — loading skeleton', () => {
  test('renders skeleton sections instead of a blank page while loading', async ({ page }) => {
    await page.goto('/test-fixtures/note-loading')
    await expect(page.locator('[data-slot="skeleton"]').first()).toBeVisible()
    const count = await page.locator('[data-slot="skeleton"]').count()
    expect(count).toBeGreaterThanOrEqual(6)
  })
})

// Fix 5 — notes/loading.tsx skeleton
test.describe('notes list — loading skeleton', () => {
  test('renders skeleton rows instead of a blank page while loading', async ({ page }) => {
    await page.goto('/test-fixtures/notes-loading')
    // Four skeleton list items must be present
    await expect(page.locator('[data-slot="skeleton"]').first()).toBeVisible()
    const count = await page.locator('li').count()
    expect(count).toBe(4)
  })
})

// Fix 4 — Long note titles truncate in the list
test.describe('notes list — title truncation', () => {
  test('a very long title is truncated to a single line', async ({ page }) => {
    // Create a note with a very long title
    await page.goto('/notes/new')
    const longTitle = 'A'.repeat(300)
    await page.getByPlaceholder('Title').fill(longTitle)
    await page.getByRole('button', { name: 'Save' }).click()
    await page.waitForURL(/\/notes\/[^/]+$/, { timeout: 10000 })

    await page.goto('/notes')
    const titleEl = page.locator('p.truncate').first()
    await expect(titleEl).toBeVisible()

    // The rendered height of a truncated single-line element is ≤ 30px
    const box = await titleEl.boundingBox()
    expect(box!.height).toBeLessThan(40)
  })
})

// Fix 3 — Input/Textarea lock during save
test.describe('new note page — fields lock during save', () => {
  test('title and body are disabled while saving', async ({ page }) => {
    await page.goto('/notes/new')

    // Hold the Server Action so we can inspect the in-flight state
    let resolveHold!: () => void
    await page.route('**/notes/new', async route => {
      if (route.request().method() === 'POST') {
        await new Promise<void>(res => { resolveHold = res })
        await route.continue()
      } else {
        await route.continue()
      }
    })

    await page.getByPlaceholder('Title').fill('Lock Test')
    await page.getByRole('button', { name: 'Save' }).click()

    // While the action is in-flight, both fields must be disabled
    await expect(page.getByPlaceholder('Title')).toBeDisabled({ timeout: 3000 })
    await expect(page.getByPlaceholder('Paste your notes here…')).toBeDisabled({ timeout: 3000 })

    resolveHold()
  })
})

// Fix 2 — ChatPanel silent streaming errors
test.describe('chat panel — error handling', () => {
  test('shows a toast when the chat API returns an error', async ({ page }) => {
    // Create a real note so we land on a page with a ChatPanel
    await page.goto('/notes/new')
    await page.getByPlaceholder('Title').fill('Chat Error Test')
    await page.getByPlaceholder('Paste your notes here…').fill('Test content.')
    await page.getByRole('button', { name: 'Save' }).click()
    await page.waitForURL(/\/notes\/[^/]+$/, { timeout: 10000 })

    // Intercept the chat streaming endpoint
    await page.route('**/api/chat', async route => {
      if (route.request().method() === 'POST') {
        await route.fulfill({ status: 500, body: 'Service Unavailable' })
      } else {
        await route.continue()
      }
    })

    await page.getByPlaceholder('Ask about this note…').fill('Hello?')
    await page.getByRole('button', { name: 'Send' }).click()

    // A sonner error toast must appear
    await expect(page.locator('[data-sonner-toast]')).toBeVisible({ timeout: 8000 })
  })
})
