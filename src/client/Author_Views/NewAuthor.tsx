import { Button } from "@mui/material";
import * as React from "react";
import * as Types from "../../types";

const NewAuthor = (props: Types.NewAuthorProps) => {
  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div className="card bg-light shadow col-md-4">
          <div className="card-body d-flex flex-wrap justify-content-center">
            <h5 className="card-title text-center col-md-7">Please enter your information below</h5>
            <input
              placeholder="Author Name (username)"
              type="text"
              value={props.username}
              className="form-control col-md-7 mb-1"
              onChange={(e) => props.handleUsernameChange(e)}
            />
            <input
              placeholder="Email"
              type="email"
              value={props.email}
              className="form-control col-md-7 my-1"
              onChange={(e) => props.handleEmailChange(e)}
            />
            <textarea
              placeholder="Tell us about yourself."
              value={props.authorbio}
              className="form-control col-md-7 mt-1"
              onChange={(e) => props.handleAuthorBioChange(e)}
            ></textarea>
            <Button
              variant="contained"
              className="btn btn-primary my-2 ms-2 col-md-6"
              type="button"
              onClick={(e) => props.handleNewAuthorLogin(e)}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewAuthor;
