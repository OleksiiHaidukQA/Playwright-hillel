// @ts-check
import { test, expect } from '@playwright/test'

test.describe("Playwright todo app", ()=> {
  test.beforeAll(async ()=>{
    console.log("BEFORE ALL")
  })

  test.beforeEach(async ()=>{
    console.log("BEFORE EACH")
  })

  test.afterEach(async ()=>{
    console.log("AFTER EACH")
  })

  test.afterAll(async ()=>{
    console.log("AFTER ALL")
  })


  test('has title @smoke', async ({ page }) => {
    console.log("TEST 1")
    await page.goto('https://playwright.dev/');

    await page.pause()
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('get started link', async ({ page }) => {
    console.log("TEST 2")
    await page.goto('https://playwright.dev/');

    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });

  test('get started link2', async ({ page }) => {
    console.log("TEST 2")
    await page.goto('https://playwright.dev/');

    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });
})