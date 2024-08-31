import { test, expect } from '@playwright/test';
import CarsController from '../controllers/CarsController';
import { getAuthorizedContext } from '../utils/apiAuth';

test.describe('API Tests for Cars - Update', () => {
    let carsController;
    let carId;

    test.beforeAll(async () => {
        const apiContext = await getAuthorizedContext();
        carsController = new CarsController(apiContext);

        const carData = {
            carBrandId: 1,
            carModelId: 1,
            mileage: 100,
        };

        const response = await carsController.createCar(carData);
        carId = response.data.id;
    });

    test('Positive Test: Update a car', async () => {
        const updatedData = {
            mileage: 200,
        };

        const response = await carsController.updateCar(carId, updatedData);
        expect(response.status).toBe('ok');
        expect(response.data).toMatchObject({
            id: carId,
            carBrandId: 1,
            carModelId: 1,
            mileage: updatedData.mileage,
            brand: 'Audi',
            model: 'TT',
            logo: 'audi.png',
        });
    });
});