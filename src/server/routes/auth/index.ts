// /routes/auth/auth_index.ts

import * as express from "express";
import { giveTokenToNewUser, giveTokenToExistingUser, validateToken } from "../../Middleware";

const authRouter = express.Router();

// Current Route is /auth

//Auth test route
authRouter.get(`/checkToken`, validateToken, (req, res) => {
  res.json({ message: `valid token!` });
});

// Log a user in "/auth/login"
// Middleware sends the response
authRouter.post("/login", giveTokenToExistingUser);

// Register an account
// Middleware sends the response
authRouter.post("/register", giveTokenToNewUser);

export default authRouter;
