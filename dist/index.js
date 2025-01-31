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
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyze = analyze;
const visionClient_1 = require("./visionClient");
function analyzeImage(client, image) {
    return __awaiter(this, void 0, void 0, function* () {
        const [faceResponse] = yield client.faceDetection(image);
        const faces = faceResponse.faceAnnotations || [];
        const [safeSearchResponse] = yield client.safeSearchDetection(image);
        const safeSearch = safeSearchResponse.safeSearchAnnotation || {};
        return { faces, safeSearch };
    });
}
function analyze(users) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = (0, visionClient_1.getVisionClient)();
        const results = [];
        for (const user of users) {
            const { userid, profilephoto } = user;
            try {
                let imageSource;
                if (profilephoto.startsWith("data:image") ||
                    /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/.test(profilephoto)) {
                    // If it's a base64 string, convert it to a Buffer
                    const base64Data = profilephoto.replace(/^data:image\/\w+;base64,/, "");
                    imageSource = Buffer.from(base64Data, "base64");
                }
                else {
                    // If it's a URL, pass it as a string
                    imageSource = profilephoto;
                }
                const { faces, safeSearch } = yield analyzeImage(client, imageSource);
                results.push({
                    userid,
                    results: { faces, safeSearch },
                });
            }
            catch (error) {
                results.push({
                    userid,
                    results: {
                        error: error instanceof Error ? `Error analyzing photo: ${error.message}` : "An unknown error occurred",
                    },
                });
            }
        }
        return results;
    });
}
exports.default = analyze;
