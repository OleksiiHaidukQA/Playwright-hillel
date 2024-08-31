import { test, expect } from '@playwright/test';
import CarsController from '../controllers/CarsController';
import { getAuthorizedContext } from '../utils/apiAuth';

test.describe('API Tests for Cars - Get', () => {
    let carsController;
    const carData1 = {
        carBrandId: 1,
        carModelId: 1,
        mileage: 100,
    };
    const carData2 = {
        carBrandId: 2,
        carModelId: 6,
        mileage: 150,
    };
    let carIds = [];

    test.beforeAll(async () => {
        const apiContext = await getAuthorizedContext('carUser');
        carsController = new CarsController(apiContext);

        const response1 = await carsController.createCar(carData1);
        const response2 = await carsController.createCar(carData2);

        carIds.push(response1.data.id, response2.data.id);
    });

    test('Positive Test: Get all cars', async () => {
        const response = await carsController.getCars();
        expect(response.status).toBe('ok');

        expect(response.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ ...carData1, id: carIds[0] }),
                expect.objectContaining({ ...carData2, id: carIds[1] }),
            ])
        );
    });
});