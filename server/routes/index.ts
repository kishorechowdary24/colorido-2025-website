import { Express } from "express";
import registerRouter from "./register";

export const registerRoutes = async (app: Express) => {
  app.use("/api/registrations", registerRouter);
  return app;
};
