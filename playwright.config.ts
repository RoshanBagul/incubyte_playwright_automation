import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './features',
  timeout: 30_000,
  fullyParallel: false,
  retries: 0,

  reporter: [
    ['list'],
    ['html', { outputFolder: 'test-outputs/playwright-report', open: 'never' }],
  ],

  use: {
    baseURL: 'https://parabank.parasoft.com/',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // Headless only in CI
    headless: !!process.env.CI,
  },

  projects: [
    {
      name: 'chromium',

      use: {
        ...devices['Desktop Chrome'],

        // Better for CI
        viewport: {
          width: 1920,
          height: 1080,
        },

        // Only maximize locally
        launchOptions: process.env.CI
          ? {}
          : {
              args: ['--start-maximized'],
            },
      },
    },
  ],
});