import { test, expect } from '@playwright/test';
import CarsController from '../controllers/CarsController';
import { getAuthorizedContext } from '../utils/apiAuth';
import { expectedModels } from '../utils/expectedData';

test.describe('API Tests for Cars - Get All Models', () => {
    let carsController;

    test.beforeAll(async () => {
        const apiContext = await getAuthorizedContext();
        carsController = new CarsController(apiContext);
    });

    test('Positive Test: Get all car models', async () => {
        const response = await carsController.getModels();
        expect(response.status).toBe('ok');

        expect(response.data).toEqual(expect.arrayContaining(expectedModels));
    });
});