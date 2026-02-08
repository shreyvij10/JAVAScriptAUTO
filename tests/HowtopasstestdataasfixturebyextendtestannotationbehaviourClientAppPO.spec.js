const { test, expect } = require('@playwright/test');
const { customtest } = require('../utils/test-base');
const { POManager } = require('../pageobjects/POManager');

// json → string → js object
const dataset = JSON.parse(
  JSON.stringify(require('../utils/placeorderTestData.json'))
);

/* ---------------- DATA-DRIVEN TEST USING for..of ---------------- */
for (const data of dataset) {

  test(`Client App login for ${data.productName}`, async ({ page }) => {

    const poManager = new POManager(page);

    // Login
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);

    // Dashboard
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();

    // Cart
    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    // Orders Review
    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log("Order ID:", orderId);

    // Orders History
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);

    const historyOrderId = await ordersHistoryPage.getOrderId();
    expect(orderId.includes(historyOrderId)).toBeTruthy();
  });

}

/* ---------------- CUSTOM TEST USING test-base ---------------- */
customtest.only('Client App login', async ({ page, testDataForOrder }) => {

  const poManager = new POManager(page);

  // Login
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(
    testDataForOrder.username,
    testDataForOrder.password
  );

  // Dashboard
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(testDataForOrder.productName);
  await dashboardPage.navigateToCart();

  // Cart
  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
  await cartPage.Checkout();

  // Orders Review
  const ordersReviewPage = poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("ind", "India");
  const orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log("Order ID:", orderId);

  // Orders History
  await dashboardPage.navigateToOrders();
  const ordersHistoryPage = poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(orderId);

  const historyOrderId = await ordersHistoryPage.getOrderId();
  expect(orderId.includes(historyOrderId)).toBeTruthy();
});
