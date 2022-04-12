import React from "react";
import * as Types from "../types";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Loginpage = (props: Types.LoginPageProps) => {
  const nav = useNavigate();
  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div className="card bg-light shadow col-md-4">
          <div className="card-body d-flex flex-wrap justify-content-center">
            <h5 className="card-title text-center col-md-7">Please log in, or click the new user button</h5>
            <input id="username" placeholder="Username" type="text" value={props.username} className="form-control col-md-7 mb-1" onChange={(e) => props.handleUsernameChange(e)} />
            <input
              id="password"
              placeholder="Password"
              type="password"
              value={props.password}
              className="form-control col-md-7 mt-1"
              onChange={(e) => props.handlePasswordChange(e)}
            />
            <Button variant="contained" className="btn btn-primary my-2 ms-2 col-md-6" type="button" onClick={(e) => props.handleLoggingIn(e)}>
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
