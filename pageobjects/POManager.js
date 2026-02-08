// Import all Page Object classes used in the application
const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashboardPage');
const {OrdersHistoryPage} = require('./OrdersHistoryPage');
const {OrdersReviewPage} = require('./OrdersReviewPage');
const {CartPage} = require('./CartPage');

// Page Object Manager (POM Manager)
// Centralized factory to create and provide page object instances
class POManager
{
    // Constructor receives the Playwright page instance
    constructor(page)
    {
        // Store the Playwright page object
        this.page = page;

        // Initialize Login page object
        this.loginPage = new LoginPage(this.page);

        // Initialize Dashboard page object
        this.dashboardPage = new DashboardPage(this.page);

        // Initialize Orders History page object
        this.ordersHistoryPage = new OrdersHistoryPage(this.page);

        // Initialize Orders Review page object
        this.ordersReviewPage = new OrdersReviewPage(this.page);

        // Initialize Cart page object
        this.cartPage = new CartPage(this.page);
    }

    // Returns the LoginPage instance
    getLoginPage()
    {
        return this.loginPage;
    }

    // Returns the CartPage instance
    getCartPage()
    {
        return this.cartPage;
    }

    // Returns the DashboardPage instance
    getDashboardPage()
    {
        return this.dashboardPage;
    }

    // Returns the OrdersHistoryPage instance
    getOrdersHistoryPage()
    {
        return this.ordersHistoryPage;
    }

    // Returns the OrdersReviewPage instance
    getOrdersReviewPage()
    {
        return this.ordersReviewPage;
    }
}

// Export the POManager class for use in test files
module.exports = {POManager};
