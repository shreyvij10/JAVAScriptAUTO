// Page Object Model for the Dashboard page
// Handles product listing, cart actions, and navigation
class DashboardPage
{
    // Constructor receives the Playwright page instance
    constructor(page)
    {
        // Store the page object for further interactions
        this.page = page;

        // Locator for all product cards displayed on the dashboard
        this.products = page.locator(".card-body");

        // Locator for product title text within each product card
        this.productsText = page.locator(".card-body b");

        // Locator for the Cart navigation link
        this.cart =  page.locator("[routerlink*='cart']");

        // Locator for the Orders navigation button
        this.orders = page.locator("button[routerlink*='myorders']");
    }

    // Searches for a given product by name and adds it to the cart
    async searchProductAddCart(productName)
    {
        // Fetch all product titles as an array of text values
        const titles= await this.productsText.allTextContents();

        // Log product titles for debugging or validation purposes
        console.log(titles);

        // Get the total number of products displayed on the dashboard
        const count = await this.products.count();

        // Iterate through each product card
        for(let i =0; i < count; ++i)
        {
            // Check if the current product title matches the expected product name
            if(await this.products.nth(i).locator("b").textContent() === productName)
            {
                // Click on "Add To Cart" for the matched product
                await this.products.nth(i).locator("text= Add To Cart").click();

                // Exit the loop once the product is added to the cart
                break;
            }
        }
    }

    // Navigates to the Orders page
    async navigateToOrders()
    {
        // Click on the Orders button
        await this.orders.click();
    }

    // Navigates to the Cart page
    async navigateToCart()
    {
        // Click on the Cart link
        await this.cart.click();
    }
}

// Export the DashboardPage class for use in test files
module.exports = {DashboardPage};
