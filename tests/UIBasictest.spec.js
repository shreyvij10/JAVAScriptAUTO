const {test,expect} = require('@playwright/test'); // Import test and expect from Playwright for writing and asserting tests
//test('First Playwright Test', function() // Commented out: Alternative test definition using function syntax
test('Browser Context Playwright Test', async ({browser}) => // Define a test named 'Browser Context Playwright Test' using browser context
    { // Start of test function
            const context  = await browser.newContext(); // Create a new browser context for isolation
            const page = await context.newPage(); // Create a new page in the context
            await page.goto("https://rahulshettyacademy.com"); // Navigate to the specified URL
            console.log( await page.title()); // Log the title of the page
    }); // End of test function
// if you want to run multiple tests in a single file // Comment explaining multiple tests in one file
test('Page Playwright Test', async ({page}) => // Define a test named 'Page Playwright Test' using page fixture
    { // Start of test function
            await page.goto("https://google.com"); // Navigate to the specified URL
            console.log( await page.title()); // Log the title of the page
            //expect( await page.title()).toBe("Google"); // Commented out: Assert that the title is exactly "Google"
            await expect(page).toHaveTitle(/Google/); // Assert that the page title contains "Google" using regex

    }); // End of test function
 /* // Start of multi-line comment
    //if you want to run only this test and ignore others use 'only' // Comment explaining test.only usage
test.only('Only Page to  Playwright Test', async ({page}) => // Commented out: Define a test that runs only this one, using page fixture
    { // Start of test function
            await page.goto("https://www.youtube.com/"); // Navigate to the specified URL
            console.log( await page.title()); // Log the title of the page
    }); // End of test function
*/ // End of multi-line comment