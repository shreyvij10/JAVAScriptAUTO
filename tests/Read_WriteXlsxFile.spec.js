// Import ExcelJS library for reading and writing Excel files
const ExcelJs = require('exceljs');
// Import Playwright test utilities
const { test, expect } = require('@playwright/test');

// Async function to search for text in Excel and replace a cell value
async function writeExcelTest(searchText, replaceText, change, filePath) {
  // Create a new ExcelJS workbook instance
  const workbook = new ExcelJs.Workbook();
  // Read the Excel file from the specified file path
  await workbook.xlsx.readFile(filePath);
  // Get the worksheet named 'Sheet1'
  const worksheet = workbook.getWorksheet('Sheet1');
  // Call readExcel to find the cell containing searchText and get its row/column
  const output = readExcel(worksheet, searchText); // not async

  // Get the specific cell using the found row and adjusted column (add colChange offset)
  const cell = worksheet.getCell(output.row, output.column + change.colChange);
  // Set the cell value to the replacement text
  cell.value = replaceText;
  // Write the modified workbook back to the file
  await workbook.xlsx.writeFile(filePath);
}

// Synchronous function to search Excel worksheet and return row/column of matching text
function readExcel(worksheet, searchText) {
  // Initialize output object with -1 values (indicates not found)
  let output = { row: -1, column: -1 };
  // Loop through each row in the worksheet
  worksheet.eachRow((row, rowNumber) => {
    // Loop through each cell in the current row
    row.eachCell((cell, colNumber) => {
      // Check if cell value matches the search text
      if (cell.value === searchText) {
        // Store the row number and column number of the matching cell
        output = { row: rowNumber, column: colNumber };
      }
    });
  });
  // Return the output object with found row and column
  return output;
}

// Example usage: update Mango Price to 350
// writeExcelTest("Mango",350,{rowChange:0,colChange:2},"/Users/rahulshetty/downloads/excelTest.xlsx");

// Test case to validate Excel upload/download functionality
test('Upload download excel validation', async ({ page }) => {
  // Define the text to search for in the Excel file
  const textSearch = 'Mango';
  // Define the new value to update in the Excel file
  const updateValue = '350';

  // Navigate to the test website
  await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');

  // Wait for the download event to occur
  const download = page.waitForEvent('download');
  // Click the Download button to trigger the file download
  await page.getByRole('button', { name: 'Download' }).click();
  // Capture the download event
  const dl = await download;
  // Define the file path where the downloaded file will be saved (Windows path)
  const filePath = 'C:\\Users\\shrey\\Downloads\\download.xlsx'; // Windows path

  // Call writeExcelTest to update the Mango price to 350 in the Excel file
  // Ensure the edit finishes before upload
  await writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, filePath);

  // Upload the modified Excel file back to the website using the file input
  await page.locator('#fileinput').setInputFiles(filePath);

  // Find the table row that contains the search text (Mango)
  const desiredRow = await page.getByRole('row').filter({ has: page.getByText(textSearch) });
  // Assert that the price cell in the found row contains the updated value (350)
  await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);
});