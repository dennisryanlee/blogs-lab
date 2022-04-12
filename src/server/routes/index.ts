// routes/index.ts
import * as express from "express";
import blogRouter from "../routes/blogRoutes";
import authorRouter from "../routes/authorRoutes";
import tagRouter from "../routes/tagRoutes";

const apiRouter = express.Router();

apiRouter.use("/blogs", blogRouter);
apiRouter.use("/authors", authorRouter);
apiRouter.use("/tags", tagRouter);

export default apiRouter;
