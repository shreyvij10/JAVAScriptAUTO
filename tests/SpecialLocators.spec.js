const { test, expect } = require('@playwright/test'); // CommonJS syntax // Import test and expect from Playwright for writing and asserting tests
 
test('Playwright Special locators', async ({ page }) => { // Define a test named 'Playwright Special locators' using page fixture
  
    await page.goto("https://rahulshettyacademy.com/angularpractice/"); // Navigate to the Angular practice page URL
    
    // getByLabel() is used to find form elements by their associated label text
    // Why: It's an accessibility-based locator that finds elements connected to labels, making tests more readable and maintainable
    // What it does: Searches for HTML elements that have a <label> tag with the matching text associated to them
    await page.getByLabel("Check me out if you Love IceCreams!").click(); // Click the checkbox labeled 'Check me out if you Love IceCreams!' using accessibility locator
    
    // getByLabel() method locates form controls by their label text (for checkboxes, radio buttons, inputs)
    // Why: Better than CSS selectors because it mimics how users interact with forms (via labels)
    // What it does: Finds the radio button that has a <label> element with text 'Employed' and checks it
    // check() method: Marks the radio button as selected
    await page.getByLabel("Employed").check(); // Check (select) the radio button labeled 'Employed' using accessibility locator
    
    // getByLabel() with selectOption() is used to select dropdown options
    // Why: Accessibility-based locators are more resilient to HTML/styling changes
    // What it does: Finds the <select> dropdown that has a <label> with text 'Gender' and selects the 'Female' option
    // selectOption() method: Selects a value from a <select> dropdown element
    await page.getByLabel("Gender").selectOption("Female"); // Select 'Female' from the dropdown labeled 'Gender' using accessibility locator
    
    // getByPlaceholder() locates input fields by their placeholder text attribute
    // Why: Useful when inputs don't have labels, placeholder text is visible to users and more stable than class/id selectors
    // What it does: Finds the input field with placeholder="Password"
    // fill() method: Enters text into an input field (clears existing text first, then types new text)
    await page.getByPlaceholder("Password").fill("abc123"); // Fill the password input field with placeholder 'Password' with value 'abc123'
    
    // getByRole() with role='button' finds clickable button elements by their accessible name
    // Why: Role-based locators are the most resilient as they focus on what element does (button), not how it looks
    // What it does: Finds any button element on the page that has the name/text 'Submit'
    // click() method: Simulates a user clicking on the element
    await page.getByRole("button", {name: 'Submit'}).click(); // Click the button with role 'button' and name 'Submit' using accessibility locator
    
    // expect() wraps an assertion to make it a proper test assertion
    // Why: Playwright assertions throw errors and fail the test if the condition is not met
    // What it does: Gets the element with text "Success! The Form has been submitted successfully!." and checks if it's visible
    // toBeVisible() assertion: Verifies that the element is visible in the DOM and in the viewport
    // Note: The period at the end might cause issues - ensure it matches the actual page text exactly
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible(); // Assert that the success message is visible on the page
    
    // getByRole() with role='link' finds anchor tags by their accessible name/text
    // Why: Links are semantic elements, using role ensures you're targeting interactive navigation elements
    // What it does: Finds any link/anchor element with the text/name 'Shop'
    // click() method: Simulates a user clicking the link to navigate to the shop page
    await page.getByRole("link",{name : "Shop"}).click(); // Click the link with role 'link' and name 'Shop' using accessibility locator
    
    // locator() with CSS selector "app-card" finds custom Angular component elements
    // filter({hasText: 'Nokia Edge'}) narrows down to cards containing specific text
    // Why: When you need to find a specific card among multiple cards, filter() reduces the selection to matching elements
    // What it does: Finds all <app-card> elements, filters to only those containing the text 'Nokia Edge', then finds a button inside
    // getByRole("button") then finds a button within the filtered card
    // click() clicks that button to add the product to cart
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click(); // Locate app-card element containing 'Nokia Edge' text, then click the button inside it
 
    //locator(css) // Comment indicating CSS locator usage
    
 
}); // End of test function

