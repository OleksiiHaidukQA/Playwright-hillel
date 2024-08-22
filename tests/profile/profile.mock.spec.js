import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';

test.describe('Profile Page Mock', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await page.goto('/');
    await page.click('button.header_signin');
    await loginPage.login('oleksiihaidukqa@gmail.com', 'Q123q123_');
  });

  test('should mock profile data with external image and verify it on the page', async ({ page }) => {
    const mockedData = {
      status: "ok",
      data: {
        userId: 132941,
        photoFilename: "brands/porsche.png",
        name: "Mocked Name",
        lastName: "Mocked LastName"
      }
    };

    await page.route('/api/users/profile', route => {
      route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify(mockedData)
      });
    });

    await page.click('.user-nav.dropdown');
    await page.getByRole('link', { name: 'Profile', exact: true }).click();

    await page.waitForLoadState('networkidle');

    const profileImage = page.locator('app-profile').getByRole('img', { name: 'User photo' });
    await profileImage.waitFor({ state: 'attached' });

    await expect(profileImage).toHaveAttribute('src', `https://qauto.forstudy.space/public/images/users/${mockedData.data.photoFilename}`);
    await expect(page.getByText(`${mockedData.data.name} ${mockedData.data.lastName}`)).toBeVisible();
  });
});