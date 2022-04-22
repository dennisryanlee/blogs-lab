// routes/index.ts
import * as express from "express";
import blogRouter from "../routes/blogRoutes";
import authorRouter from "../routes/authorRoutes";
import tagRouter from "../routes/tagRoutes";
import donateRouter from "../routes/donateRoutes";

const apiRouter = express.Router();

apiRouter.use("/donate", donateRouter);
apiRouter.use("/api/blogs", blogRouter);
apiRouter.use("/api/authors", authorRouter);
apiRouter.use("/api/tags", tagRouter);

export default apiRouter;
