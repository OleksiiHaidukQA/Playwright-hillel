import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  //testDir: './tests',
  testMatch: '/tests/**/*.spec.js',
  testIgnore: '/tests/**/*.skip.spec.js',
  globalSetup: process.env.ENV === 'stage' ? './global.setup.js' : undefined,
  globalTeardown: './global.teardown.js',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Rretries: 1,
  /* Opt out of parallel tests on CI. */
  workers: 3,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  use: {
    headless: false,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://qauto.forstudy.space/',
    httpCredentials: {
      username: 'guest',
      password: 'welcome2qauto'
    },
    viewport: {
      width: 1920,
      height: 1080
    },
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    // video: 'on',
    screenshot: 'only-on-failure'
  },
  /* Configure projects for major browsers */
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
        baseURL: 'https://qauto.forstudy.space/',
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
    }],
  // projects: [
  //   {
  //     name: 'Chromium',
  //     use: { browserName: 'chromium', headless: true, baseURL: 'https://example.com' },
  //   },
  //   {
  //     name: 'Firefox',
  //     use: { browserName: 'firefox', headless: true, baseURL: 'https://example.com' },
  //   },
  //   {
  //     name: 'WebKit',
  //     use: { browserName: 'webkit', headless: true, baseURL: 'https://example.com' },
  //   },
  //   {
  //     name: 'Edge',
  //     use: { browserName: 'chromium', headless: true, baseURL: 'https://example.com' },
  //   },
  // ],
});