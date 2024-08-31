import { test, expect } from '@playwright/test';
import CarsController from '../controllers/CarsController';
import { getAuthorizedContext } from '../utils/apiAuth';
import { expectedBrands } from '../utils/expectedData';

test.describe('API Tests for Cars - Get Brand by ID', () => {
    let carsController;
    const brandId = 1;

    test.beforeAll(async () => {
        const apiContext = await getAuthorizedContext();
        carsController = new CarsController(apiContext);
    });

    test('Positive Test: Get brand by ID', async () => {
        const response = await carsController.getBrandById(brandId);
        expect(response.status).toBe('ok');

        const expectedBrand = expectedBrands.find(brand => brand.id === brandId);

        expect(response.data).toMatchObject({
            id: expectedBrand.id,
            title: expectedBrand.title,
            logoFilename: expectedBrand.logoFilename,
        });
    });
});