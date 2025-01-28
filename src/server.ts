import express from 'express';
import  analyzePhotosRoute  from './routes/analyzePhotos';

export interface ServerOptions {
  port?: number;
  routes?: (app: express.Application) => void;
}

export function createServer(options: ServerOptions = {}) {
  const app = express();
  const port = options.port || Number(process.env.PORT) || 3000;

  // Middleware to parse JSON request bodies
  app.use(express.json());

  // Add routes
  if (options.routes) {
    options.routes(app);
  } else {
    app.use('/api', analyzePhotosRoute);
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