import { ImageAnnotatorClient } from "@google-cloud/vision";
import dotenv from "dotenv";

// Initialize dotenv to load environment variables from .env file
dotenv.config();

let client: ImageAnnotatorClient | null = null;


/**
 * Get the Vision API client.
 * This function initializes the client if it's not already initialized,
 * and returns it in one step.
 * @returns {ImageAnnotatorClient} The Vision API client.
 */
export const getVisionClient = (): ImageAnnotatorClient => {
  // If the client is already initialized, return it immediately
  if (client) {
    return client;
  }

  

  // Get the base64-encoded credentials from the environment variable
  const base64Credentials = process.env.GOOGLE_CREDENTIALS_BASE64;
  

  if (!base64Credentials) {
    throw new Error("Base64-encoded credentials string is required in the environment variable GOOGLE_CREDENTIALS_BASE64.");
  }

  let credentials;
  try {
    
    // Decode the base64 string and parse the JSON
    const decodedCredentials = Buffer.from(base64Credentials, 'base64').toString('utf-8').trim().replace(/\s/g, '');
    credentials = JSON.parse(decodedCredentials);
    
  } catch (error) {
    console.log(credentials)
    throw new Error("Failed to decode or parse the credentials. Ensure the base64 string is valid.");
    
  }

  // Initialize the Vision API client with the decoded credentials
  client = new ImageAnnotatorClient({ credentials });

  // Return the initialized client immediately
  return client;
};
