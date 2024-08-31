import { test, expect } from '@playwright/test';
import CarsController from '../controllers/CarsController';
import { getAuthorizedContext } from '../utils/apiAuth';

test.describe('API Tests for Cars - Get', () => {
    let carsController;
    let carIds = [];
    let carData1, carData2;

    test.beforeAll(async () => {
        const apiContext = await getAuthorizedContext('carUser'); 
        carsController = new CarsController(apiContext);

        const brandsResponse = await carsController.getBrands();
        console.log('Available Brands:', brandsResponse.data);

        const modelsResponse = await carsController.getModels();
        console.log('Available Models:', modelsResponse.data);

        carData1 = {
            carBrandId: 1,  
            carModelId: 1,  
            mileage: 100,
        };
        carData2 = {
            carBrandId: 2,  
            carModelId: 6, 
            mileage: 150,
        };

        const response1 = await carsController.createCar(carData1);
        console.log('Created Car 1:', response1);

        const response2 = await carsController.createCar(carData2);
        console.log('Created Car 2:', response2);

        carIds.push(response1.data.id, response2.data.id);
    });

    test('Positive Test: Get all cars', async () => {
        const response = await carsController.getCars();
        console.log('Get Cars Response:', response);

        expect(response.status).toBe('ok');

        const filteredCars = response.data.filter(car => carIds.includes(car.id));
        expect(filteredCars.length).toBe(carIds.length);

        filteredCars.forEach((car, index) => {
            const expectedData = index === 0 ? carData1 : carData2;
            expect(car).toMatchObject({
                id: carIds[index],
                carBrandId: expectedData.carBrandId,
                carModelId: expectedData.carModelId,
                mileage: expectedData.mileage,
                brand: index === 0 ? "Audi" : "BMW",  
                model: index === 0 ? "TT" : "3",     
                logo: index === 0 ? "audi.png" : "bmw.png",  
            });
        });
    });
});