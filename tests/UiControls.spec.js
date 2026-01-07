const { test, expect } = require('@playwright/test'); // Import test and expect from Playwright for writing and asserting tests

test.only('UI Controls', async ({ browser }) => { // Define a test named 'UI Controls' that runs only this test, using browser context
    const context = await browser.newContext(); // Create a new browser context for isolation
    const page = await context.newPage(); // Create a new page in the context
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); // Navigate to the specified URL
    const userName = page.locator('#username'); // Locate the username input field by ID
    const password = page.locator('#password'); // Locate the password input field by ID
    const signIn = page.locator('#signInBtn'); // Locate the sign-in button by ID
    const dropdown = page.locator("select.form-control"); // Locate the dropdown select element by CSS selector
    await dropdown.selectOption("consult"); // Select the "consult" option from the dropdown
    //await expect(dropdown).toHaveValue("consult"); // Commented out: Assert that the dropdown has the value "consult"
    //await page.locator(".radiotextsty").last().click(); // Commented out: Click the last radio button with class "radiotextsty"
    await page.locator("span.radiotextsty").nth(1).click(); // Click the second radio button (index 1) within span elements with class "radiotextsty"
    await page.locator("#okayBtn").click(); // Click the OK button by ID
    //await page.pause(); // Commented out: Pause the test for manual inspection
    console.log(await page.locator(".radiotextsty").nth(1).isChecked()); // Log whether the second radio button is checked
    await expect(page.locator(".radiotextsty").nth(1)).toBeChecked(); // Assert that the second radio button is checked
    await page.locator("#terms").click(); // Click the terms checkbox by ID
    await expect(page.locator("#terms")).toBeChecked(); // Assert that the terms checkbox is checked
    await page.locator("#terms").uncheck(); // Uncheck the terms checkbox
    expect(await page.locator("#terms").isChecked()).toBeFalsy(); // Assert that the terms checkbox is not checked (falsy)

}); // End of the test function