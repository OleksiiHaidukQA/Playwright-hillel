import { test as setup } from '@playwright/test';
import WelcomePage from '../pages/welcomePage';
import { USERS } from '../../data/users';
import { USER1_STORAGE_STATE_PATH } from '../../data/constants';

setup('Login and save storage state', async ({ page }) => {
    const welcomePage = new WelcomePage(page);
    await welcomePage.navigate();

    // Проверяем, находится ли пользователь на странице /panel/garage
    const currentUrl = await page.url();
    if (!currentUrl.includes('/panel/garage')) {
        // Если пользователь не на странице гаража, предполагаем, что он не залогинен.
        await welcomePage.clickSignInButton();
        
        // Заполнение формы логина
        await page.fill('input[name="email"]', USERS.USER1.email);
        await page.fill('input[name="password"]', USERS.USER1.password);
        await page.click('button:has-text("Login")');
        
        // Ожидание перехода на страницу гаража
        await page.waitForURL('/panel/garage');
    }

    // Сохранение состояния сессии
    await page.context().storageState({ path: USER1_STORAGE_STATE_PATH });
});