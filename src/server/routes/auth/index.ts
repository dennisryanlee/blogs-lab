// /routes/auth/auth_index.ts

import * as express from "express";
import { giveTokenToNewUser, giveTokenToExistingUser, validateToken } from "../../Middleware";

const authRouter = express.Router();

// Current Route is /auth

//Auth test route
authRouter.post(`/`, validateToken, (req, res) => {
  res.json({ message: `valid token!` });
});

// Log a user in
authRouter.post("/login", giveTokenToExistingUser, async (req, res) => {
  try {
    res.status(200).json({ message: `Login successful!` });
  } catch (error) {
    console.log(`Give Token To Existing User Error...\n`);
    console.error(error);
    res.status(500).json({ message: `Login failed` });
  }
});

// Register an account
authRouter.post("/register", giveTokenToNewUser, (req, res) => {
  try {
    res.status(200).json({ message: `Register successful!` });
  } catch (error) {
    console.log(`Register Failure Error...\n`);
    console.error(error);
    res.status(500).json({ message: `Register failed` });
  }
});

export default authRouter;
