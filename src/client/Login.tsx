import React, { useState } from "react";
import * as Types from "../types";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Validation from "./Client_Utils/DataValidation";

const Loginpage = () => {
  const nav = useNavigate();

  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  //!  this needs to accept email to log in; plus the password

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    Validation.isValidEmail(email)
      .then(() => console.log(`Validation Complete.`))
      .catch((error) => {
        console.log(`Bad Email Check Error...\n`);
        console.error(error);
        alert("Please check your credentials");
        return;
      });

    //!gotta make this work lol
    // if (username === "Ervin Howell") {
    //   const secretTrackz = new Audio(`../secretTrack.mp3`);
    //   secretTrackz.play();
    // }

    nav(`/blogs`);
  };

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div className="card bg-light shadow col-md-4">
          <div className="card-body d-flex flex-wrap justify-content-center">
            <h5 className="card-title text-center col-md-7">Please log in, or click the new user button</h5>

            <input
              id="email"
              placeholder="email"
              type="email"
              value={email}
              className="form-control col-md-7 mt-1"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              id="password"
              placeholder="password"
              type="text"
              value={password}
              className="form-control col-md-7 mb-1"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button variant="contained" className="btn btn-primary my-2 ms-2 col-md-6" type="button" onClick={(e) => handleLogin(e)}>
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
