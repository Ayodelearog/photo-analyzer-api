"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = createServer;
const express_1 = __importDefault(require("express"));
const analyzePhotos_1 = __importDefault(require("./routes/analyzePhotos"));
function createServer(options = {}) {
    const app = (0, express_1.default)();
    const port = options.port || Number(process.env.PORT) || 3000;
    // Middleware to parse JSON request bodies
    app.use(express_1.default.json());
    // Add routes
    if (options.routes) {
        options.routes(app);
    }
    else {
        app.use('/api', analyzePhotos_1.default);
    }
    // 404 handler
    app.use((req, res) => {
        res.status(404).json({ error: 'Not Found' });
    });
    // Error handler
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    });
    return {
        start: () => {
            app.listen(port, () => {
                console.log(`Server is running on http://localhost:${port}`);
                console.log('Press CTRL-C to stop');
            });
        },
        app
    };
}
// If this file is run directly, start the server
if (require.main === module) {
    const server = createServer();
    server.start();
}
