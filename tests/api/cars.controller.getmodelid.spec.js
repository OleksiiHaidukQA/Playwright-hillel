import { test, expect } from '@playwright/test';
import CarsController from '../controllers/CarsController';
import { getAuthorizedContext } from '../utils/apiAuth';
import { expectedModels } from '../utils/expectedData';

test.describe('API Tests for Cars - Get Model by ID', () => {
    let carsController;
    const modelId = 1;  

    test.beforeAll(async () => {
        const apiContext = await getAuthorizedContext();
        carsController = new CarsController(apiContext);
    });

    test('Positive Test: Get model by ID', async () => {
        const response = await carsController.getModelById(modelId);
        expect(response.status).toBe('ok');

        const expectedModel = expectedModels.find(model => model.id === modelId);

        expect(response.data).toMatchObject({
            id: expectedModel.id,
            carBrandId: expectedModel.carBrandId,
            title: expectedModel.title,
        });
    });
});