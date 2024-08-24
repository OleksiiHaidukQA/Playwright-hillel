import { test, expect } from '@playwright/test';
import CarsApi from '../pages/CarsApi';
import { getAuthorizedContext } from '../utils/apiAuth';

test.describe('API Tests for Cars', () => {
  let apiContext;
  let carsApi;

  test.beforeAll(async () => {
    apiContext = await getAuthorizedContext();
    carsApi = new CarsApi(apiContext);
  });

  test('Positive Test: Create a car', async () => {
    const carData = {
      carBrandId: 1,
      carModelId: 1,
      mileage: 777,
    };

    const response = await carsApi.createCar(carData);

    console.log('Response:', response);

    expect(response.status).toBe('ok');
    expect(response.data).toHaveProperty('id');
    expect(response.data.carBrandId).toBe(carData.carBrandId);
    expect(response.data.carModelId).toBe(carData.carModelId);
    expect(response.data.mileage).toBe(carData.mileage);
  });

  test('Negative Test: Create a car with missing fields', async () => {
    const carData = {
      carModelId: 1,
      mileage: 777,
    };

    try {
      await carsApi.createCar(carData);
    } catch (error) {
      console.log('Error Response:', error.message);
      expect(error.message).toContain('Car brand id is required');
    }
  });

  test('Negative Test: Create a car with invalid mileage', async () => {
    const carData = {
      carBrandId: 1,
      carModelId: 1,
      mileage: -100,
    };

    try {
      await carsApi.createCar(carData);
    } catch (error) {
      console.log('Error Response:', error.message);
      expect(error.message).toContain('Mileage has to be from 0 to 999999');
    }
  });
});