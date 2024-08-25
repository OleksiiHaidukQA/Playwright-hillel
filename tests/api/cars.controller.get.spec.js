import { test, expect } from '@playwright/test';
import CarsController from '../controllers/CarsController';
import { getAuthorizedContext } from '../utils/apiAuth';

test.describe('API Tests for Cars - Get', () => {
    let carsController;

    test.beforeAll(async () => {
        const apiContext = await getAuthorizedContext();
        carsController = new CarsController(apiContext);
    });

    test('Positive Test: Get a car by ID', async () => {
        const carData = {
            carBrandId: 1,
            carModelId: 1,
            mileage: 100,
        };
        const createdCar = await carsController.createCar(carData);

        const response = await carsController.getCarById(createdCar.data.id);
        expect(response.status).toBe('ok');
        expect(response.data.id).toBe(createdCar.data.id);
    });

    test('Positive Test: Get all cars', async () => {
        const response = await carsController.getCars();
        expect(response.status).toBe('ok');
        expect(response.data.length).toBeGreaterThan(0);
    });
});