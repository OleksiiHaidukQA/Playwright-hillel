import { test, expect } from '@playwright/test';
import CarsController from '../controllers/CarsController';
import { getAuthorizedContext } from '../utils/apiAuth';

test.describe('API Tests for Cars - Get All Models', () => {
    let carsController;

    test.beforeAll(async () => {
        const apiContext = await getAuthorizedContext();
        carsController = new CarsController(apiContext);
    });

    test('Positive Test: Get all car models', async () => {
        const response = await carsController.getModels();
        expect(response.status).toBe('ok');
        expect(Array.isArray(response.data)).toBe(true);
        expect(response.data.length).toBeGreaterThan(0);

        response.data.forEach(model => {
            expect(model).toHaveProperty('id');
            expect(model).toHaveProperty('carBrandId');
            expect(model).toHaveProperty('title');
        });
    });
});