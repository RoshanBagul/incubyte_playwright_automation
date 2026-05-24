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
    headless: false,
  },

  projects: [
    {
      name: 'chromium',

      use: {
        ...devices['Desktop Chrome'],

        viewport: null,

        launchOptions: {
          args: ['--start-maximized'],
        },
      },
    },
  ],
});