Photo Analyzer API

A Node.js package for analyzing profile photos using Google Cloud Vision API.
Installation

Install the package using npm:

npm install photo-analyzer-api

Setup

    Ensure you have a Google Cloud project with the Vision API enabled.

    Create a service account and download the JSON key file.

    Convert your Google Cloud credentials JSON to a base64 string:

        On Unix-based systems (Linux, macOS):

        base64 -i path/to/your-credentials.json

        On Windows (PowerShell):

        [Convert]::ToBase64String([IO.File]::ReadAllBytes("path\to\your-credentials.json"))

    Create a .env file in your project root and add the following, wrapping the base64 string in backticks:

    GOOGLE_CREDENTIALS_BASE64=`your_base64_encoded_credentials_here`

Usage

Here's how to use the photo-analyzer-api in your project:

require('dotenv').config();
const { analyze } = require('photo-analyzer-api');

const photosToAnalyze = [
  { userid: 'user1', profilephoto: 'https://example.com/photo1.jpg' },
  { userid: 'user2', profilephoto: 'https://example.com/photo2.jpg' }
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

API
analyze(users)

Analyzes profile photos for face detection and safe search.

Parameters:

    users: An array of objects, each containing:
        userid: A string identifier for the user
        profilephoto: A string URL of the photo to analyze

Returns:

A Promise that resolves to an array of analysis results, each containing:

    userid: The user identifier
    results: An object containing:
        faces: Face detection results (if successful)
        safeSearch: Safe search results (if successful)
        error: Error message (if an error occurred during analysis)

Error Handling

The analyze function will return error information for individual photos that fail to process. It will not throw errors for individual photo failures, but will include error information in the results array.

If there's a critical error (e.g., invalid credentials), the function will throw an error that should be caught and handled by the calling code.
Troubleshooting

    "Failed to decode or parse the credentials" error:
        Ensure your base64 string in the .env file is wrapped in backticks and doesn't contain any line breaks.
        Verify that the original JSON credentials file is valid.

    "Getting metadata from plugin failed" error:
        Check that the image URLs are accessible and valid.
        Ensure the image format is supported by Google Cloud Vision API.

    "Unauthorized" or "Permission denied" errors:
        Ensure your Google Cloud project has the Vision API enabled.
        Verify that your service account has the necessary permissions.

    High latency or timeouts:
        Check your network connection.
        Consider implementing retry logic for API calls.

Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

License

This project is licensed under the MIT License.