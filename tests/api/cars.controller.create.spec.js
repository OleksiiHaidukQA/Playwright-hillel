import { test, expect } from '@playwright/test';
import CarsController from '../controllers/CarsController';
import { getAuthorizedContext } from '../utils/apiAuth';

test.describe('API Tests for Cars - Create', () => {
    let carsController;

    test.beforeAll(async () => {
        const apiContext = await getAuthorizedContext();
        carsController = new CarsController(apiContext);
    });

    test('Positive Test: Create a car', async () => {
        const carData = {
            carBrandId: 1,
            carModelId: 1,
            mileage: 100,
        };
        const response = await carsController.createCar(carData);
        expect(response.status).toBe('ok');
        expect(response.data.carBrandId).toBe(carData.carBrandId);
        expect(response.data.carModelId).toBe(carData.carModelId);
    });
});