import { test as base } from '@playwright/test';
import GaragePage from '../tests/pages/garagePage';
import { USER1_STORAGE_STATE_PATH } from '../data/constants';

export const userGaragePage = base.extend({
    context: async ({ browser }, use) => {
        const context = await browser.newContext({
            storageState: USER1_STORAGE_STATE_PATH,
        });
        await use(context);
        await context.close();
    },
    garagePage: async ({ context }, use) => {
        const page = await context.newPage();
        const garagePage = new GaragePage(page);
        await use(garagePage);
        await page.close();
    },
});