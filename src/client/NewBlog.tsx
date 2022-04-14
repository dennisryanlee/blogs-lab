import { Button } from "@mui/material";
import * as React from "react";
import * as Types from "../types";

const NewBlog = (props: Types.NewBlogProps) => {
  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div className="card bg-light shadow col-md-4">
          <div className="card-body d-flex flex-wrap justify-content-center">
            <h5 className="card-title text-center col-md-7">Blog Away!</h5>
            <input placeholder="Blog Title" type="text" value={props.title} className="form-control col-md-7 mb-1" onChange={(e) => props.handleTitleChange(e)} />
            <textarea placeholder="Your content here" value={props.content} className="form-control col-md-7 mt-1" onChange={(e) => props.handleContentChange(e)}></textarea>
            <Button variant="contained" className="btn btn-primary my-2 ms-2 col-md-6" type="button" onClick={(e) => props.handleNewBlog(e)}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewBlog;
