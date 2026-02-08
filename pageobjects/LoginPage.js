class LoginPage
{
// Constructor that receives the Playwright 'page' object
constructor(page)
{
    // Store the page object for later use
    this.page = page;
    // Locator for the sign-in button element (value="Login")
    this.signInbutton= page.locator("[value='Login']");
    // Locator for the username/email input field
    this.userName = page.locator("#userEmail");
    // Locator for the password input field
    this.password = page.locator("#userPassword");
}

// Define an async method to navigate to the app's login page
async goTo()
{
    // Navigate the Playwright page to the target URL
    await this.page.goto("https://rahulshettyacademy.com/client");
}

// Define an async method to perform a valid login using credentials
async validLogin(username,password)
{
    // Type the username into the username field
    await  this.userName.type(username);
    // Type the password into the password field
     await this.password.type(password);
    // Click the sign-in button to submit the form
     await this.signInbutton.click();
    // Wait for network to be idle indicating navigation/requests finished
     await this.page.waitForLoadState('networkidle');
}
// Close class block
}
// Export the LoginPage class for use in tests
module.exports = {LoginPage};