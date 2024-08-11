import { test, expect } from '../../data/fixtures/userGaragePage';
import GaragePage from '../pages/garagePage';

test.describe('Garage Page', () => {
    test.beforeEach(async ({ garagePage }) => {
        await garagePage.navigate();
    });

    test('should display the Add Car button', async ({ garagePage }) => {
        await expect(garagePage.addCarButton).toBeVisible();
    });
});