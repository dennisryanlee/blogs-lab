import * as React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Fetcher, { TOKEN_KEY } from "./Client_Utils/Fetch_Service";

const Navbar = () => {
  const [loggedIn, setloggedIn] = useState<boolean>(false);
  const nav = useNavigate();
  const loc = useLocation();

  const PublicPages = [`/`, `/donate`, `/newauthor`];

  useEffect(() => {
    //this will fire every time the user navigates to a new path, checking if they have a valid token
    // console.log(`You are on ${loc.pathname}`);

    if (!PublicPages.includes(loc.pathname)) {
      Fetcher.GET("/auth/checkToken")
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
            <button className="btn btn-primary mx-1">New Blog</button>
          </Link>
          <Link to="/blogs">
            <button className="btn btn-primary mx-1">Blogs</button>
          </Link>
          <Link to="/users">
            <button className="btn btn-primary mx-1">Authors</button>
          </Link>
          <Link to="/donate">
            <button className="btn btn-primary mx-1">Donate</button>
          </Link>
          <Link to="/">
            <button
              onClick={() => {
                const secretTrackz2 = new Audio(`https://github.com/emoran0403/Assets/blob/main/okbye.mp3?raw=true`);
                secretTrackz2.play();
                setloggedIn(false);
                localStorage.removeItem(TOKEN_KEY); // clear any data (our token) in local storage
                nav("/");
              }}
              className="btn btn-primary mx-1"
            >
              Logout
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
