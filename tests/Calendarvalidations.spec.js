const {test,expect} = require("@playwright/test"); // CommonJS import | Import test function for defining tests and expect for assertions

/*
1. NAVIGATE
   ↓
2. CLICK INPUT → Calendar Opens (Day View showing dates 1-31)
   ↓
3. CLICK LABEL (1st time) → Navigate to Month View (showing Jan-Dec)
   ↓
4. CLICK LABEL (2nd time) → Navigate to Year View (showing 2020-2030)
   ↓
5. CLICK "2027" → Select Year, return to Month View
   ↓
6. CLICK 6th MONTH (June) → Month selected, return to Day View
   ↓
7. CLICK 15th DAY → Date selected, calendar closes
   ↓
8. VALIDATE:
   - Input field 0 (month) = "6" ✓
   - Input field 1 (date) = "15" ✓
   - Input field 2 (year) = "2027" ✓
*/
// CALENDAR VALIDATION TEST - Tests date picker functionality by selecting month, date, and year
test("Calendar validations",async({page})=> // Define test named "Calendar validations" using page fixture
{
    // ============ STEP 1: DEFINE TEST DATA ============
    
    // Store the month number as a string (1-12, where 6 = June)
    // Why: Used to select the correct month in the calendar month selector
    // How it's used: Converted to number and used with nth() to find the 6th month element
    const monthNumber = "6";
    
    // Store the day/date as a string (1-31)
    // Why: Used to click the specific date in the calendar day view
    // How it's used: Inserted into XPath expression to find the matching date element
    const date = "15";
    
    // Store the year as a string
    // Why: Used to click and select the correct year from year picker
    // How it's used: Passed to getByText() to find and click the year button
    const year = "2027";
    
    // Create an array with all expected values in order [month, date, year]
    // Why: Will be used to validate each input field value in the loop
    // How it's used: Loop through this array and compare each value with actual input field values
    const expectedList = [monthNumber,date,year];
    
    // ============ STEP 2: NAVIGATE TO CALENDAR PAGE ============
    
    // Locator: goto() | Action: Navigate to specific URL
    // What it does: Loads the calendar practice page from Rahul Shetty Academy
    // Purpose: Opens the page containing the date picker calendar component to test
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    
    // ============ STEP 3: OPEN DATE PICKER CALENDAR ============
    
    // Locator: locator(".react-date-picker__inputGroup") 
    // What it targets: The input group container that holds the date picker
    // Why this locator: CSS class selector directly targets the React date picker component
    // How it works: Finds the element with class "react-date-picker__inputGroup"
    // Method: click() | Action: Clicks to open the calendar popup
    // Purpose: Opens the calendar interface to allow date selection
    await page.locator(".react-date-picker__inputGroup").click();
    
    // ============ STEP 4: NAVIGATE CALENDAR VIEWS (Day → Month → Year) ============
    
    // Locator: locator(".react-calendar__navigation__label")
    // What it targets: The navigation label showing current view level (e.g., "2024" or "June 2024")
    // Why this locator: This label is clickable and navigates up one calendar level
    // How it works: Clicks on the top navigation label to go from Day view to Month view
    // Method: click() | Action: First click - navigates from Day picker to Month picker
    // Purpose: Navigate from showing individual dates to showing months for selection
    // Technical detail: The calendar starts in "day view" showing dates. Clicking label goes to "month view"
    await page.locator(".react-calendar__navigation__label").click();
    
    // Locator: locator(".react-calendar__navigation__label")
    // What it targets: Same navigation label, but now showing month level
    // Why this locator: Clicking again continues navigation to the next level
    // How it works: Second click on same element navigates from Month view to Year view
    // Method: click() | Action: Second click - navigates from Month picker to Year picker
    // Purpose: Navigate from showing months to showing years for selection
    // Technical detail: Now the calendar displays all years to choose from
    // Example flow: "Day view (showing 1-31)" → "Month view (showing Jan-Dec)" → "Year view (showing 2020-2030)"
    await page.locator(".react-calendar__navigation__label").click();
    
    // ============ STEP 5: SELECT YEAR ============
    
    // Locator: getByText(year)
    // What it targets: Any element on the page containing the exact text matching 'year' variable
    // Why this locator: getByText() is accessibility-based and finds elements by visible text
    // How it works: 
    //   - year variable contains "2027"
    //   - getByText("2027") searches for any element with visible text "2027"
    //   - In year view, this matches the clickable year button
    // Method: click() | Action: Clicks the year "2027" button
    // Purpose: Selects the year 2027 from the year picker view
    // Benefit: User-focused locator - matches what user sees on screen
    await page.getByText(year).click();
    
    // ============ STEP 6: SELECT MONTH ============
    
    // Locator: locator(".react-calendar__year-view__months__month")
    // What it targets: All month elements displayed in the year view
    // Why this locator: CSS class selector targets all 12 month buttons (Jan, Feb, Mar, etc.)
    // How it works: 
    //   - Finds all elements with class "react-calendar__year-view__months__month"
    //   - Returns a list of all 12 month elements
    
    // Method: nth(Number(monthNumber)-1)
    // What it does: Selects a specific month from the list of all months
    // How it works:
    //   - Number(monthNumber) converts string "6" to number 6
    //   - Subtract 1 because arrays are zero-indexed (0-11 for 12 months)
    //   - nth(5) selects the 6th element (index 5 = June, the 6th month)
    // Example breakdown:
    //   monthNumber = "6" (string for June)
    //   Number("6") = 6 (convert to number)
    //   6 - 1 = 5 (zero-based index for 6th position)
    //   nth(5) = 6th month element = June
    
    // Method: click() | Action: Clicks on the selected month
    // Purpose: Selects June from the list of 12 months
    // Technical detail: After year selection, calendar shows all 12 months. This clicks the 6th one (June)
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
    
    // ============ STEP 7: SELECT DATE ============
    
    // Locator: locator("//abbr[text()='"+date+"']")
    // What it targets: An <abbr> (abbreviation) HTML element containing the date text
    // Why this locator: XPath selector allows complex element searching by attribute and text
    // How it works:
    //   - "//abbr" searches for any <abbr> tag anywhere in the document
    //   - "[text()='"+date+"']" filters to only abbr tags with text matching date variable
    //   - String concatenation: "//abbr[text()='" + "15" + "']" = "//abbr[text()='15']"
    //   - Result: Finds the <abbr> tag containing "15"
    // Example construction:
    //   date = "15"
    //   XPath = "//abbr[text()='15']" (finds abbr tag with text "15")
    //   This matches the date button in the calendar day view
    
    // Method: click() | Action: Clicks on the date element
    // Purpose: Selects the 15th day from the calendar
    // Technical detail: After month selection, calendar shows all dates in that month. This clicks the 15th
    // Why XPath: XPath is powerful for complex selections, allows searching by text content directly
    await page.locator("//abbr[text()='"+date+"']").click();
    
    // ============ STEP 8: VALIDATE SELECTED VALUES ============
    
    // Locator: page.locator('.react-date-picker__inputGroup__input')
    // What it targets: All input fields that display the selected date components
    // Why this locator: CSS class selector targets all 3 input fields in the date picker
    // How it works:
    //   - Finds all elements with class "react-date-picker__inputGroup__input"
    //   - Returns a list/array of 3 input elements (one for month, one for date, one for year)
    //   - Index 0: Month input field
    //   - Index 1: Date input field
    //   - Index 2: Year input field
    
    // Method: Not called yet - stored for later use in loop
    // Purpose: Get reference to all input fields to extract and validate their values
    const inputs = page.locator('.react-date-picker__inputGroup__input')
    
    // ============ STEP 9: LOOP THROUGH AND ASSERT VALUES ============
    
    // For loop: Iterate through expectedList array (0, 1, 2)
    // Purpose: Validate each of the 3 selected values (month, date, year)
    for(let i = 0; i < expectedList.length; i++)
    {
        // Locator: inputs.nth(i)
        // What it targets: The i-th input field from the list of 3 inputs
        // How it works:
        //   - When i=0: nth(0) selects 1st input (month field)
        //   - When i=1: nth(1) selects 2nd input (date field)
        //   - When i=2: nth(2) selects 3rd input (year field)
        
        // Method: inputValue()
        // What it does: Retrieves the current value from the input field
        // How it works:
        //   - Gets the value attribute of the selected input element
        //   - Returns the text content in that input field
        // Example returns:
        //   - When i=0: Returns "6" (month)
        //   - When i=1: Returns "15" (date)
        //   - When i=2: Returns "2027" (year)
        const value = await inputs.nth(i).inputValue();
        
        // Assertion: expect(value).toEqual(expectedList[i])
        // What it checks: Compares the actual input value with the expected value
        // How it works:
        //   - value: actual value retrieved from input field
        //   - expectedList[i]: expected value from our test data array
        //   - toEqual(): Playwright assertion that checks strict equality
        // Example assertions:
        //   - When i=0: expect("6").toEqual("6") ✓ PASS
        //   - When i=1: expect("15").toEqual("15") ✓ PASS
        //   - When i=2: expect("2027").toEqual("2027") ✓ PASS
        
        // Why validate: Confirms that the calendar properly stored and displays the selected values
        // Purpose: Ensures date picker functionality works correctly end-to-end
        expect(value).toEqual(expectedList[i]);
    }
    
    // ============ TEST COMPLETE ============
    // Summary: Test successfully validates that:
    // 1. Calendar opens when input clicked
    // 2. Navigation works (Day → Month → Year views)
    // 3. Year selection works (2027 selected)
    // 4. Month selection works (June/6 selected)
    // 5. Date selection works (15th selected)
    // 6. All selected values are correctly stored in input fields
 
}) // End of test function