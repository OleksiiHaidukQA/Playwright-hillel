import { test, expect, request } from '@playwright/test';

test.describe('API Tests for Cars', () => {
  let apiContext;

  test.beforeAll(async () => {
    // Создаем новый контекст API с базовым URL
    apiContext = await request.newContext();

    // Авторизация пользователя
    const loginResponse = await apiContext.post('api/auth/signin', {
      data: {
        email: 'oleksiihaidukqa@gmail.com',
        password: 'Q123q123_',
        remember: false,
      },
    });

    if (!loginResponse.ok()) {
      const responseText = await loginResponse.text();
      console.error('Login failed:', responseText); // Выводим текст ответа, если ошибка
      throw new Error(`Failed to login: ${responseText}`);
    }

    const loginResponseBody = await loginResponse.json().catch((err) => {
      console.error('Error parsing JSON:', err);
      throw err;
    });

    console.log('Login Response:', loginResponseBody);
    expect(loginResponseBody.status).toBe('ok');
  });

  test('Positive Test: Create a car', async () => {
    // Создание автомобиля
    const response = await apiContext.post('api/cars', {
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: 777,
      },
    });

    if (!response.ok()) {
      const responseText = await response.text();
      throw new Error(`Failed to create car: ${responseText}`);
    }

    const responseBody = await response.json().catch((err) => {
      console.error('Error parsing JSON:', err);
      throw err;
    });

    console.log('Response:', responseBody);

    expect(responseBody.status).toBe('ok');
    expect(responseBody.data).toHaveProperty('id');
    expect(responseBody.data.carBrandId).toBe(1);
    expect(responseBody.data.carModelId).toBe(1);
    expect(responseBody.data.mileage).toBe(777);
  });

  test('Negative Test: Create a car with missing fields', async () => {
    const response = await apiContext.post('api/cars', {
      data: {
        carModelId: 1,
        mileage: 777,
      },
    });

    const responseBody = await response.json().catch((err) => {
      console.error('Error parsing JSON:', err);
      throw err;
    });

    console.log('Response:', responseBody);

    // Проверяем, что запрос вернул ошибку 400
    expect(response.status()).toBe(400);
    expect(responseBody.status).toBe('error');
    expect(responseBody.message).toBe('Car brand id is required');
  });

  test('Negative Test: Create a car with invalid mileage', async () => {
    const response = await apiContext.post('api/cars', {
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: -100,
      },
    });

    const responseBody = await response.json().catch((err) => {
      console.error('Error parsing JSON:', err);
      throw err;
    });

    console.log('Response:', responseBody);

    // Проверяем, что запрос вернул ошибку 400
    expect(response.status()).toBe(400);
    expect(responseBody.status).toBe('error');
    expect(responseBody.message).toBe('Mileage has to be from 0 to 999999');
  });
});