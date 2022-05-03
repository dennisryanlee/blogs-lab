import { Button } from "@mui/material";
import * as React from "react";
import * as Types from "../types";
import { Link } from "react-router-dom";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import fetcher from "./Client_Utils/fetcher";

const Navbar = (props: Types.NavbarProps) => {
  const loc = useLocation();

  const protectedRoutes = [`/someroute`, `someotherroute`];

  useEffect(() => {
    //this will fire every time the user navigates to a new path
    console.log(`You are on ${loc.pathname}`);

    if (protectedRoutes.includes(loc.pathname)) {
      //token check here
      fetcher
        .GET("my auth route here")
        .then((data) => console.log(data))
        .catch((error) => {
          console.log(`error...\n`);
          console.error(error);
          //! maybe nav back somwhere?
        });
    }
  }, [loc.pathname]);
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
          <Button variant="contained" className="btn btn-primary mx-1">
            New Blog
          </Button>
        </Link>
        <Link to="/blogs">
          <Button variant="contained" className="btn btn-primary mx-1">
            Blogs
          </Button>
        </Link>
        <Link to="/users">
          <Button variant="contained" className="btn btn-primary mx-1">
            Authors
          </Button>
        </Link>
        <Link to="/donate">
          <Button variant="contained" className="btn btn-primary mx-1">
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
