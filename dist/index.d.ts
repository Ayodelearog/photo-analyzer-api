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
export declare function analyze(users: User[]): Promise<AnalysisResult[]>;
export default analyze;
