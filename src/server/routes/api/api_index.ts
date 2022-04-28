// /routes/api/api_index.ts

import * as express from "express";

import authorRouter from "../api/authorRoutes";
import blogRouter from "../api/blogRoutes";
import contactRouter from "../api/contactRoutes";
import donateRouter from "../api/donateRoutes";
import tagRouter from "../api/tagRoutes";

const apiRouter = express.Router();

// Current Route is /api

apiRouter.use("/authors", authorRouter);
apiRouter.use("/blogs", blogRouter);
apiRouter.use("/contact", contactRouter);
apiRouter.use("/donate", donateRouter);
apiRouter.use("/tags", tagRouter);

export default apiRouter;
