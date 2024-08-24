import { request, expect } from '@playwright/test';

// Функция для авторизации пользователя и получения контекста API
export async function getAuthorizedContext() {
  const apiContext = await request.newContext();

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

  return apiContext;
}