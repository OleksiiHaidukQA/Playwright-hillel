import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests', // Указание директории с тестами
  globalSetup: './global.setup.js',
  globalTeardown: './global.teardown.js',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 3,
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  use: {
    headless: false,
    baseURL: process.env.BASE_URL,
    storageState: 'storageState.json',
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
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});