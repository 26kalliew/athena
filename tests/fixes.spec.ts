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
