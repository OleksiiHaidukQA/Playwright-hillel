import { request, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export async function getAuthorizedContext(userType = 'default') {
  const apiContext = await request.newContext();
  
  let email, password;

  // Определяем email и пароль в зависимости от типа пользователя
  if (userType === 'default') {
    email = process.env.DEFAULT_USER_EMAIL || 'oleksiihaidukqa@gmail.com';
    password = process.env.DEFAULT_USER_PASSWORD || 'Q123q123_';
  } else if (userType === 'carUser') {
    email = process.env.CAR_USER_EMAIL || 'carEmail@test.com';
    password = process.env.CAR_USER_PASSWORD || 'Q123q123_';
  } else {
    throw new Error(`Unknown userType: ${userType}`);
  }

  const loginResponse = await apiContext.post('api/auth/signin', {
    data: {
      email,
      password,
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

  return apiContext;
}