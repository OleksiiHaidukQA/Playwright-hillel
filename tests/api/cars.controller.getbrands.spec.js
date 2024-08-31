import { test, expect } from '@playwright/test';
import CarsController from '../controllers/CarsController';
import { getAuthorizedContext } from '../utils/apiAuth';
import { expectedBrands } from '../utils/expectedData';

test.describe('API Tests for Cars - Get All Brands', () => {
    let carsController;

    test.beforeAll(async () => {
        const apiContext = await getAuthorizedContext();
        carsController = new CarsController(apiContext);
    });

    test('Positive Test: Get all car brands', async () => {
        const response = await carsController.getBrands();
        expect(response.status).toBe('ok');

        expect(response.data).toEqual(expect.arrayContaining(expectedBrands));
    });
});