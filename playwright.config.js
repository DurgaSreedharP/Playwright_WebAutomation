// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : undefined,//parallel instance
  globalTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  
    

 // reporter: 'html',
 reporter: [
  [
    "allure-playwright",
    {
      detail: true,
      outputFolder: "my-allure-results",
      suiteTitle: false,
    },
  ],
],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    contextOptions:{
      ignoreHTTPSErrors: true,
    },
    baseURL: 'https://murrayapi-uat.grays.com.au/data/api/graphql/',
    
    screenshot:"only-on-failure",
    env: {
      authorizationToken: ' eyJhbGciOiJIUzI1NiIsImtpZCI6IjE5RjExNDAwLTI0MDAtNDYxNC04RDRELTgwMjczNjVFRDg2NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtdXJyYXktYXBpIiwianRpIjoiYTJlMjcwNjQtNGFmMi00MDIwLWE2ZDUtNTU5NmFjYzNhMWM0IiwiaWF0IjoxNzE1MDUzMDAyLCJTY29wZSI6Im11cnJheS1hcGkiLCJVc2VySWQiOiI2YTQzNmFhNC1iMTgyLTQxMjMtOTNiZC0xZGQ3OGY5OWMyMDMiLCJuYmYiOjE3MTUwNTMwMDIsImV4cCI6MTc3ODEyNTAwMiwiaXNzIjoiVW5pdmVyc2FsQXV0aFNlcnZlciIsImF1ZCI6IkFueW9uZUNvbnN1bWluZ0FQSSJ9.Q1pRON2d_W4RuAI6G-e20UwClGH7H8LOltZjbp1Ty0Y',
   },
     //executed file is saved in a Zip file(ScreenShots)
  },
  

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    // {
    //    name: 'firefox',
    //      use: { ...devices['Pixel 5'] }, 
    //  },
   
    
      
    

    /* Test against mobile viewports. */
    {
    name: 'mobile',
    use: {
      viewport: { width: 375, height: 667 }, 
      isMobile: true, 
      hasTouch: true, 
    }
  },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
  
});

