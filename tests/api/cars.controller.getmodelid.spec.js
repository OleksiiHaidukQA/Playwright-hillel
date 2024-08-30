import { test, expect } from '@playwright/test';
import CarsController from '../controllers/CarsController';
import { getAuthorizedContext } from '../utils/apiAuth';

test.describe('API Tests for Cars - Get Model by ID', () => {
    let carsController;
    const modelId = 1; 

    test.beforeAll(async () => {
        const apiContext = await getAuthorizedContext();
        carsController = new CarsController(apiContext);
    });

    test(`Positive Test: Get model by ID`, async () => {
        const response = await carsController.getModelById(modelId);
        expect(response.status).toBe('ok');
        expect(response.data).toMatchObject({
            id: modelId,
            carBrandId: expect.any(Number),
            title: expect.any(String),
        });
    });
});