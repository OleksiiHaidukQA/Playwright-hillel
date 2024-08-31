import { test, expect } from '@playwright/test';
import CarsController from '../controllers/CarsController';
import { getAuthorizedContext } from '../utils/apiAuth';

let carId;

test.describe('API Tests for Cars - Update', () => {
    let carsController;

    const carData = {
        carBrandId: 1,
        carModelId: 1,
        mileage: 100,
    };
    const updatedData = {
        mileage: 200,
    };

    const expectedUpdatedData = {
        ...carData,
        mileage: updatedData.mileage,
        brand: 'Audi',
        model: 'TT',
        logo: 'audi.png',
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

    test('Positive Test: Update a car', async () => {
        const response = await carsController.updateCar(carId, updatedData);
        expect(response.status).toBe('ok');
        expect(response.data).toMatchObject(expectedUpdatedData);
    });
});