// import { Request, Response, NextFunction, Router } from "express";
// import * as jwt from "jsonwebtoken";
// import { CONFIG } from "../config";

// export const validateToken = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     jwt.verify(token, CONFIG.jwtSecretKey);
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid Credentials" });

//     console.log(error);
//   }
// };

// place this in the route as such:
// router.get("/verify", validateToken, async (req, res) => {
//   res.json({ message: "token is good!" });
// });
