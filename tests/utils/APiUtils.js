// Create a class named APiUtils to handle API-related operations
class APiUtils {
    // Constructor method that runs when a new APiUtils object is created
    // It takes two parameters: apiContext (for making API calls) and loginPayLoad (user credentials)
    constructor(apiContext, loginPayLoad) {
        // Store the apiContext parameter as a class property so other methods can use it
        this.apiContext = apiContext;
        // Store the loginPayLoad parameter as a class property so other methods can use it
        this.loginPayLoad = loginPayLoad;
    }
 
    // Define an async function (waits for API response) to get authentication token from the server
    async getToken() {
        // Make a POST request to the login endpoint with user credentials and wait for response
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayLoad
        }); // Expected response: 200 (success) or 201 (created)
        
        // Convert the response from JSON format into a JavaScript object and wait for it
        const loginResponseJson = await loginResponse.json();
        // Extract the token value from the JSON response object
        const token = loginResponseJson.token;
        // Print the token to the console for debugging purposes
        console.log(token);
        // Return the token so other functions can use it
        return token;
    }
 
    // Define an async function to create a new order on the server
    async createOrder(orderPayLoad) {
        // Create an empty object to store response data (token and orderId)
        let response = {};
        // Call getToken() function, wait for it to finish, and store the returned token in response object
        response.token = await this.getToken();
        // Make a POST request to create an order, including the order details and authentication token
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayLoad, // Send the order information
            headers: {
                // Add the token to the request headers for authentication
                'Authorization': response.token,
                // Specify that we're sending JSON data
                'Content-Type': 'application/json'
            }
        });
 
        // Convert the order response from JSON format into a JavaScript object
        const orderResponseJson = await orderResponse.json();
        // Print the order response to the console for debugging
        console.log(orderResponseJson);
        // Extract the first order ID from the orders array in the response
        const orderId = orderResponseJson.orders[0];
        // Store the order ID in the response object
        response.orderId = orderId;
 
        // Return the response object containing both token and orderId
        return response;
    }
}
 
// Export the APiUtils class so other files can import and use it
module.exports = { APiUtils };

// ============ KEY CONCEPT DIFFERENCES ============
// 
// 1. LET vs VAR vs CONST:
//    - let: Block-scoped (only available in the { } block where it's declared). Use this by default.
//    - var: Function-scoped (available throughout the function). Older style, avoid using.
//    - const: Cannot be reassigned after creation, but objects/arrays can be modified. Use for fixed values.
//    - In this code: Used "let" for orderResponse (can be reassigned) and "const" for values that don't change.
//
// 2. ASYNC/AWAIT:
//    - async: Makes a function return a Promise and lets you use 'await' inside it
//    - await: Pauses execution until a Promise completes, then returns the result
//    - Used here to wait for API responses before moving to next line
//
// 3. THIS KEYWORD:
//    - Refers to the current object (instance of the class)
//    - this.apiContext accesses the apiContext stored in the constructor
//    - Used to access class properties and methods from within the class