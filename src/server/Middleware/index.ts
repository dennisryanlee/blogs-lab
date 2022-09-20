import { Request, Response, NextFunction, Router } from "express";
import * as jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../config";
import db from "../db";
import { generateHash, compareHash } from "../Server_Utils/Passwords";
import * as Types from "../../types";

// checks if a token is valid
export const validateToken = (req: Types.ReqUser, res: Response, next: NextFunction) => {
  try {
    // grab the token from the headers and split it
    // bearerToken is expected to be an array: [`bearer`, `tokenhere`]
    const bearerToken: string[] = req.headers.authorization?.split(` `)!;

    // check the authorization scheme AND existence of the token
    if (bearerToken[0] !== `Bearer` || !bearerToken[1]) {
      res.status(401).json({ message: `Unauthorized` });
      return;
    }

    // verify the token, and return the payload
    const payload = jwt.verify(bearerToken[1], JWT_CONFIG.jwtSecretKey!, {
      complete: false,
    }) as Types.TokenPayload;

    // console.log(payload);

    // res.status(200).json({ message: `good to go`, payload });

    req!.user! = payload;

    next();
  } catch (error) {
    console.log(`Validate Token Error...\n`);
    console.error(error);
    res.status(401).json({ message: "Invalid Credentials" });
  }
};

// Gives a token to an existing user
export const giveTokenToExistingUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // pull out the email and plaintext password for convenience
    const email = req.body.email;
    const password = req.body.password;

    // if the email provided is in the db, then userFound is an author entry, else is undefined
    // userFound is our author from the database
    const [userFound] = await db.Login.FindAuthor(email);
    // console.log(`userFound: `, userFound);

    if (userFound && compareHash(password, userFound.password!)) {
      //! I can probably put some payloads for different roles in the Utils folder and use them here
      // token takes a payload as the first argument
      // and the jwt secret signature as the second
      // optionally provide an expiration for the token as a third argument

      const token = jwt.sign(
        { username: userFound.authorname, userid: userFound.id, email: userFound.email, role: `guest` },
        JWT_CONFIG.jwtSecretKey!,
        {
          expiresIn: `10d`,
        }
      );
      // if user is found && the provided password matches the hashed pass on the db
      // console.log(`Token: `, token);
      res.status(200).json({ token });
    } else {
      // if user fails the checks above, then we return with a 401, and stop execution
      console.log(`Token was not found`);
      res.status(401).json({ message: "Invalid Credentials" });
    }

    // next();  don't use this, since we send a response
  } catch (error) {
    console.log(`Give Token To Existing User Middleware error...`);
    console.error(error);
    res.status(401).json({ message: `Login Failed` });
  }
};

// Register a new user and give a token
export const giveTokenToNewUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    /**
     * get pass, then hash pass
     * send new author info to db
     *
     */

    // pull out the new author info
    const authorname = req.body.authorname;
    const email = req.body.email;
    const authorbio = req.body.authorbio;
    const plainTextPassword = req.body.password;

    // if (passCheck.isPwned) {
    //   // If crap pass, do this
    //   res.status(401).json({ message: `Bad Password`, breaches: passCheck.breaches });
    //   return;
    // }

    const hashedPassword = generateHash(plainTextPassword); // hash the password for delivery to db!

    // put new author info into an object
    const newAuthorInfo: Types.newAuthorInfo = { authorname, email, password: hashedPassword, authorbio };

    //register a new author with the new author info
    const newAuthorRes = await db.Login.registerNewAuthor(newAuthorInfo);

    const token = jwt.sign(
      { username: authorname, userid: newAuthorRes.rows[0].id, email, role: `guest` },
      JWT_CONFIG.jwtSecretKey!,
      {
        expiresIn: `10d`,
      }
    );
    // console.log(`Token: `, token);
    res.status(200).json({ token });
  } catch (error) {
    console.log(`Give Token New User Middleware error...`);
    console.error(error);
    res.status(401).json({ message: `Login Failed` });
  }
};

// place this in the route as such:
// router.get("/verify", validateToken, async (req, res) => {
//   res.json({ message: "token is good!" });
// });
