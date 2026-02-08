// Page Object Model for the Orders History page
// Handles order search and order detail navigation
class OrdersHistoryPage
{
    // Constructor receives the Playwright page instance
    constructor(page)
    {
        // Store the page object for further interactions
        this.page = page;

        // Locator for the orders table body
        this.ordersTable = page.locator("tbody");

        // Locator for all rows present in the orders table
        this.rows = page.locator("tbody tr");

        // Locator for the order ID text displayed on the order details page
        this.orderdIdDetails = page.locator(".col-text");
    }

    // Searches for a specific order ID in the table and selects it
    async searchOrderAndSelect(orderId)
    {
        // Wait until the orders table is fully loaded
        await this.ordersTable.waitFor();

        // Iterate through each row in the orders table
        for(let i =0; i<await this.rows.count(); ++i)
        {
            // Fetch the order ID text from the current row
            const rowOrderId = await this.rows.nth(i).locator("th").textContent();

            // Check if the given order ID matches the row order ID
            if (orderId.includes(rowOrderId))
            {
                // Click the first button in the matched row to view order details
                await this.rows.nth(i).locator("button").first().click();

                // Exit loop once the matching order is found and selected
                break;
            }
        }
    }

    // Retrieves the order ID displayed on the order details page
    async getOrderId()
    {
        // Return the order ID text content
        return await this.orderdIdDetails.textContent();
    }
}

// Export the OrdersHistoryPage class for use in test files
module.exports = {OrdersHistoryPage};
