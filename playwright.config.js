import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({

  testMatch: '**/tests/registration.spec.js',
  testIgnore: '**/tests/**/*.skip.spec.js',
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
    viewport: { width: 1920, height: 1080 },
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
      name: 'stage',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.BASE_URL,
      },
    },
  ],
    {
      name: 'dev',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://qauto2.forstudy.space/',
      },
    }
  ]
});