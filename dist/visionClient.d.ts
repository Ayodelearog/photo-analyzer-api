import { ImageAnnotatorClient } from "@google-cloud/vision";
/**
 * Get the Vision API client.
 * This function initializes the client if it's not already initialized,
 * and returns it in one step.
 * @returns {ImageAnnotatorClient} The Vision API client.
 */
export declare const getVisionClient: () => ImageAnnotatorClient;
