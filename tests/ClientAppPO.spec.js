// Import Playwright test runner and assertion utilities
const {test, expect} = require('@playwright/test');

// Import Page Object Manager to access all page objects
const {POManager} = require('../pageobjects/POManager');

// End-to-end test for client application login and order flow
test('Client App login', async ({page})=>
{
    // Create an instance of Page Object Manager
    const poManager = new POManager(page);

    // Test data: user credentials and product details
    // js file- Login js, DashboardPage
    const username = "shreyashish1101@gmail.com";
    const password = "800386@As"
    const productName = 'ZARA COAT 3';

    // Locator for all product cards (used implicitly on dashboard)
    const products = page.locator(".card-body");

    // Get LoginPage object from POManager
    const loginPage = poManager.getLoginPage();

    // Navigate to application URL
    await loginPage.goTo();

    // Perform login using valid credentials
    await loginPage.validLogin(username,password);

    // Get DashboardPage object from POManager
    const dashboardPage = poManager.getDashboardPage();

    // Search for the product and add it to the cart
    await dashboardPage.searchProductAddCart(productName);

    // Navigate to the Cart page
    await dashboardPage.navigateToCart();

    // Get CartPage object from POManager
    const cartPage = poManager.getCartPage();

    // Verify that the selected product is displayed in the cart
    await cartPage.VerifyProductIsDisplayed(productName);

    // Proceed to checkout
    await cartPage.Checkout();

    // Get OrdersReviewPage object from POManager
    const ordersReviewPage = poManager.getOrdersReviewPage();

    // Search and select country during checkout
    await ordersReviewPage.searchCountryAndSelect("ind","India");

    // Submit the order and capture the generated order ID
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();

    // Log the order ID for debugging or reference
    console.log(orderId);

    // Navigate to Orders page from dashboard
    await dashboardPage.navigateToOrders();

    // Get OrdersHistoryPage object from POManager
    const ordersHistoryPage = poManager.getOrdersHistoryPage();

    // Search for the placed order using order ID and open its details
    await ordersHistoryPage.searchOrderAndSelect(orderId);

    // Validate that the order ID matches between history and details page
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

    // Test flow completed: login → add product → checkout → order validation
});
