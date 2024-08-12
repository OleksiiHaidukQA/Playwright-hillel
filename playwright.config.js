import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import { USER1_STORAGE_STATE_PATH } from './data/constants';

dotenv.config();

export default defineConfig({
  testDir: './tests',
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
    storageState: USER1_STORAGE_STATE_PATH, 
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
      },
    },
  ],
});