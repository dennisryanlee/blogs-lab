// /routes/auth/auth_index.ts

import * as express from "express";
import db from "../../db";
import Validation from "../../Utils/DataValidation";

const authRouter = express.Router();

// Current Route is /auth

//Auth test route
authRouter.get(`/`, (req, res) => {
  res.json({ message: `authentication router is working!!` });
});

// Log a user in
authRouter.post("/login", (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    res.status(200).json({ message: `login successful!` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `login failed` });
  }
});

// Register an account
authRouter.get("/register", (req, res) => {});

export default authRouter;
