// Import required modules from Playwright testing framework
const {test, expect, request} = require('@playwright/test');
// Import custom API utilities class for API operations
const {APiUtils} = require('./utils/APiUtils');

// Create an object with login credentials for the test user
const loginPayLoad = {userEmail:"shreyashish1101@gmail.com", userPassword:"800386@As"};
// Create an object with order details including country and product ID
const orderPayLoad = {orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
//{orders:[{country:"Cuba",productOrderedId:"67a8dde5c0d3e6622a297cc8"}]};
 
// Declare a variable to store the API response globally so it can be used in tests
let response;

// Hook that runs once before all tests in this file
test.beforeAll( async()=>
{
   // Create a new API context for making HTTP requests
   const apiContext = await request.newContext();
   // Create an instance of APiUtils and pass the API context and login details
   const apiUtils = new APiUtils(apiContext,loginPayLoad);
   // Call the createOrder method and store the response (contains token and orderId)
   response =  await apiUtils.createOrder(orderPayLoad);
 
})
 
// Test case: Verify that a user can place an order and view it in their order history
test('@API Place the order', async ({page})=>
{ 
    // Add the authentication token to browser's local storage before navigating to the page
    // This allows the page to recognize the user as logged in
    await page.addInitScript(value => {
 
        window.localStorage.setItem('token',value);
    }, response.token );

// Navigate to the orders page of the e-commerce application
await page.goto("https://rahulshettyacademy.com/client");

// Click on the "myorders" button/link to view all user's orders
 await page.locator("button[routerlink*='myorders']").click();

// Wait for the table body (tbody) to load on the page before proceeding
 await page.locator("tbody").waitFor();

// Get all rows from the orders table
const rows = await page.locator("tbody tr");
 
// Loop through each row in the table to find the matching order
for(let i =0; i<await rows.count(); ++i)
{
   // Extract the order ID from the first column (th) of the current row
   const rowOrderId =await rows.nth(i).locator("th").textContent();
   
   // Check if the current row's order ID matches the order we just created
   if (response.orderId.includes(rowOrderId))
   {
       // Click the view/details button in that row
       await rows.nth(i).locator("button").first().click();
       // Exit the loop after finding and clicking the matching order
       break;
   }
}

// Get the order ID text from the order details page
const orderIdDetails =await page.locator(".col-text").textContent();

// Verify that the order ID from the API response matches the order ID displayed on the page
// This confirms the order was successfully created and is showing in the history
expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
 
});
 
//Verify if order created is showing in history page
// Precondition - create order -