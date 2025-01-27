import express, { type Request, type Response } from "express";
import { getVisionClient } from "../visionClient";  // Adjust the path as needed

const router: express.Router = express.Router();

interface User {
	userid: string;
	profilephoto: string;
}

interface AnalysisResult {
	userid: string;
	results: {
		faces?: any[];
		safeSearch?: any;
		error?: string;
	};
}

router.post("/analyzePhotos", async (req: Request, res: Response) => {
	try {
		const { users } = req.body as { users: User[] };

		if (!users || !Array.isArray(users)) {
			return res.status(400).json({
			  success: false,
			  message: 'Invalid input. "users" must be an array of objects with "userid" and "profilephoto".',
			});
		  }

		const client = getVisionClient();
		const results: AnalysisResult[] = [];

		for (const user of users) {
			const { userid, profilephoto } = user;

			try {
				const [faceResponse] = await client.faceDetection(profilephoto);
				const faces = faceResponse.faceAnnotations ?? undefined;

				const [safeSearchResponse] = await client.safeSearchDetection(
					profilephoto
				);
				const safeSearch = safeSearchResponse.safeSearchAnnotation;

				results.push({
					userid,
					results: { faces, safeSearch },
				});
			} catch (error) {
				if (error instanceof Error) {
					results.push({
						userid,
						results: { error: `Error analyzing photo: ${error.message}` },
					});
				} else {
					results.push({
						userid,
						results: { error: "An unknown error occurred" },
					});
				}
			}
		}

		res.json({ success: true, data: results });
	} catch (error) {
		res.status(500).json({
			success: false,
			message: `Server error: ${
				error instanceof Error ? error.message : "An unknown error occurred"
			}`,
		});
	}
});

export default router;
