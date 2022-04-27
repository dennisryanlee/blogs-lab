// routes/index.ts
import * as express from "express";
import apiRouter from "./api/api_index";
import authRouter from "./auth/auth_index";

const allRouter = express.Router();

allRouter.use("/api", apiRouter);
allRouter.use("/auth", authRouter);

export default allRouter;
