"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVisionClient = void 0;
const vision_1 = require("@google-cloud/vision");
const dotenv_1 = __importDefault(require("dotenv"));
// Initialize dotenv to load environment variables from .env file
dotenv_1.default.config();
let client = null;
/**
 * Get the Vision API client.
 * This function initializes the client if it's not already initialized,
 * and returns it in one step.
 * @returns {ImageAnnotatorClient} The Vision API client.
 */
const getVisionClient = () => {
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
        const decodedCredentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
        credentials = JSON.parse(decodedCredentials);
    }
    catch (error) {
        throw new Error("Failed to decode or parse the credentials. Ensure the base64 string is valid.");
    }
    // Initialize the Vision API client with the decoded credentials
    client = new vision_1.ImageAnnotatorClient({ credentials });
    // Return the initialized client immediately
    return client;
};
exports.getVisionClient = getVisionClient;
