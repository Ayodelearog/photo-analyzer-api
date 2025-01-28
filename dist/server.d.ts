import express from 'express';
export interface ServerOptions {
    port?: number;
    routes?: (app: express.Application) => void;
}
export declare function createServer(options?: ServerOptions): {
    start: () => void;
    app: import("express-serve-static-core").Express;
};
