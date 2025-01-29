import { ImageAnnotatorClient } from "@google-cloud/vision"
import dotenv from "dotenv"

dotenv.config()

let client: ImageAnnotatorClient | null = null

export const getVisionClient = (): ImageAnnotatorClient => {
  if (client) {
    return client
  }

  const base64Credentials = process.env.GOOGLE_CREDENTIALS_BASE64?.trim().replace(/['"]/g, "")

  if (!base64Credentials) {
    throw new Error(
      "Base64-encoded credentials string is required in the environment variable GOOGLE_CREDENTIALS_BASE64.",
    )
  }

  let credentials
  try {
    const decodedCredentials = Buffer.from(base64Credentials, "base64").toString("utf-8")
    credentials = JSON.parse(decodedCredentials)
  } catch (error) {
    throw new Error("Failed to decode or parse the credentials. Ensure the base64 string is valid.")
  }

  client = new ImageAnnotatorClient({ credentials })

  return client
}

