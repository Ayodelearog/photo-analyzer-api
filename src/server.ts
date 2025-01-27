import express, { Request, Response, NextFunction } from "express";
import analyzePhotosRoute from "./routes/analyzePhotos";
import dotenv from "dotenv";

dotenv.config();

export interface ServerOptions {
	port?: number;
	routes?: (app: express.Application) => void;
	onError?: (
		err: Error,
		req: Request,
		res: Response,
		next: NextFunction
	) => void;
}

/**
 * Create and start the server.
 * @param options Configuration options for the server.
 */
export function createServer(options: ServerOptions = {}): express.Application {
	const app: express.Application = express();
	const port: number = options.port || Number(process.env.PORT) || 3000;

	// Middleware to parse JSON request bodies
	app.use(express.json());

	// Logging middleware
	app.use((req, res, next) => {
		// console.log(`${req.method} ${req.url}`);
		next();
	});

	// Add default or custom routes
	if (options.routes) {
		options.routes(app);
	} else {
		app.use("/api", analyzePhotosRoute);
	}

	// 404 handler
	app.use((req, res) => {
		res.status(404).json({ error: "Not Found" });
	});

	// Error handler
	app.use(
		options.onError ||
			((err: Error, req: Request, res: Response, next: NextFunction) => {
				console.error(err.stack);
				res.status(500).json({ error: "Internal Server Error" });
			})
	);

	// Start the server
	app.listen(port, () => {
		console.log(`Server is running on port ${port}`);
	});

	return app;
}


