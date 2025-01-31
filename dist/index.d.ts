import type { protos } from "@google-cloud/vision";
interface User {
    userid: string;
    profilephoto: string;
}
interface AnalysisResult {
    userid: string;
    results: {
        faces?: protos.google.cloud.vision.v1.IFaceAnnotation[];
        safeSearch?: protos.google.cloud.vision.v1.ISafeSearchAnnotation;
        error?: string;
    };
}
export declare function analyze(users: User[]): Promise<AnalysisResult[]>;
export default analyze;
