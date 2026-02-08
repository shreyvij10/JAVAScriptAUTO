// Import Playwright test utilities
const { test, expect } = require('@playwright/test');

// Import Page Object Manager
const { POManager } = require('../pageobjects/POManager');

// Load test data from JSON file (array of objects)
const dataset = JSON.parse(
  JSON.stringify(require('../utils/placeorderTestData.json'))
);

// Run test once for each data set
for (const data of dataset) {

  test(`ImplementingParameterizationRunningTestsWithDifferentDataetsClientAppPO - ${data.username}`, async ({ page }) => {

    // Initialize Page Object Manager
    const poManager = new POManager(page);

    // ---------------- LOGIN FLOW ----------------

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);

    // ---------------- DASHBOARD FLOW ----------------

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();

    // ---------------- CART FLOW ----------------

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    // ---------------- ORDERS REVIEW FLOW ----------------

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");

    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log("Order ID:", orderId);

    // ---------------- ORDER HISTORY FLOW ----------------

    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);

    const historyOrderId = await ordersHistoryPage.getOrderId();
    expect(orderId.includes(historyOrderId)).toBeTruthy();

  });

}
