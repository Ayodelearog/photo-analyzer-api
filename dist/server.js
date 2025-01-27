"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = createServer;
const express_1 = __importDefault(require("express"));
const analyzePhotos_1 = __importDefault(require("./routes/analyzePhotos"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * Create and start the server.
 * @param options Configuration options for the server.
 */
function createServer(options = {}) {
    const app = (0, express_1.default)();
    const port = options.port || Number(process.env.PORT) || 3000;
    // Middleware to parse JSON request bodies
    app.use(express_1.default.json());
    // Logging middleware
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.url}`);
        next();
    });
    // Add default or custom routes
    if (options.routes) {
        options.routes(app);
    }
    else {
        app.use("/api", analyzePhotos_1.default);
    }
    // 404 handler
    app.use((req, res) => {
        res.status(404).json({ error: "Not Found" });
    });
    // Error handler
    app.use(options.onError ||
        ((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).json({ error: "Internal Server Error" });
        }));
    // Start the server
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
    return app;
}
