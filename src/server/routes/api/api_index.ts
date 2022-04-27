// routes/api/index.ts
import * as express from "express";
import blogRouter from "./api_index";
import authorRouter from "./api_index";
import tagRouter from "./api_index";
import donateRouter from "./api_index";
import contactRouter from "./contactRoutes";

const apiRouter = express.Router();

apiRouter.use("/api/contact", contactRouter);
apiRouter.use("/api/donate", donateRouter);
apiRouter.use("/api/blogs", blogRouter);
apiRouter.use("/api/authors", authorRouter);
apiRouter.use("/api/tags", tagRouter);

export default apiRouter;
