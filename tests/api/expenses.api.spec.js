import { test, expect } from '@playwright/test';
import ExpensesApi from '../pages/ExpensesApi';
import CarsApi from '../pages/CarsApi';
import { getAuthorizedContext } from '../utils/apiAuth';

test.describe('API Tests for Expenses', () => {
  let apiContext;
  let expensesApi;
  let carsApi;

  test.beforeAll(async () => {
    apiContext = await getAuthorizedContext();
    expensesApi = new ExpensesApi(apiContext);
    carsApi = new CarsApi(apiContext);
  });

  test('Positive Test: Create an expense', async () => {
    // Создаем новую машину, чтобы использовать ее в тесте для расходов
    const carData = {
      carBrandId: 1,
      carModelId: 1,
      mileage: 500,
    };
    const createdCar = await carsApi.createCar(carData);
    const carId = createdCar.data.id;

    // Данные для создания расхода
    const expenseData = {
      carId,
      reportedAt: new Date().toISOString().split('T')[0], // Текущая дата
      mileage: 600, // Пробег должен быть больше начального пробега автомобиля
      liters: 11,
      totalCost: 11,
      forceMileage: false,
    };

    const response = await expensesApi.createExpense(expenseData);

    console.log('Response:', response);

    expect(response.status).toBe('ok');
    expect(response.data).toHaveProperty('id');
    expect(response.data.carId).toBe(expenseData.carId);
    expect(response.data.mileage).toBe(expenseData.mileage);
    expect(response.data.totalCost).toBe(expenseData.totalCost);
  });
});