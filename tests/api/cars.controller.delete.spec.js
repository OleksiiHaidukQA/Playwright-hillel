import { test, expect } from '@playwright/test';
import CarsController from '../controllers/CarsController';
import { getAuthorizedContext } from '../utils/apiAuth';

test.describe('API Tests for Cars - Delete', () => {
    let carsController;
    let carId;

    test.beforeAll(async () => {
        const apiContext = await getAuthorizedContext();
        carsController = new CarsController(apiContext);

        // Создаем машину для удаления
        const carData = {
            carBrandId: 1,
            carModelId: 1,
            mileage: 100,
        };
        const createResponse = await carsController.createCar(carData);
        expect(createResponse.status).toBe('ok');

        carId = createResponse.data.id;
    });

    test('Positive Test: Delete a car', async () => {
        const response = await carsController.deleteCar(carId);
        expect(response.status).toBe('ok');

        try {
            await carsController.getCarById(carId);
            throw new Error('Car was not deleted');
        } catch (error) {
            expect(error.message).toContain('Not Found');
        }
    });
});