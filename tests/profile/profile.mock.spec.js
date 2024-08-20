import { test, expect } from '@playwright/test';

test.describe('Profile Page Mock', () => {
  test.beforeEach(async ({ page }) => {
    
    await page.goto('https://qauto.forstudy.space/');
    
    await page.click('button.header_signin');

    await page.fill('input[formcontrolname="email"]', 'oleksiihaidukqa@gmail.com');
    await page.fill('input[formcontrolname="password"]', 'Q123q123_');

    await page.getByRole('button', { name: 'Login' }).click();

    await page.waitForURL('/panel/garage');
  });

  test('should mock profile data with external image and verify it on the page', async ({ page }) => {

    await page.route('https://qauto.forstudy.space/api/users/profile', route => {
      route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify({
          status: "ok",
          data: {
            userId: 132941,
            photoFilename: "brands/porsche.png", // Относительный путь, соответствующий логике сервера
            name: "Mocked Name",
            lastName: "Mocked LastName"
          }
        })
      });
    });

    await page.click('.user-nav.dropdown');

    await page.getByRole('link', { name: 'Profile', exact: true }).click();

    // Ожидание загрузки страницы профиля
    await page.waitForLoadState('networkidle');

    const profileImage = page.locator('app-profile').getByRole('img', { name: 'User photo' });
    await profileImage.waitFor({ state: 'attached' });

    await expect(profileImage).toHaveAttribute('src', 'https://qauto.forstudy.space/public/images/users/brands/porsche.png');

    await expect(page.getByText('Mocked Name Mocked LastName')).toBeVisible();
  });
});