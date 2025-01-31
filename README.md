# Photo Analyzer API

A Node.js package for analyzing profile photos using Google Cloud Vision API.

## Installation

Install the package using npm:

```bash
npm install photo-analyzer-api
```

## Setup

1. Ensure you have a Google Cloud project with the Vision API enabled.
2. Create a service account and download the JSON key file.
3. Convert your Google Cloud credentials JSON to a base64 string and set it as an environment variable:

   ```
   GOOGLE_CREDENTIALS_BASE64=your_base64_encoded_credentials_here
   ```

## Usage

Here's how to use the photo-analyzer-api in your project:

```javascript
require('dotenv').config();
const { analyze } = require('photo-analyzer-api');

const photosToAnalyze = [
  { userid: 'user1', profilephoto: 'https://example.com/photo1.jpg' },
  { userid: 'user2', profilephoto: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAABAAEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9/KKKKAP/2Q==' }
];

async function runAnalysis() {
  try {
    const results = await analyze(photosToAnalyze);
    console.log(results);
  } catch (error) {
    console.error('Error analyzing photos:', error);
  }
}

runAnalysis();
```

## API

### analyze(users)

Analyzes profile photos for face detection and safe search.

**Parameters:**

- `users`: An array of objects, each containing:
  - `userid`: A string identifier for the user
  - `profilephoto`: A string URL or base64-encoded image data of the photo to analyze

**Returns:**

A Promise that resolves to an array of analysis results, each containing:
- `userid`: The user identifier
- `results`: An object containing:
  - `faces`: Face detection results (if successful)
  - `safeSearch`: Safe search results (if successful)
  - `error`: Error message (if an error occurred during analysis)

## Error Handling

If an error occurs during the analysis of a specific photo, the result for that user will include an error message in the `results` object. The function will continue processing the remaining photos and return results for all users.

## Troubleshooting

1. Ensure your Google Cloud credentials are correctly set as an environment variable.
2. For base64-encoded images, make sure the string is properly formatted (including the data URI prefix for image type).
3. For URL images, ensure the URLs are accessible and point to valid image files.
4. Check that your Google Cloud project has the Vision API enabled and your service account has the necessary permissions.

## License

This project is licensed under the MIT License.