Photo Analyzer API

A Node.js package for analyzing profile photos using Google Cloud Vision API.
Table of Contents

    Installation
    Setup
    Usage
    API Endpoints
    Error Handling
    Troubleshooting
    Contributing
    License

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

    PORT=3000
    GOOGLE_CREDENTIALS_BASE64=`your_base64_encoded_credentials_here`

Usage

    Create a new file (e.g., server.js) and add the following code:

    require('dotenv').config();
    const { createServer, analyzePhotosRoute } = require('photo-analyzer-api');

    const server = createServer({
      port: process.env.PORT || 3000,
      routes: (app) => {
        app.use('/api', analyzePhotosRoute);
      },
      onError: (err, req, res, next) => {
        console.error(err);
        res.status(500).json({ error: 'Custom error message' });
      }
    });

    server.start();

    Run your server:

    node server.js

    You should see output indicating that your server is running.

API Endpoints
POST /api/analyzePhotos

Analyzes profile photos for face detection and safe search.

Request Body:

{
  "users": [
    {
      "userid": "user1",
      "profilephoto": "https://example.com/photo1.jpg"
    },
    {
      "userid": "user2",
      "profilephoto": "https://example.com/photo2.jpg"
    }
  ]
}

Response:

{
  "success": true,
  "data": [
    {
      "userid": "user1",
      "results": {
        "faces": [...],
        "safeSearch": {...}
      }
    },
    {
      "userid": "user2",
      "results": {
        "faces": [...],
        "safeSearch": {...}
      }
    }
  ]
}

Error Handling

The API returns appropriate error messages for various scenarios:

    Invalid input: 400 Bad Request
    Server errors: 500 Internal Server Error
    Photo analysis errors: Included in the response for each user

Example error response:

{
  "success": false,
  "message": "Server error: Failed to analyze photos"
}

Troubleshooting

    "Failed to decode or parse the credentials" error:
        Ensure your base64 string in the .env file is wrapped in backticks and doesn't contain any line breaks.
        Verify that the original JSON credentials file is valid.

    "Getting metadata from plugin failed" error:
        Check that the image URLs are accessible and valid.
        Ensure the image format is supported by Google Cloud Vision API.

    Server doesn't start:
        Verify that all required environment variables are set correctly.
        Check for any conflicting port usage.

    "Unauthorized" or "Permission denied" errors:
        Ensure your Google Cloud project has the Vision API enabled.
        Verify that your service account has the necessary permissions.

    High latency or timeouts:
        Check your network connection.
        Consider implementing retry logic for API calls.

Contributing

Contributions are welcome! Please feel free to submit a Pull Request.