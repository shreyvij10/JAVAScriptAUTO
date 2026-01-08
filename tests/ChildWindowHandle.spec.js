const { test, expect } = require('@playwright/test'); // Import test and expect from Playwright for writing and asserting tests

test('Child windows hadle', async ({browser})=> // Define a test named 'Child windows hadle' using browser context
 { // Start of test function
    const context = await browser.newContext(); // Create a new browser context for isolation
    const page =  await context.newPage(); // Create a new page in the context
    const userName = page.locator('#username'); // Locate the username input field by ID (though not used directly here)
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); // Navigate to the specified URL
    const documentLink = page.locator("[href*='documents-request']"); // Locate the link element containing 'documents-request' in href
 
    const [newPage]=await Promise.all( // Use Promise.all to handle asynchronous operations simultaneously
   [ // Array of promises
      context.waitForEvent('page'), // Listen for a new page event (child window/tab opening)
      documentLink.click(), // Click the document link to open the new page
   
   ]) // Resolve when both promises complete, capturing the new page in newPage
   
 
   const  text = await newPage.locator(".red").textContent(); // Get the text content of the element with class 'red' on the new page
    const arrayText = text.split("@") // Split the text at '@' to get an array
    const domain =  arrayText[1].split(" ")[0] // Split the second part at space and take the first element as domain
    //console.log(domain); // Commented out: Log the domain
    await page.locator("#username").fill(domain); // Fill the username field on the original page with the extracted domain
    console.log(await page.locator("#username").inputValue()); // Log the current value of the username input field
 
 }) // End of test function