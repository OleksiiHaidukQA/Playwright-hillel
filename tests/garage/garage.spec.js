import { myFixture as test, expect } from '../../fixtures/userGaragePage';


test.describe('Garage Page', () => {
    test.beforeEach(async ({ garagePage }) => {
        await garagePage.navigate();
    });

    test('should display the Add Car button', async ({ garagePage }) => {
        await expect(garagePage.addCarButton).toBeVisible();
    });
});