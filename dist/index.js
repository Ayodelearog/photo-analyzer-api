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
function analyze(users) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
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
        return results;
    });
}
// Ensure the analyze function is the default export
exports.default = analyze;
