import { test, expect } from '@playwright/test';

test.describe('LocalStorage Test', () => {
    test('should store data in localStorage', async ({ page }) => {
        await page.goto('/');
        // Пример взаимодействия с localStorage
        await page.evaluate(() => {
            localStorage.setItem('key', 'value');
        });

        const value = await page.evaluate(() => localStorage.getItem('key'));
        expect(value).toBe('value');
    });
});