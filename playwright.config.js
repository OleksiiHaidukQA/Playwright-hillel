import { defineConfig, devices } from '@playwright/test';

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
    baseURL: 'https://qauto.forstudy.space/',
    viewport: { width: 1920, height: 1080 },
    httpCredentials: {
      username: 'guest',
      password: 'welcome2qauto'
    },
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'stage',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://qauto.forstudy.space/',
      },
    },
  ],
});