import express, { Request, Response, NextFunction } from "express";
export interface ServerOptions {
    port?: number;
    routes?: (app: express.Application) => void;
    onError?: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}
/**
 * Create and start the server.
 * @param options Configuration options for the server.
 */
export declare function createServer(options?: ServerOptions): import("express-serve-static-core").Express;
