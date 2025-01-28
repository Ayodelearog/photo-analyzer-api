"use strict";
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
                message: 'Invalid input. "users" must be an array of objects with "userid" and "profilephoto".',
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
