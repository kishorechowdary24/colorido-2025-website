import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import { registerRoutes } from "./routes";
import { connectDB } from "./db";
import dotenv from "dotenv";

dotenv.config();

(async () => {
  await connectDB();

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Log API requests
  app.use((req, res, next) => {
    const start = Date.now();
    const pathReq = req.path;
    let capturedJsonResponse: Record<string, any> | undefined;

    const originalResJson = res.json;
    res.json = function (bodyJson, ...args) {
      capturedJsonResponse = bodyJson;
      return originalResJson.apply(res, [bodyJson, ...args]);
    };

    res.on("finish", () => {
      const duration = Date.now() - start;
      if (pathReq.startsWith("/api")) {
        let logLine = `${req.method} ${pathReq} ${res.statusCode} in ${duration}ms`;
        if (capturedJsonResponse) logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
        console.log(logLine);
      }
    });

    next();
  });

  await registerRoutes(app);

  // Error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    console.error(err);
  });

  const port = parseInt(process.env.PORT || "5000", 10);
  app.listen(port, "0.0.0.0", () => console.log(`Server running on port ${port}`));
})();
