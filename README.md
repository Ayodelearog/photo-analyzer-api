Photo Analyzer

A Node.js package for analyzing profile photos using Google Cloud Vision API.
Installation

Install the package using npm:

npm install photo-analyzer

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

    Import the necessary functions from the package:

    const { createServer, analyzePhotosRoute } = require('photo-analyzer-api');

    Create and start the server:

    const server = createServer({
      port: 3000, // Optional: defaults to process.env.PORT or 3000
      routes: (app) => {
        app.use('/api', analyzePhotosRoute);
      },
      // Optional: custom error handler
      onError: (err, req, res, next) => {
        console.error(err);
        res.status(500).json({ error: 'Custom error message' });
      }
    });

    Make a POST request to /api/analyzePhotos with the following JSON body:

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

    The API will return a JSON response with the analysis results:

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

If there's an error analyzing a photo, the response will include an error message for that specific user:

{
  "success": true,
  "data": [
    {
      "userid": "user1",
      "results": {
        "error": "Error analyzing photo: Invalid image URL"
      }
    }
  ]
}

Troubleshooting

    If you encounter a "Failed to decode or parse the credentials" error, ensure your base64 string in the .env file is wrapped in backticks and doesn't contain any line breaks.

    Make sure your Google Cloud project has the Vision API enabled and your service account has the necessary permissions.

    Check that your .env file is in the root directory of your project and is being loaded correctly.

License

This project is licensed under the MIT License.