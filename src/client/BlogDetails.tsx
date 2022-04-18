import * as React from "react";
import { Button } from "@mui/material";
import * as Types from "../types";
import { useParams } from "react-router-dom";

const BlogDetails = (props: Types.BlogDetailsProps) => {
  const { id } = useParams(); // we just need the id from the useParams object, so we can destructure it

  return (
    <>
      <div className="d-flex flex-wrap justify-content-around">
        {props.blogsArray.map((blog) => (
          <div key={`blog-${blog.id}`} className="card col-md-2">
            <div className="card-body">
              <h5 className="card-title">{blog.title.toLocaleUpperCase()}</h5>
              <h6 className="card-subtitle">Writen by: {blog.authorname}</h6>

              <hr></hr>

              <div className="card-text">{blog.content}</div>

              <hr></hr>

              <Button variant="contained" className="btn btn-warning my-2 ms-2 col-md-6" type="button">
                Edit Blog
              </Button>
              <Button variant="contained" className="btn btn-danger my-2 ms-2 col-md-6" type="button">
                Delete Blog
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BlogDetails;
