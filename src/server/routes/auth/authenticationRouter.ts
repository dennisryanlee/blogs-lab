// import * as express from "express";
// import db from "../../db";
// import Validation from "../../Utils/DataValidation";

// const authenticationRouter = express.Router();

// // Current route is /auth/auth

// //Auth test route
// authenticationRouter.get(`/`, (req, res) => {
//   res.json({ message: `authentication router is working!!` });
// });

// // Log a user in
// authenticationRouter.post("/login", (req, res) => {
//   try {
//     const email = req.body.email;
//     const password = req.body.password;
//     res.status(200).json({ message: `login successful!` });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: `login failed` });
//   }
// });

// // Register an account
// authenticationRouter.get("/register", (req, res) => {});

// export default authenticationRouter;
