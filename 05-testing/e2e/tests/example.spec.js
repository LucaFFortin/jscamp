// @ts-check
import { test, expect } from '@playwright/test';

test('has react jobs', async ({ page }) => {
  await page.goto('http://localhost:5173');

  const loginButton = page.getByRole("link", { name: "Iniciar sesión" })
  await loginButton.click()

  await page.getByRole("button", { name: "Iniciar sesión" }).click()

  await page.getByRole("heading", { name: "DevJobs", level: 1 }).click()

  const searchBox = page.getByRole("searchbox")
  await searchBox.fill("react")

  const searchButton = page.getByRole("button", { name: "Buscar" })
  await searchButton.click()

  const jobCards = page.locator(".job-listing-card")
  await expect(jobCards.first()).toBeVisible()

  const title = jobCards.first().getByRole("heading", { level: 3 })
  await expect(title).toHaveText(/desarrollador/i)

  const SaveJobButton = jobCards.first().getByRole("button", { name: "Aplicar" })
  await SaveJobButton.click()

  const SavedJob = page.getByRole("button", { name: "Aplicado" }).first()
  // await expect(SavedJob).toHaveText("Aplicado")
});
