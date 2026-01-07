// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config=({
  testDir: './tests',
  testMatch: ['**/*.js', '**/*.spec.js'],

  // Default timeout for each test
  timeout: 40 * 1000,

  // Expect timeout
  expect: {
    timeout: 40 * 1000,
  },

  // Reporter
  reporter: 'html',

  // Shared settings for all projects
  use: {
    browserName: 'chromium',
    headless: true,
  },
});
module.exports = config;
