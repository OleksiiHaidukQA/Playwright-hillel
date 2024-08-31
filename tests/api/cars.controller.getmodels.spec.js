import { test, expect } from '@playwright/test';
import CarsController from '../controllers/CarsController';
import { getAuthorizedContext } from '../utils/apiAuth';

test.describe('API Tests for Cars - Get All Models', () => {
    let carsController;

    test.beforeAll(async () => {
        const apiContext = await getAuthorizedContext();
        carsController = new CarsController(apiContext);
    });

    test('Positive Test: Get all car models', async () => {
        const response = await carsController.getModels();
        expect(response.status).toBe('ok');

        const expectedModels = [
            { id: 1, carBrandId: 1, title: 'TT' },
            { id: 2, carBrandId: 1, title: 'R8' },
            { id: 3, carBrandId: 1, title: 'Q7' },
            { id: 4, carBrandId: 1, title: 'A6' },
            { id: 5, carBrandId: 1, title: 'A8' },
            { id: 6, carBrandId: 2, title: '3' },
            { id: 7, carBrandId: 2, title: '5' },
            { id: 8, carBrandId: 2, title: 'X5' },
            { id: 9, carBrandId: 2, title: 'X6' },
            { id: 10, carBrandId: 2, title: 'Z3' },
            { id: 11, carBrandId: 3, title: 'Fiesta' },
            { id: 12, carBrandId: 3, title: 'Focus' },
            { id: 13, carBrandId: 3, title: 'Fusion' },
            { id: 14, carBrandId: 3, title: 'Mondeo' },
            { id: 15, carBrandId: 3, title: 'Sierra' },
            { id: 16, carBrandId: 4, title: '911' },
            { id: 17, carBrandId: 4, title: 'Cayenne' },
            { id: 18, carBrandId: 4, title: 'Panamera' },
            { id: 19, carBrandId: 5, title: 'Palio' },
            { id: 20, carBrandId: 5, title: 'Ducato' },
            { id: 21, carBrandId: 5, title: 'Panda' },
            { id: 22, carBrandId: 5, title: 'Punto' },
            { id: 23, carBrandId: 5, title: 'Scudo' }
        ];

        expect(response.data).toEqual(expect.arrayContaining(expectedModels));
    });
});