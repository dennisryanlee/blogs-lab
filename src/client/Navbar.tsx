import { Button } from "@mui/material";
import * as React from "react";
import * as Types from "../types";
import { Link } from "react-router-dom";

const Navbar = (props: Types.NavbarProps) => {
  const handleLoggingOut = () => {
    // setUsername("");
    // setPassword("");
    // setloggedIn(!loggedIn);
    // nav("/");
  };
  return (
    <>
      <div className="mb-4">
        <Link to="/newblog">
          <Button variant="contained" onClick={() => {}} className="btn btn-primary mx-1">
            New Blog
          </Button>
        </Link>
        <Link to="/blogs">
          <Button variant="contained" onClick={() => {}} className="btn btn-primary mx-1">
            Blogs
          </Button>
        </Link>
        <Link to="/users">
          <Button variant="contained" onClick={() => {}} className="btn btn-primary mx-1">
            Authors
          </Button>
        </Link>
        <Link to="/donate">
          <Button variant="contained" onClick={() => {}} className="btn btn-primary mx-1">
            Donate
          </Button>
        </Link>
        <Link to="/">
          <Button
            variant="contained"
            onClick={() => {
              const secretTrackz2 = new Audio(`../okbye.mp3`);
              secretTrackz2.play();
            }}
            className="btn btn-primary mx-1"
          >
            Logout
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
