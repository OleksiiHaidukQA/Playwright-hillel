import { test, expect } from '@playwright/test';
import CarsController from '../controllers/CarsController';
import { getAuthorizedContext } from '../utils/apiAuth';

test.describe('API Tests for Cars - Update', () => {
    let carsController;
    let carId;

    test.beforeAll(async () => {
        const apiContext = await getAuthorizedContext();
        carsController = new CarsController(apiContext);

        const carsResponse = await carsController.getCars();
        expect(carsResponse.status).toBe('ok');

        if (carsResponse.data.length > 0) {
            carId = carsResponse.data[0].id;
        } else {
            throw new Error('Нет доступных машин для обновления.');
        }
    });

    test('Positive Test: Update a car mileage', async () => {
        const updatedData = {
            mileage: 200,
        };

        const response = await carsController.updateCar(carId, updatedData);
        expect(response.status).toBe('ok');
        expect(response.data).toMatchObject({
            id: carId,
            mileage: updatedData.mileage,
        });

        expect(response.data.carBrandId).toBe(1); 
        expect(response.data.carModelId).toBe(1); 
    });
});