# Swift Movers Website

This project is a simple website for a moving company, featuring a form that submits data to a Google Sheet.

## Setup Instructions

### 1. Google Sheet Setup

1. Create a new Google Sheet.
2. Name the first sheet "Sheet1".
3. In the first row, add these column headers: 
   - Timestamp
   - Email
   - Phone
   - EstimatedTime
   - Description

### 2. Google Apps Script Setup

1. In your Google Sheet, go to Extensions > Apps Script.
2. Replace any existing code with the following:

```javascript
const sheetName = 'Sheet1';
const scriptProp = PropertiesService.getScriptProperties();

function initialSetup() {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}

function doGet(e) {
  return handleResponse(e);
}

function doPost(e) {
  return handleResponse(e);
}

function handleResponse(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    const sheet = doc.getSheetByName(sheetName);
    
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const nextRow = sheet.getLastRow() + 1;
    
    const newRow = headers.map(function(header) {
      return header === 'Timestamp' ? new Date() : e.parameter[header];
    });
    
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*');
  }
  
  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*');
  }
  
  finally {
    lock.releaseLock();
  }
}
```

3. Save the script (File > Save).
4. Run the `initialSetup` function once.
5. Deploy the script as a web app:
   - Click "Deploy" > "New deployment"
   - Choose "Web app" as the type
   - Set "Execute as" to your Google account
   - Set "Who has access" to "Anyone"
   - Click "Deploy"
   - Copy the provided Web App URL

### 3. Website Setup

1. Create three files in your project directory: `index.html`, `styles.css`, and `script.js`.
2. Copy the provided HTML, CSS, and JavaScript code into these files respectively.
3. In `script.js`, replace the URL in the `fetch` function with your Google Apps Script Web App URL.

## Hosting on GitHub Pages

1. Create a GitHub account if you don't have one already.
2. Create a new repository on GitHub.
3. Initialize git in your local project directory:
   ```
   git init
   ```
4. Add your files to git:
   ```
   git add .
   ```
5. Commit your files:
   ```
   git commit -m "Initial commit"
   ```
6. Link your local repository to the GitHub repository:
   ```
   git remote add origin https://github.com/yourusername/your-repo-name.git
   ```
7. Push your code to GitHub:
   ```
   git push -u origin main
   ```
8. Go to your repository on GitHub.
9. Click on "Settings" > "Pages".
10. Under "Source", select "main" branch and click "Save".
11. GitHub will provide you with a URL where your site is published.

### Updating Your Site

To update your site after making changes:

1. Make your changes locally.
2. Commit your changes:
   ```
   git add .
   git commit -m "Description of changes"
   ```
3. Push to GitHub:
   ```
   git push
   ```
4. GitHub Pages will automatically update your site.

## Customization

- Replace the placeholder images in the `images` folder with your own images.
- Update the content in `index.html` to match your company's information.
- Modify the styles in `styles.css` to match your brand colors and preferences.

## Troubleshooting

If you encounter issues with form submission:

1. Check the browser console for error messages.
2. Verify that your Google Apps Script Web App URL is correct in `script.js`.
3. Ensure your Google Sheet and Apps Script are set up correctly.

For any other issues, refer to the GitHub Pages documentation or seek assistance in their community forums.