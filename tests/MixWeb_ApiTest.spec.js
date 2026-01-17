// Import necessary testing utilities and modules from Playwright
const { test, expect, request } = require('@playwright/test'); 

// Define login credentials payload with email and password
const loginPayload = {userEmail:"shreyashish1101@gmail.com", userPassword:"800386@As"};

// Define order creation payload with country and product ID
const orderPayload = {orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]};

// Declare variable to store authentication token from login response
let token;

// Declare variable to store order ID from order creation response
let orderId;

// Define a setup hook that runs once before all tests in this file
test.beforeAll( async () => {
    // Create a new API context for making HTTP requests without browser
    const apiContext = await request.newContext();
    
    // Send POST request to login endpoint with login credentials
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
        {
        // Include login payload in request body
        data: loginPayload
        });
    
    // Assert that login response status is successful (200-299)
    expect(loginResponse.ok()).toBeTruthy();
    
    // Parse login response body as JSON to extract token
    const responseJson = await loginResponse.json();
    
    // Store the authentication token from response for future API requests
    token = responseJson.token;
    
    // Log the token to console for debugging purposes
    console.log("Auth Token:", token);

    // Send POST request to create order endpoint with order payload and auth token
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        // Include order payload in request body
        data: orderPayload,
        // Include authorization header with token and content type header
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    });
    
    // Parse order response body as JSON to extract order details
    const orderResponseJson = await orderResponse.json();
    
    // Log the order response to console for debugging purposes
    console.log("Order Response:", orderResponseJson);
    
    // Extract and store the first order ID from order response
    orderId = orderResponseJson.orders[0];
    
    // Log the order ID to console for debugging purposes
    console.log("Order ID:", orderId);
});

// Define a hook that runs before each test (currently empty, no setup needed per test)
test.beforeEach( async ({ page }) => {
});

// Define the main test case for mixed web and API testing
test("Mix Web & Api Test", async ({ page }) => {
    
    // Inject authentication token into browser local storage before page navigation
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token); // Pass token as parameter to the script

    // Store email address for later assertion
    const email = "shreyashish1101@gmail.com";
    
    // Store product name to search for during shopping
    const productName = 'ZARA COAT 3';
    
    // Create locator for product card containers on the page
    const products = page.locator(".card-body");
    
    // Navigate to the e-commerce application URL
    await page.goto("https://rahulshettyacademy.com/client");
    
    // Get all product titles from cards and log to console (commented out section)
    /*
    const title = await page.locator(".card-body b").allTextContents();
    console.log(title);
    
    // Count total number of product cards on page
    const count = await products.count();
    
    // Loop through each product card to find the target product
    for (let i = 0; i < count; ++i) {
        // Check if current product name matches target product name
        if (await products.nth(i).locator("b").textContent() === productName) {
            // Click "Add To Cart" button for matching product
            await products.nth(i).locator("text= Add To Cart").click();
            // Exit loop after finding and adding product
            break;
        }
    }
    
    // Click on cart icon to navigate to cart page
    await page.locator("[routerlink*='cart']").click();

    // Wait for cart items to load (wait for first li element)
    await page.locator("div li").first().waitFor();
    
    // Check if the added product is visible in cart
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    
    // Assert that the product is visible in the cart
    expect(bool).toBeTruthy();
    
    // Click on Checkout button to proceed to checkout page
    await page.locator("text=Checkout").click();

    // Type "ind" in country input field with delay between each character
    await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });

    // Create locator for country dropdown results
    const dropdown = page.locator(".ta-results");
    
    // Wait for dropdown to appear on the page
    await dropdown.waitFor();
    
    // Count the number of country options in dropdown
    const optionsCount = await dropdown.locator("button").count();
    
    // Loop through each dropdown option to find India
    for (let i = 0; i < optionsCount; ++i) {
        // Get text content of current dropdown option
        const text = await dropdown.locator("button").nth(i).textContent();
        
        // Check if current option is "India"
        if (text === " India") {
            // Click on India option in dropdown
            await dropdown.locator("button").nth(i).click();
            // Exit loop after selecting India
            break;
        }
    }
    
    // Assert that email field contains the expected email address
    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    
    // Click the Submit button to complete the order
    await page.locator(".action__submit").click();
    
    // Assert that success message is displayed after order submission
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    
    // Extract order ID from the success page
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    
    // Log the order ID to console
    console.log(orderId);
*/
    
    // Click on "My Orders" button to navigate to orders page
    await page.locator("button[routerlink*='myorders']").click();
    
    // Wait for orders table to load on the page
    await page.locator("tbody").waitFor();
    
    // Create locator for all table rows in orders table
    const rows = await page.locator("tbody tr");

    // Loop through each row in the orders table
    for (let i = 0; i < await rows.count(); ++i) {
        // Extract order ID from the th element of current row
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        
        // Check if the row order ID matches the order ID created via API
        if (orderId.includes(rowOrderId)) {
            // Click the first button (View) in the matching row
            await rows.nth(i).locator("button").first().click();
            // Exit loop after finding and clicking on matching order
            break;
        }
    }
    
    // Extract order ID from the order details page
    const orderIdDetails = await page.locator(".col-text").textContent();
    
    // Assert that the API created order ID is present in the order details
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
    
    // Pause the test execution for manual debugging (useful for viewing state)
    await page.pause();
});
