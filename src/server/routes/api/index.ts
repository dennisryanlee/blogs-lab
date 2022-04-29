// /routes/api/api_index.ts

import * as express from "express";

import usersRouter from "./userRoutes";
import blogRouter from "./blogRoutes";
import contactRouter from "./contactRoutes";
import donateRouter from "./donateRoutes";
import tagRouter from "./tagRoutes";

const apiRouter = express.Router();

// Current Route is /api

apiRouter.use("/users", usersRouter);
apiRouter.use("/blogs", blogRouter);
apiRouter.use("/contact", contactRouter);
apiRouter.use("/donate", donateRouter);
apiRouter.use("/tags", tagRouter);

export default apiRouter;
