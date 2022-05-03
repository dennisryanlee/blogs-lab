import React, { useState } from "react";
import * as Types from "../types";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Validation from "./Client_Utils/DataValidation";

const Loginpage = () => {
  const nav = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  //!  this needs to accept username or email to log in;  plus the password

  const handleLogin = () => {
    //! This needs to do login / auth logic
    //fetch from /auth/login here
  };

  // const handleLoggingIn = (e: MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();

  //   Validation.isValidString([username, password])
  //     .then(() => console.log(`Validation complete.`))
  //     .catch((error) => {
  //       console.error(error);
  //       alert("Please check your credentials");
  //       return;
  //     });

  //   if (password.length <= 8) {
  //     alert("Check your credentials");
  //     return;
  //   }
  //   if (username === "Ervin Howell") {
  //     const secretTrackz = new Audio(`../secretTrack.mp3`);
  //     secretTrackz.play();
  //   }

  //   navToBlogs();

  //   return setloggedIn(!loggedIn);
  // };

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div className="card bg-light shadow col-md-4">
          <div className="card-body d-flex flex-wrap justify-content-center">
            <h5 className="card-title text-center col-md-7">Please log in, or click the new user button</h5>
            <input
              id="username"
              placeholder="Username"
              type="text"
              value={username}
              className="form-control col-md-7 mb-1"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              id="email"
              placeholder="email"
              type="email"
              value={email}
              className="form-control col-md-7 mt-1"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button variant="contained" className="btn btn-primary my-2 ms-2 col-md-6" type="button" onClick={() => handleLogin()}>
              Login
            </Button>
            <Button variant="contained" className="btn btn-primary my-2 ms-2 col-md-6" type="button" onClick={() => nav("/newauthor")}>
              I am a new Author
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loginpage;
