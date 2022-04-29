// /routes/auth/auth_index.ts

import * as express from "express";
import * as jwt from "jsonwebtoken";
import db from "../../db";
import { CONFIG } from "../../config";
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
      //! I can probably put some payloads for different roles in the Utils folder and use them here
      // token takes a payload as the first argument
      // and the jwt secret signature as the second
      // optionally provide an expiration for the token as a third argument

      const token = jwt.sign({ userid: userFound.id, email: userFound.email, role: `guest` }, CONFIG.jwtSecretKey, { expiresIn: `10d` });
      // if user is found && the provided password matches the hashed pass on the db
      res.status(200).json({ token });
    } else {
      // if user fails the checks above, then we return with a 401, and stop execution
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(`Login fail error incoming`);
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

authRouter.get(`/changethislol`, (req, res) => {
  try {
    //grab the token from the headers and split it
    // bearerToken is expected to be an array: [`bearer`, `tokenhere`]
    const bearerToken: string[] = req.headers.authorization?.split(` `);

    // check the authorization scheme AND existence of the token
    if (bearerToken[0] !== `Bearer` || !bearerToken[1]) {
      res.status(401).json({ message: `Unauthorized` });
      return;
    }

    // verify the token, and return the payload
    const payload = jwt.verify(bearerToken[1], CONFIG.jwtSecretKey);
    console.log(payload);
    res.status(200).json({ message: `good to go`, payload });
  } catch (error) {
    console.log(`Bad token error incoming (i think)`);
    console.log(error);
    res.status(400).json({ message: `Not good to go` });
  }
});

export default authRouter;
