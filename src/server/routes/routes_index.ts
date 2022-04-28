// /routes/routes_index/.ts

import * as express from "express";
import apiRouter from "./api/api_index";
import authRouter from "./auth/auth_index";

const baseRouter = express.Router();

// Current route is /

baseRouter.use("/api", apiRouter);
baseRouter.use("/auth", authRouter);

export default baseRouter;
