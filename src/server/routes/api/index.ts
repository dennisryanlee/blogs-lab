// /routes/api/api_index.ts

import * as express from "express";

import usersRouter from "./userRoutes";
import blogRouter from "./blogRoutes";
import contactRouter from "./contactRoutes";
import donateRouter from "./donateRoutes";
import tagRouter from "./tagRoutes";
import { validateToken } from "../../Middleware";

const apiRouter = express.Router();

// Current Route is /api

// apiRouter

apiRouter.use("/users", validateToken, usersRouter);
apiRouter.use("/blogs", validateToken, blogRouter);
apiRouter.use("/contact", validateToken, contactRouter);
apiRouter.use("/donate", donateRouter);
apiRouter.use("/tags", validateToken, tagRouter);

export default apiRouter;

// apiRouter
//   .post("/blogs", validateToken, blogRouter)
//   .put("/blogs", validateToken, blogRouter)
//   .delete("/blogs", validateToken, blogRouter);
// apiRouter.get("/blogs", blogRouter);
