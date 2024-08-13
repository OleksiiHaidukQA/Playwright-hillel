import { test as setup } from '@playwright/test';
import WelcomePage from '../pages/welcomePage';
import { USERS } from '../../data/users';
import { USER1_STORAGE_STATE_PATH } from '../../data/constants';

setup('Login and save storage state', async ({ page }) => {
    const welcomePage = new WelcomePage(page);
    await welcomePage.navigate();
    
    // Выполняем авторизацию всегда
    await welcomePage.clickSignInButton();
    await page.fill('input[name="email"]', USERS.USER1.email);
    await page.fill('input[name="password"]', USERS.USER1.password);
    await page.click('button:has-text("Login")');

    await page.waitForURL('/panel/garage');

    await page.context().storageState({ path: USER1_STORAGE_STATE_PATH });
});