test.only('@Webst Client App login', async ({ page }) => { // Define a test named '@Webst Client App login' with test.only() to run ONLY this test (ignores other tests)
   
   //js file- Login js, DashboardPage // Comment indicating reference to page object files
   
   const email = "shreyashish1101@gmail.com"; // Define email variable for login - stores the email address to be used throughout the test
   const productName = 'ZARA COAT 3'; // Define target product name to search for - the product we want to add to cart
   const products = page.locator(".card-body"); // Locate all product card elements by CSS class '.card-body' (returns a list of elements) - stores reference to all product cards
   
   // goto() navigates to the specified URL
   // What it does: Loads the client dashboard page where products are displayed
   await page.goto("https://rahulshettyacademy.com/client"); // Navigate to the client dashboard URL
   
   // getByPlaceholder() finds input field by its placeholder text attribute
   // Why: More user-friendly than hardcoding selectors, matches what users see
   // What it does: Finds the input field with placeholder="email@example.com"
   // fill() enters text into the input field - clears any existing value and types the email
   await page.getByPlaceholder("email@example.com").fill(email); // Fill the email input field with the email variable
   
   // getByPlaceholder() finds password field by placeholder text
   // What it does: Finds the input field with placeholder="enter your passsword" (note the typo in placeholder)
   // fill() method inputs the password - replaces any existing text with the password
   await page.getByPlaceholder("enter your passsword").fill("800386@As"); // Fill the password input field with the specified password
   
   // getByRole("button", {name: "Login"}) finds the button by its accessible role and name
   // Why: Role-based selectors are most resilient to style/structure changes
   // What it does: Searches for any button element with the accessible name/text 'Login'
   // click() simulates user clicking the button - triggers the login process
   await page.getByRole('button',{name:"Login"}).click(); // Click the login button using role-based locator
   
   // waitForLoadState('networkidle') waits until all network requests complete
   // Why: Ensures page is fully loaded before proceeding, prevents timing issues
   // What it does: Waits until the page stops making network requests (all images, scripts, data loaded)
   await page.waitForLoadState('networkidle'); // Wait for the page to reach network idle state (all resources loaded)
   
   // waitFor() waits until the element appears in the DOM
   // Why: Ensures the element exists before you try to interact with it, prevents "element not found" errors
   // What it does: Waits until the first <b> tag inside a .card-body element becomes available
   // first() selects only the first matching element from multiple results
   await page.locator(".card-body b").first().waitFor(); // Wait for the first product title (b tag inside .card-body) to appear
   
   // locator(".card-body").filter({hasText: "ZARA COAT 3"}) finds card elements containing specific text
   // filter() narrows down multiple elements to only those matching the condition
   // Why: When you have many similar elements, filter helps you target the exact one you need
   // What it does: Finds all .card-body elements, then filters to only those containing "ZARA COAT 3" text
   // getByRole("button", {name: "Add to Cart"}) finds the button within the filtered card
   // click() clicks that button to add the product to cart
   await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
   .getByRole("button",{name:"Add to Cart"}).click(); // Filter cards for 'ZARA COAT 3', then click 'Add to Cart' button
 
   // getByRole("listitem") finds list item elements by their semantic role
   // Why: List items are important structural elements, using role ensures correct selection
   // What it does: Finds a <li> (list item) element, typically in a navigation menu
   // getByRole("button", {name: "Cart"}) finds the Cart button within list items
   // click() clicks the cart button
   await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click(); // Click the Cart button located within a list item
 
   //await page.pause(); // Commented out: Pause test for manual inspection and debugging
   
   // waitFor() waits for the first child list item to appear in a div
   // Why: Ensures cart items have loaded before asserting their visibility
   // What it does: Waits until the first <li> inside any <div> appears (indicating cart items loaded)
   // first() selects only the first matching element
   await page.locator("div li").first().waitFor(); // Wait for the first list item in a div to appear (cart item loaded)
   
   // getByText() finds elements by their exact or partial text content
   // Why: Simple and readable, matches how users see the page
   // What it does: Searches for any element containing the text "ZARA COAT 3"
   // toBeVisible() assertion checks that the element is visible in the viewport
   // Why: Ensures the product was successfully added and is displayed in cart
   // What it does: Verifies the element is present in the DOM and visible on screen
   await expect(page.getByText("ZARA COAT 3")).toBeVisible(); // Assert that product 'ZARA COAT 3' is visible in the cart
 
   // getByRole("button", {name: "Checkout"}) finds the checkout button by role and name
   // Why: Semantic and accessible, ensures you're clicking a button element
   // What it does: Searches for a button element with the text/name 'Checkout'
   // click() triggers the checkout process - navigates to checkout page
   await page.getByRole("button",{name :"Checkout"}).click(); // Click the Checkout button to proceed to checkout page
 
   // getByPlaceholder("Select Country") finds the country dropdown input by placeholder
   // Why: Identifies the input field for country selection
   // What it does: Finds the input field with placeholder="Select Country"
   // pressSequentially() types characters one by one with timing between keystrokes (simulates real user typing)
   // Why: Some applications require sequential key presses to trigger autocomplete/dropdown
   // What it does: Types 'i', then 'n', then 'd' with delays between each keystroke to trigger country suggestions
   await page.getByPlaceholder("Select Country").pressSequentially("ind"); // Type 'ind' sequentially into country field to trigger autocomplete
 
   // getByRole("button", {name: "India"}) finds the India button in the dropdown
   // What it does: Searches for a button element with the text "India"
   // nth(1) selects the second matching element (index starts at 0, so nth(1) = second element)
   // Why: If there are multiple "India" options, nth(1) ensures you select the correct one (not the first)
   // click() selects the India option from the dropdown
   await page.getByRole("button",{name :"India"}).nth(1).click(); // Click the second 'India' button option from the country dropdown
   
   // getByText("PLACE ORDER") finds the 'PLACE ORDER' button by its text content
   // Why: Simple and readable for finding buttons with specific text
   // What it does: Searches for any element containing the text "PLACE ORDER"
   // click() triggers the final order placement - submits the order
   await page.getByText("PLACE ORDER").click(); // Click the 'PLACE ORDER' button to submit the order
 
   // getByText("Thankyou for the order.") finds the confirmation message element
   // Why: Verifies the order was successfully placed
   // What it does: Searches for any element containing the exact text "Thankyou for the order."
   // toBeVisible() assertion checks that confirmation message is displayed
   // Why: Final validation that the order process completed successfully
   // What it does: Verifies the success message element is present and visible on the page
   await expect(page.getByText("Thankyou for the order.")).toBeVisible(); // Assert that the order confirmation message is visible on the page
})