// /routes/auth/auth_index.ts

import * as express from "express";
import db from "../../db";
import { compareHash } from "../../Utils/Passwords";
import Validation from "../../Utils/DataValidation";

const authRouter = express.Router();

// Current Route is /auth

//Auth test route
authRouter.get(`/`, (req, res) => {
  res.json({ message: `authentication router is working!!` });
});

// Log a user in
authRouter.post("/login", async (req, res) => {
  // pull out the email and plaintext password for convenience
  const email = req.body.email;
  const password = req.body.password;
  try {
    // if the email provided is in the db, then userFound is an author entry, else is undefined
    // userFound is our author from the database
    const [userFound] = await db.Login.FindAuthor("email", email);

    if (userFound && compareHash(password, userFound.password)) {
      // if user is found && the provided password matches the hashed pass on the db
      res.status(200).json("Login Successful!");
    } else {
      // if user fails the checks above, then we return with a 401, and stop execution
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `login failed` });
  }
});

// Register an account
authRouter.get("/register", (req, res) => {
  try {
    res.status(200).json({ message: `register successful!` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `register failed` });
  }
});

export default authRouter;
