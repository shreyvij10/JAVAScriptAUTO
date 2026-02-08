// Import Playwright assertion library
const { expect } = require("@playwright/test");

// Orders Review Page Object class
class OrdersReviewPage
{
  // Constructor receives Playwright page instance
  constructor(page)
  {
    // Store page reference
    this.page = page;

    // Country input field (used for auto-suggest search)
    this.country = page.locator("[placeholder*='Country']");

    // Dropdown container that shows country suggestions
    this.dropdown = page.locator(".ta-results");

    // Logged-in user email field (first textbox under user section)
    this.emailId = page.locator(".user__name [type='text']").first();

    // "Place Order" / Submit button
    this.submit =  page.locator(".action__submit");

    // Order confirmation heading text after successful order
    this.orderConfirmationText = page.locator(".hero-primary");

    // Order ID text displayed on confirmation page
    this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
  }

  // Method to search country using partial text and select exact match
  async searchCountryAndSelect(countryCode, countryName)
  {
    // Type partial country code with delay to trigger auto-suggestions
    await this.country.type(countryCode, { delay: 100 });

    // Wait for dropdown suggestions to appear
    await this.dropdown.waitFor();

    // Get total number of country options displayed
    const optionsCount = await this.dropdown.locator("button").count();

    // Loop through each option in the dropdown
    for (let i = 0; i < optionsCount; ++i)
    {
      // Read visible text of the current option
      const text = await this.dropdown.locator("button").nth(i).textContent();

      // Check if option text matches the expected country name
      if (text.trim() === countryName)
      {
        // Click on the matching country option
        await this.dropdown.locator("button").nth(i).click();
        break; // Exit loop once correct country is selected
      }
    }
  }

  // Method to verify logged-in user's email on Orders Review page
  async VerifyEmailId(username)
  {
    // Assert that displayed email matches expected username
    await expect(this.emailId).toHaveText(username);
  }

  // Method to submit the order and return generated Order ID
  async SubmitAndGetOrderId()
  {
    // Click on Place Order button
    await this.submit.click();

    // Verify successful order confirmation message
    await expect(this.orderConfirmationText)
      .toHaveText(" Thankyou for the order. ");

    // Extract and return the Order ID text
    return await this.orderId.textContent();
  }
}

// Export OrdersReviewPage class for use in tests
module.exports = { OrdersReviewPage };
