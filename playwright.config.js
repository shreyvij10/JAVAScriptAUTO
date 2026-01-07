// @ts-check // Enable TypeScript checking for this JavaScript file

/**
 * @see https://playwright.dev/docs/test-configuration // Reference to Playwright documentation for configuration
 */
const config=({ // Define the configuration object for Playwright tests
  testDir: './tests', // Specify the directory where test files are located
  testMatch: ['**/*.js', '**/*.spec.js'], // Patterns to match test files (includes .js and .spec.js files)

  // Default timeout for each test // Comment indicating timeout setting
  timeout: 40 * 1000, // Set the default timeout for tests to 40 seconds

  // Expect timeout // Comment indicating expect timeout
  expect: { // Configure expectations
    timeout: 40 * 1000, // Set the timeout for expect assertions to 40 seconds
  },

  // Reporter // Comment indicating reporter setting
  reporter: 'html', // Use HTML reporter for test results

  // Shared settings for all projects // Comment indicating shared use settings
  use: { // Configure shared browser settings
    browserName: 'chromium', // Use Chromium browser
    headless: true, // Run tests in headless mode (no UI)
  },
}); // End of config object
module.exports = config; // Export the config object as a CommonJS module