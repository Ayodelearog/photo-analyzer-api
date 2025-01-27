"use strict";
// import express, { type Request, type Response } from "express"
// import { ImageAnnotatorClient } from "@google-cloud/vision"
// import dotenv from "dotenv"
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config()
// const router = express.Router()
// const credentialsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON
// if (!credentialsJson) {
//   throw new Error("GOOGLE_APPLICATION_CREDENTIALS_JSON is not defined in the environment variables.")
// }
// let credentials
// try {
//   credentials = JSON.parse(credentialsJson)
// } catch (error) {
//   throw new Error("Failed to parse GOOGLE_APPLICATION_CREDENTIALS_JSON. Make sure it's a valid JSON string.")
// }
// const client = new ImageAnnotatorClient({ credentials })
// interface User {
//   userid: string
//   profilephoto: string
// }
// interface AnalysisResult {
//   userid: string
//   results: {
//     faces?: any[]
//     safeSearch?: any
//     error?: string
//   }
// }
// router.post("/analyzePhotos", async (req: Request, res: Response) => {
//   try {
//     const { users } = req.body as { users: User[] }
//     if (!users || !Array.isArray(users)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid input. "users" must be an array.',
//       })
//     }
//     const results: AnalysisResult[] = []
//     for (const user of users) {
//       const { userid, profilephoto } = user
//       try {
//         // Analyze the photo for faces
//         const [faceResponse] = await client.faceDetection(profilephoto)
//         const faces = faceResponse.faceAnnotations
//         if (!faces || faces.length === 0) {
//           results.push({
//             userid,
//             results: { error: "No faces detected in the photo." },
//           })
//           continue
//         }
//         // Analyze the photo for SafeSearch
//         const [safeSearchResponse] = await client.safeSearchDetection(profilephoto)
//         const safeSearch = safeSearchResponse.safeSearchAnnotation
//         results.push({
//           userid,
//           results: {
//             faces,
//             safeSearch,
//           },
//         })
//       } catch (error) {
//         if (error instanceof Error) {
//           results.push({
//             userid,
//             results: { error: `Error analyzing photo: ${error.message}` },
//           })
//         } else {
//           results.push({
//             userid,
//             results: { error: "An unknown error occurred" },
//           })
//         }
//       }
//     }
//     res.json({ success: true, data: results })
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: `Server error: ${error instanceof Error ? error.message : "An unknown error occurred"}`,
//     })
//   }
// })
// export default router
const express_1 = __importDefault(require("express"));
const visionClient_1 = require("../visionClient"); // Adjust the path as needed
const router = express_1.default.Router();
router.post("/analyzePhotos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { users } = req.body;
        if (!users || !Array.isArray(users)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid input. "users" must be an array.',
            });
        }
        const client = (0, visionClient_1.getVisionClient)();
        const results = [];
        for (const user of users) {
            const { userid, profilephoto } = user;
            try {
                const [faceResponse] = yield client.faceDetection(profilephoto);
                const faces = (_a = faceResponse.faceAnnotations) !== null && _a !== void 0 ? _a : undefined;
                const [safeSearchResponse] = yield client.safeSearchDetection(profilephoto);
                const safeSearch = safeSearchResponse.safeSearchAnnotation;
                results.push({
                    userid,
                    results: { faces, safeSearch },
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    results.push({
                        userid,
                        results: { error: `Error analyzing photo: ${error.message}` },
                    });
                }
                else {
                    results.push({
                        userid,
                        results: { error: "An unknown error occurred" },
                    });
                }
            }
        }
        res.json({ success: true, data: results });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `Server error: ${error instanceof Error ? error.message : "An unknown error occurred"}`,
        });
    }
}));
exports.default = router;
