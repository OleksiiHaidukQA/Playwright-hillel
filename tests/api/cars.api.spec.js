import { test, expect, request } from '@playwright/test';

test.describe('API Tests for Cars', () => {
  let apiContext;
  let authToken;

  test.beforeAll(async () => {
    apiContext = await request.newContext();
    
    const loginResponse = await apiContext.post('https://qauto.forstudy.space/api/auth/signin', {
      data: {
        email: 'oleksiihaidukqa@gmail.com',
        password: 'Q123q123_',
        remember: false,
      },
    });

    const loginResponseBody = await loginResponse.json();
    console.log('Login Response:', loginResponseBody);

    expect(loginResponseBody.status).toBe('ok');

    // Сохранение токена аутентификации
    authToken = loginResponseBody.data.token;
  });

  test('Positive Test: Create a car', async () => {
    const response = await apiContext.post('https://qauto.forstudy.space/api/cars', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: {
        carBrandId: 1,   
        carModelId: 1,   
        mileage: 777,    
      },
    });

    console.log('Status:', response.status());
    console.log('Response Text:', await response.text());

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    console.log(responseBody);

    expect(responseBody.status).toBe('ok');
  });

  test('Negative Test: Create a car with missing fields', async () => {
    const response = await apiContext.post('https://qauto.forstudy.space/api/cars', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: {
        
      },
    });

    console.log('Status:', response.status());
    console.log('Response Text:', await response.text());

    expect(response.status()).toBe(400);
  });

  test('Negative Test: Create a car with invalid mileage', async () => {
    const response = await apiContext.post('https://qauto.forstudy.space/api/cars', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: -100, 
      },
    });

    console.log('Status:', response.status());
    console.log('Response Text:', await response.text());

    expect(response.status()).toBe(400);
  });
});