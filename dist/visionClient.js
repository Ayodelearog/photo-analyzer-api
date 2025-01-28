"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVisionClient = void 0;
const vision_1 = require("@google-cloud/vision");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let client = null;
const getVisionClient = () => {
    var _a;
    if (client) {
        return client;
    }
    // Get the base64-encoded credentials from the environment variable
    const base64Credentials = (_a = process.env.GOOGLE_CREDENTIALS_BASE64) === null || _a === void 0 ? void 0 : _a.trim().replace(/['"]/g, '');
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
    return client;
};
exports.getVisionClient = getVisionClient;
