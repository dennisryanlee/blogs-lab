import * as React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Fetcher, { TOKEN_KEY } from "./Client_Utils/Fetcher";
import * as Types from "../types";

const Navbar = () => {
  const [loggedIn, setloggedIn] = useState<boolean>(false);
  const nav = useNavigate();
  const loc = useLocation();

  const PublicPages = [`/`, `/donate`, `/newauthor`];

  useEffect(() => {
    //this will fire every time the user navigates to a new path, checking if they have a valid token
    // console.log(`You are on ${loc.pathname}`);

    if (!PublicPages.includes(loc.pathname)) {
      Fetcher.POST("/auth/checkToken", null)
        .then((data) => {
          // console.log(data);
          if (data.message === `valid token!`) setloggedIn(true);
        })
        .catch((error) => {
          setloggedIn(false);
          // console.log(`are we really here?`);
          console.log(`error...\n`);
          console.error(error);
          nav("/"); // Navigate user to login page if error occurs
        });
    }
  }, [loc.pathname]);

  return (
    <>
      {loggedIn && (
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
                setloggedIn(false);
                localStorage.removeItem(TOKEN_KEY); // clear any data (our token) in local storage
                nav("/");
              }}
              className="btn btn-primary mx-1"
            >
              Logout
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
