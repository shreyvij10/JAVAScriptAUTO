// Import Playwright test utilities
const { test, expect } = require('@playwright/test');

// Import Page Object Manager
const { POManager } = require('../pageobjects/POManager');

// Load test data from JSON file
// JSON.parse(JSON.stringify()) ensures a deep copy (safe for mutations)
const dataset = JSON.parse(
  JSON.stringify(require('../utils/placeorderTestData.json'))
);

test('DataFromextenaljsonfile_ClientApplogin', async ({ page }) => {

  // Initialize Page Object Manager with Playwright page
  const poManager = new POManager(page);

  // ---------------- LOGIN FLOW ----------------

  // Get Login Page object
  const loginPage = poManager.getLoginPage();

  // Navigate to application URL
  await loginPage.goTo();

  // Perform login using credentials from JSON
  await loginPage.validLogin(dataset.username, dataset.password);

  // ---------------- DASHBOARD FLOW ----------------

  // Get Dashboard Page object
  const dashboardPage = poManager.getDashboardPage();

  // Search for product and add it to cart
  await dashboardPage.searchProductAddCart(dataset.productName);

  // Navigate to cart page
  await dashboardPage.navigateToCart();

  // ---------------- CART FLOW ----------------

  // Get Cart Page object
  const cartPage = poManager.getCartPage();

  // Verify selected product is displayed in cart
  await cartPage.VerifyProductIsDisplayed(dataset.productName);

  // Proceed to checkout
  await cartPage.Checkout();

  // ---------------- ORDERS REVIEW FLOW ----------------

  // Get Orders Review Page object
  const ordersReviewPage = poManager.getOrdersReviewPage();

  // Search and select country (partial text + full country name)
  await ordersReviewPage.searchCountryAndSelect("ind", "India");

  // Submit order and capture generated Order ID
  const orderId = await ordersReviewPage.SubmitAndGetOrderId();

  // Log Order ID for debugging / reporting
  console.log("Order ID:", orderId);

  // ---------------- ORDER HISTORY FLOW ----------------

  // Navigate to Orders page from dashboard
  await dashboardPage.navigateToOrders();

  // Get Orders History Page object
  const ordersHistoryPage = poManager.getOrdersHistoryPage();

  // Search order using Order ID and open it
  await ordersHistoryPage.searchOrderAndSelect(orderId);

  // Validate that Order ID matches between confirmation and history
  const historyOrderId = await ordersHistoryPage.getOrderId();
  expect(orderId.includes(historyOrderId)).toBeTruthy();

});
