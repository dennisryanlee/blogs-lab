import { Button } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import * as Types from "../../types";

const NewAuthor = (props: Types.NewAuthorProps) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [authorbio, setAuthorBio] = useState<string>("");
  const [authorid, setAuthorId] = useState<number>(25);

  const handleNewAuthorLogin = () => {
    //! do new author logic + auth logic here
  };

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div className="card bg-light shadow col-md-4">
          <div className="card-body d-flex flex-wrap justify-content-center">
            <h5 className="card-title text-center col-md-7">Please enter your information below</h5>
            <input
              placeholder="Author Name (username)"
              type="text"
              value={username}
              className="form-control col-md-7 mb-1"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder="Email"
              type="email"
              value={email}
              className="form-control col-md-7 my-1"
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              placeholder="Tell us about yourself."
              value={authorbio}
              className="form-control col-md-7 mt-1"
              onChange={(e) => setAuthorBio(e.target.value)}
            ></textarea>
            <Button variant="contained" className="btn btn-primary my-2 ms-2 col-md-6" type="button" onClick={() => handleNewAuthorLogin()}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewAuthor;
