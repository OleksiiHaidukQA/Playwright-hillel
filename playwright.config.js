import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testMatch: '/tests/**/*.spec.js',
  testIgnore: '/tests/**/*.skip.spec.js',
  globalSetup: process.env.ENV === 'stage' ? './global.setup.js' : undefined,
  globalTeardown: './global.teardown.js',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
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
      name: "setup:stage",
      testMatch: 'tests/setup/**/*.setup.js'
    },
    {
      name: 'teardown:stage',
      testMatch: 'tests/teardown/**/*.teardown.js'
    },
    {
      name: 'stage',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.BASE_URL,
      },
      dependencies: ['setup:stage'],
      teardown: 'teardown:stage'
    },
    {
      name: 'dev',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://qauto2.forstudy.space/',
      },
    }
  ]
});