import * as express from "express";
import apiRouter from "../api/api_index";
import authenticationRouter from "./authenticationRouter";

const authRouter = express.Router();

apiRouter.use("/auth", authenticationRouter);

export default authRouter;
