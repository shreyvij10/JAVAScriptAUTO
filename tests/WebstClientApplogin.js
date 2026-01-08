const { test, expect } = require('@playwright/test'); // Import test and expect from Playwright for writing and asserting tests

test('Web Client loginPage Playwright Test', async ({ page }) => { // Define a test named 'Web Client loginPage Playwright Test' using page fixture
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login"); // Navigate to the login page URL
    //js file- Login js, DashboardPage // Comment indicating reference to JS files for login and dashboard
    const email = "shreyashish1101@gmail.com"; // Define the email variable for login
    const productName = 'ZARA COAT 3'; // Define the product name to search for
    const products = page.locator(".card-body"); // Locate all product card elements by CSS class 'card-body'
    await page.goto("https://rahulshettyacademy.com/client"); // Navigate to the client dashboard URL (note: this overrides the previous goto)
    await page.locator("#userEmail").fill(email); // Fill the email input field with the defined email
    await page.locator("#userPassword").fill("800386@As"); // Fill the password input field with the password
    await page.locator("[value='Login']").click(); // Click the login button by its value attribute
    await page.waitForLoadState('networkidle'); // Wait for the page to finish loading all network requests
    //await page.locator(".card-body b").first().waitFor(); // Commented out: Wait for the first product title element to appear
    const titles = await page.locator(".card-body b").allTextContents(); // Get all text contents of product titles (b tags inside .card-body) into an array
    console.log(titles); // Log the array of product titles to the console
    const count = await products.count(); // Get the count of product elements
    for (let i = 0; i < count; ++i) { // Loop through each product element
        if (await products.nth(i).locator("b").textContent() === productName) { // Check if the product title matches the target product name
            //add to cart // Comment indicating add to cart action
            await products.nth(i).locator("text= Add To Cart").click(); // Click the 'Add To Cart' button for the matching product
            break; // Exit the loop once the product is added
        }
    }
    //await page.pause(); // Commented out: Pause the test for manual inspection
    await page.locator("[routerlink*='cart']").click(); // Click the cart link by partial routerlink attribute
    //await page.pause(); // Commented out: Pause the test for manual inspection

    await page.locator("div li").first().waitFor(); // Wait for the first list item in a div to appear (cart item)
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); // Check if the h3 element with text 'ZARA COAT 3' is visible
    expect(bool).toBeTruthy(); // Assert that the product is visible in the cart
    await page.locator("text=Checkout").click(); // Click the 'Checkout' button by its text

    //await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 }) // Commented out: Alternative way to type in country field
    await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 }); // Type 'ind' sequentially into the country input field with delay

    const dropdown = page.locator(".ta-results"); // Locate the dropdown results container by CSS class 'ta-results'
    await dropdown.waitFor(); // Wait for the dropdown to appear
    const optionsCount = await dropdown.locator("button").count(); // Get the count of button options in the dropdown
    for (let i = 0; i < optionsCount; ++i) { // Loop through each dropdown option
        const text = await dropdown.locator("button").nth(i).textContent(); // Get the text of the i-th button option
        if (text === " India") { // Check if the text matches ' India' (with space)
            await dropdown.locator("button").nth(i).click(); // Click the matching country option
            break; // Exit the loop once selected
        }
    }
    expect(page.locator(".user__name [type='text']").first()).toHaveText(email); // Assert that the first text input in user name section has the email
    await page.locator(".action__submit").click(); // Click the submit button by CSS class 'action__submit'
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. "); // Assert that the hero text shows order confirmation
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent(); // Get the order ID text from the element
    console.log(orderId); // Log the order ID to the console

    await page.locator("button[routerlink*='myorders']").click(); // Click the 'My Orders' button by partial routerlink attribute
    await page.locator("tbody").waitFor(); // Wait for the table body to appear
    const rows = await page.locator("tbody tr"); // Locate all table rows in the body

    for (let i = 0; i < await rows.count(); ++i) { // Loop through each row in the orders table
        const rowOrderId = await rows.nth(i).locator("th").textContent(); // Get the order ID from the table header cell in the row
        if (orderId.includes(rowOrderId)) { // Check if the current order ID includes the row's order ID
            await rows.nth(i).locator("button").first().click(); // Click the first button in the matching row (view order details)
            break; // Exit the loop once found
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent(); // Get the order ID details text
    expect(orderId.includes(orderIdDetails)).toBeTruthy(); // Assert that the order ID matches the details
    await page.pause(); // Pause the test for manual inspection
}); // End of test function