import { getVisionClient } from "./visionClient"
import type { ImageAnnotatorClient, protos } from "@google-cloud/vision"

interface User {
  userid: string
  profilephoto: string // Can be a URL or base64 string
}

interface AnalysisResult {
  userid: string
  results: {
    faces?: protos.google.cloud.vision.v1.IFaceAnnotation[]
    safeSearch?: protos.google.cloud.vision.v1.ISafeSearchAnnotation
    error?: string
  }
}

type ImageSource = string | Buffer

async function analyzeImage(
  client: ImageAnnotatorClient,
  image: ImageSource,
): Promise<{
  faces: protos.google.cloud.vision.v1.IFaceAnnotation[]
  safeSearch: protos.google.cloud.vision.v1.ISafeSearchAnnotation
}> {
  const [faceResponse] = await client.faceDetection(image)
  const faces = faceResponse.faceAnnotations || []

  const [safeSearchResponse] = await client.safeSearchDetection(image)
  const safeSearch = safeSearchResponse.safeSearchAnnotation || {}

  return { faces, safeSearch }
}

export async function analyze(users: User[]): Promise<AnalysisResult[]> {
  const client = getVisionClient()
  const results: AnalysisResult[] = []

  for (const user of users) {
    const { userid, profilephoto } = user

    try {
      let imageSource: ImageSource
      if (
        profilephoto.startsWith("data:image") ||
        /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/.test(profilephoto)
      ) {
        // If it's a base64 string, convert it to a Buffer
        const base64Data = profilephoto.replace(/^data:image\/\w+;base64,/, "")
        imageSource = Buffer.from(base64Data, "base64")
      } else {
        // If it's a URL, pass it as a string
        imageSource = profilephoto
      }

      const { faces, safeSearch } = await analyzeImage(client, imageSource)
      results.push({
        userid,
        results: { faces, safeSearch },
      })
    } catch (error) {
      results.push({
        userid,
        results: {
          error: error instanceof Error ? `Error analyzing photo: ${error.message}` : "An unknown error occurred",
        },
      })
    }
  }

  return results
}

export default analyze

