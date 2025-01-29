import { getVisionClient } from "./visionClient"

interface User {
  userid: string
  profilephoto: string
}

interface AnalysisResult {
  userid: string
  results: {
    faces?: any[]
    safeSearch?: any
    error?: string
  }
}

export async function analyze(users: User[]): Promise<AnalysisResult[]> {
  const client = getVisionClient()
  const results: AnalysisResult[] = []

  for (const user of users) {
    const { userid, profilephoto } = user

    try {
      const [faceResponse] = await client.faceDetection(profilephoto)
      const faces = faceResponse.faceAnnotations ?? undefined

      const [safeSearchResponse] = await client.safeSearchDetection(profilephoto)
      const safeSearch = safeSearchResponse.safeSearchAnnotation

      results.push({
        userid,
        results: { faces, safeSearch },
      })
    } catch (error) {
      if (error instanceof Error) {
        results.push({
          userid,
          results: { error: `Error analyzing photo: ${error.message}` },
        })
      } else {
        results.push({
          userid,
          results: { error: "An unknown error occurred" },
        })
      }
    }
  }

  return results
}

// Ensure the analyze function is the default export
export default analyze

