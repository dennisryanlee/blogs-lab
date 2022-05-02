import { Request, Response, NextFunction, Router } from "express";
import * as jwt from "jsonwebtoken";
import { CONFIG } from "../config";
import db from "../db";
import { compareHash } from "../Server_Utils/Passwords";

// checks if a token is valid
export const validateToken = (req: Request, res: Response, next: NextFunction) => {
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
    // res.status(200).json({ message: `good to go`, payload });

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid Credentials" });
  }
};

// Gives a token to a registered user
export const giveToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // pull out the email and plaintext password for convenience
    const email = req.body.email;
    const password = req.body.password;

    // if the email provided is in the db, then userFound is an author entry, else is undefined
    // userFound is our author from the database
    const [userFound] = await db.Login.FindAuthor("email", email);
    if (userFound && compareHash(password, userFound.password)) {
      //! I can probably put some payloads for different roles in the Utils folder and use them here
      // token takes a payload as the first argument
      // and the jwt secret signature as the second
      // optionally provide an expiration for the token as a third argument

      const token = jwt.sign(
        { username: userFound.authorname, userid: userFound.id, email: userFound.email, role: `guest` },
        CONFIG.jwtSecretKey,
        { expiresIn: `10d` }
      );
      // if user is found && the provided password matches the hashed pass on the db
      res.status(200).json({ token });
    } else {
      // if user fails the checks above, then we return with a 401, and stop execution
      res.status(401).json({ message: "Invalid Credentials" });
    }
    next();
  } catch (error) {
    console.log(`Give Token Middleware error...`);
    console.log(error);
    res.status(401).json({ message: `Login Failed` });
  }
};

// place this in the route as such:
// router.get("/verify", validateToken, async (req, res) => {
//   res.json({ message: "token is good!" });
// });
