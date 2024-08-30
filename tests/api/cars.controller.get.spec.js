import { test, expect } from '@playwright/test';
import CarsController from '../controllers/CarsController';
import { getAuthorizedContext } from '../utils/apiAuth';

test.describe('API Tests for Cars - Get', () => {
    let carsController;

    test.beforeAll(async () => {
        const apiContext = await getAuthorizedContext();
        carsController = new CarsController(apiContext);
    });

    test('Positive Test: Get all cars', async () => {
        const response = await carsController.getCars();
        
        // Логирование для отладки
        console.log('API Response:', response);
    
        // Проверка, что response является объектом
        expect(typeof response).toBe('object');
    
        // Проверка статуса ответа
        expect(response.status).toBe('ok');
        
        // Проверяем, что ответ содержит массив машин
        expect(Array.isArray(response.data)).toBe(true);
        expect(response.data.length).toBeGreaterThan(0);
    
        // Проверяем, что каждая машина имеет необходимые поля и корректные данные
        response.data.forEach(car => {
            expect(car).toMatchObject({
                id: expect.any(Number),
                carBrandId: expect.any(Number),
                carModelId: expect.any(Number),
                mileage: expect.any(Number),
                brand: expect.any(String),
                model: expect.any(String),
            });
        });
    });
});