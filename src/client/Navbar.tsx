import { Button } from "@mui/material";
import * as React from "react";
import * as Types from "../types";

const Navbar = (props: Types.NavbarProps) => {
  return (
    <>
      <div className="mb-4">
        <Button variant="contained" onClick={() => props.navToNewBlog()} className="btn btn-primary mx-1">
          New Blog
        </Button>

        <Button variant="contained" onClick={() => props.navToBlogs()} className="btn btn-primary mx-1">
          Blogs
        </Button>

        <Button variant="contained" onClick={() => props.navToAuthors()} className="btn btn-primary mx-1">
          Authors
        </Button>

        <Button variant="contained" onClick={() => props.navToDonate()} className="btn btn-primary mx-1">
          Donate
        </Button>

        <Button variant="contained" onClick={() => props.handleLoggingOut()} className="btn btn-primary mx-1">
          Logout
        </Button>
      </div>
    </>
  );
};

export default Navbar;
