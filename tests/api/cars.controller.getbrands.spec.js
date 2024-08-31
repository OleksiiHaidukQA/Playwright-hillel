import { test, expect } from '@playwright/test';
import CarsController from '../controllers/CarsController';
import { getAuthorizedContext } from '../utils/apiAuth';

test.describe('API Tests for Cars - Get All Brands', () => {
    let carsController;

    test.beforeAll(async () => {
        const apiContext = await getAuthorizedContext();
        carsController = new CarsController(apiContext);
    });

    test('Positive Test: Get all car brands', async () => {
        const response = await carsController.getBrands();
        expect(response.status).toBe('ok');

        const expectedBrands = [
            { id: 1, title: 'Audi', logoFilename: 'audi.png' },
            { id: 2, title: 'BMW', logoFilename: 'bmw.png' },
            { id: 3, title: 'Ford', logoFilename: 'ford.png' },
            { id: 4, title: 'Porsche', logoFilename: 'porsche.png' },
            { id: 5, title: 'Fiat', logoFilename: 'fiat.png' }
        ];

        expect(response.data).toEqual(expect.arrayContaining(expectedBrands));
    });
});