const {test,expect} = require('@playwright/test'); // Import test and expect from Playwright for writing and asserting tests
test('Login page Practice', async ({browser})=> // Define a test named 'Login page Practice' that runs only this test, using browser context
{ // Start of test function
    const context = await browser.newContext(); // Create a new browser context for isolation
    const page =  await context.newPage(); // Create a new page in the context
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); // Navigate to the specified URL
    const userName = page.locator('#username'); // Locate the username input field by ID
    const password = page.locator('#password'); // Locate the password input field by ID
    const signIn = page.locator('#signInBtn'); // Locate the sign-in button by ID
    const cardTitle = page.locator(".card-title a"); // Locate the card title links by CSS selector
    //page.pause(); // Commented out: Pause the test for manual inspection

    //CSS // Comment indicating the following uses CSS selectors
    await userName.fill("rahulshetty"); // Fill the username field with "rahulshetty"
    await password.fill("learning"); // Fill the password field with "learning"
    await signIn.click(); // Click the sign-in button
    console.log( await page.locator("[style*='block']").textContent()); // Log the text content of the element with style containing 'block'
    await expect(page.locator("[style*='block']")).toContainText("Incorrect"); // Assert that the element contains the text "Incorrect"
    //type --fill // Comment indicating fill operation

    await userName.fill(""); // Clear the username field
    await userName.fill("rahulshettyacademy"); // Fill the username field with "rahulshettyacademy"
    await signIn.click(); // Click the sign-in button
    console.log(await cardTitle.first().textContent()); // Log the text content of the first card title
    console.log( await cardTitle.nth(1).textContent()); // Log the text content of the second card title (nth(1))
    const allTitles = await cardTitle.allTextContents(); // Get all text contents of card titles into an array
    console.log(allTitles); // Log the array of all card titles

   
}) // End of test function