// Import Playwright test and assertion utilities
const {test, expect} = require('@playwright/test');

// Page Object Model for the Cart page
// Handles cart validation and checkout actions
class CartPage {
  // Constructor receives the Playwright page instance
  constructor(page) {
    // Store the page object for further interactions
    this.page = page;

    // Locator for the first product listed in the cart
    this.cartProducts = page.locator("div li").first();

    // Locator for product title text (used for validations/debugging)
    this.productsText = page.locator(".card-body b");

    // Locator for the Cart navigation link
    this.cart =  page.locator("[routerlink*='cart']");

    // Locator for the Orders navigation button
    this.orders = page.locator("button[routerlink*='myorders']");

    // Locator for the Checkout button on the cart page
    this.checkout = page.locator("text=Checkout");
  }

  // Verifies that the specified product is displayed in the cart
  async VerifyProductIsDisplayed(productName)
  {
      // Wait until cart products are loaded and visible
      await this.cartProducts.waitFor();

      // Check if the expected product is visible in the cart
      const bool = await this.getProductLocator(productName).isVisible();

      // Assert that the product is present in the cart
      expect(bool).toBeTruthy();
  }

  // Clicks on the Checkout button to proceed with order placement
  async Checkout()
  {
      // Trigger checkout action
      await this.checkout.click();
  }

  // Returns a locator for a cart product based on product name
  getProductLocator(productName)
  {
      // Locate the product heading that matches the given product name
      return this.page.locator("h3:has-text('"+productName+"')");
  }
}

// Export the CartPage class for use in test files
module.exports = { CartPage };
