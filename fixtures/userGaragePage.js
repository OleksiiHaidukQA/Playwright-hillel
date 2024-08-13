import { test as base, expect as baseexpect } from '@playwright/test';
import GaragePage from '../tests/pages/GaragePage';
import { USER1_STORAGE_STATE_PATH } from '../data/constants';

export const myFixture = base.extend({
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

export const expect = baseexpect