import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import { USER1_STORAGE_STATE_PATH } from './data/constants';

dotenv.config();

export default defineConfig({

  testMatch: [
    //'**/tests/profile/profile.mock.spec.js',
    '**/tests/api/*.api.spec.js',
    //'**/tests/expenses.spec.js', 
  ],
  testIgnore: '**/tests/**/*.skip.spec.js',
  globalSetup: './global.setup.js',
  globalTeardown: './global.teardown.js',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 3,
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  use: {
    headless: false,
    baseURL: process.env.BASE_URL,
    httpCredentials: {
      username: process.env.USERNAME,
      password: process.env.PASSWORD
    },
    viewport: {
      width: 1920,
      height: 1080
    },
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'setup',
      testMatch: 'tests/setup/saveStorageState.js', 
    },
    {
      name: 'chromium',
      dependencies: ['setup'], 
      use: {
        ...devices['Desktop Chrome'],
        storageState: USER1_STORAGE_STATE_PATH,
      },
    },
    {
      name: 'api-tests',  // Новый проект для API тестов
      use: {
        baseURL: process.env.BASE_URL_API,  // Убедитесь, что это значение корректно в .env
        extraHTTPHeaders: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
      },
    },
  ],
});