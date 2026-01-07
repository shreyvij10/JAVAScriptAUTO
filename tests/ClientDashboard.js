const { test, expect } = require('@playwright/test'); // Import test and expect from Playwright for writing and asserting tests



//if you want to run only this test and ignore others use 'only' // Comment explaining test.only usage
test.only('Web Client loginPage Playwright Test', async ({ page }) => { // Define a test named 'Web Client loginPage Playwright Test' that runs only this test, using page fixture
        await page.goto("https://rahulshettyacademy.com/client/#/auth/login"); // Navigate to the login page URL
        //email login step // Comment indicating email filling step
        await page.locator("#userEmail").fill("shreyashish1101@gmail.com"); // Fill the email input field with the specified email
        //password login step // Comment indicating password filling step
        await page.locator("#userPassword").fill("800386@As"); // Fill the password input field with the specified password
        //click login button // Comment indicating login button click
        await page.locator("#login").click(); // Click the login button
        //print all page titles // Comment indicating printing titles
        //await page.waitForLoadState('networkidle'); // Commented out: Wait for the page to reach network idle state
        await page.locator(".card-body b").first().waitFor(); // Wait for the first element with class 'card-body b' to appear
        const titles = await page.locator(".card-body b").allTextContents(); // Get all text contents of elements with class 'card-body b' into an array
        console.log(titles); // Log the array of titles to the console



        
}); // End of test function