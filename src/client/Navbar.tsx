import * as React from "react";
import { Link } from "react-router-dom";
import * as Types from "../types";

const Navbar = (props: Types.LoginPageProps) => {
  return (
    <>
      <div>
        <Link to={`/blogs`} className="btn btn-primary">
          Blogs
        </Link>
        <Link to={`/authors`} className="btn btn-primary">
          Authors
        </Link>
        <Link onClick={(e) => props.handleLoggingOut(e)} to={`/`} className="btn btn-primary">
          Logout
        </Link>
      </div>
    </>
  );
};

export default Navbar;

{
  /* <Link className="btn btn-warning btn-sm" to={`/chirps`}>
  Manage Chirp
</Link>; */
}
