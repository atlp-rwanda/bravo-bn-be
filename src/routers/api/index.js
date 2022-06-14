import express from "express";
import userRouter from "./users";
import swaggerRouter from "./swagger.js";
import authRouter from "./authentication";

const apiRouter = express.Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/user/auth", authRouter);
apiRouter.use("/docs", swaggerRouter);

export default apiRouter;
