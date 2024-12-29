import { expect, test } from '@playwright/test'

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the app root url', async ({ page }) => {
  await page.goto('/live')
  await expect(page.locator('button')).toHaveText('Hello APP')
})
