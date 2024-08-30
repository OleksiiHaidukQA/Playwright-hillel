import { test, expect } from '@playwright/test';
import CarsController from '../controllers/CarsController';
import { getAuthorizedContext } from '../utils/apiAuth';

test.describe('API Tests for Cars - Get All Brands', () => {
    let carsController;

    test.beforeAll(async () => {
        const apiContext = await getAuthorizedContext();
        carsController = new CarsController(apiContext);
    });

    test('Positive Test: Get all car brands', async () => {
        const response = await carsController.getBrands();
        expect(response.status).toBe('ok');
        expect(Array.isArray(response.data)).toBe(true);
        expect(response.data.length).toBeGreaterThan(0);

        response.data.forEach(brand => {
            expect(brand).toHaveProperty('id');
            expect(brand).toHaveProperty('title');
            expect(brand).toHaveProperty('logoFilename');
        });
    });
});