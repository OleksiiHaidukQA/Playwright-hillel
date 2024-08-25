import { test, expect } from '@playwright/test';
import CarsController from '../controllers/CarsController';
import { getAuthorizedContext } from '../utils/apiAuth';

test.describe('API Tests for Cars - Delete', () => {
    let carsController;

    test.beforeAll(async () => {
        const apiContext = await getAuthorizedContext();
        carsController = new CarsController(apiContext);
    });

    test('Positive Test: Delete a car', async () => {
        const carData = {
            carBrandId: 1,
            carModelId: 1,
            mileage: 100,
        };
        const createdCar = await carsController.createCar(carData);

        const response = await carsController.deleteCar(createdCar.data.id);
        expect(response.status).toBe('ok');
    });
});