import { test, expect } from '@playwright/test';
import CarsController from '../controllers/CarsController';
import { getAuthorizedContext } from '../utils/apiAuth';

let carId;

test.describe('API Tests for Cars - Delete', () => {
    let carsController;
    const carData = {
        carBrandId: 1,
        carModelId: 1,
        mileage: 100,
    };

    test.beforeAll(async () => {
        const apiContext = await getAuthorizedContext();
        carsController = new CarsController(apiContext);

        const existingCars = await carsController.getCars();
        if (existingCars.status === 'ok') {
            for (const car of existingCars.data) {
                await carsController.deleteCar(car.id);
            }
        }

        const response = await carsController.createCar(carData);
        carId = response.data.id;
    });

    test('Positive Test: Delete a car', async () => {
        const response = await carsController.deleteCar(carId);
        expect(response.status).toBe('ok');
    });
});