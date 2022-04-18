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
          <div key={`blog-${blog.id}`} className="card col-md-6 mx-2">
            <div className="card-body">
              {!props.isEditing && (
                <>
                  <h5 className="card-title">{blog.title.toLocaleUpperCase()}</h5>
                  <h6 className="card-subtitle">Writen by: {blog.authorname}</h6>

                  <hr></hr>

                  <div className="card-text">{blog.content}</div>

                  <hr></hr>
                </>
              )}

              {!props.isEditing && (
                <Button
                  variant="contained"
                  color="warning"
                  className="btn my-2 ms-2 col-md-2"
                  type="button"
                  onClick={() => {
                    props.setIsEditing(true);
                    props.setTitle(blog.title);
                    props.setContent(blog.content);
                  }}
                >
                  Edit
                </Button>
              )}
              {!props.isEditing && (
                <Button variant="contained" color="error" className="btn my-2 ms-2 col-md-2" type="button">
                  Delete
                </Button>
              )}

              {props.isEditing && (
                <>
                  <input value={props.title.toLocaleUpperCase()} onChange={(e) => props.handleTitleChange(e)} className="card-title form-control" />

                  <hr></hr>

                  <textarea value={props.content} onChange={(e) => props.handleContentChange(e)} className="card-text form-control"></textarea>

                  <hr></hr>
                </>
              )}

              {props.isEditing && (
                <Button
                  variant="contained"
                  color="success"
                  className="btn my-2 ms-2 col-md-2"
                  type="button"
                  onClick={() => {
                    props.setIsEditing(false);
                    props.handleClearTitleAndContent();
                    //! make the fetch here
                  }}
                >
                  Submit
                </Button>
              )}
              {props.isEditing && (
                <Button
                  variant="contained"
                  color="info"
                  className="btn my-2 ms-2 col-md-2"
                  type="button"
                  onClick={() => {
                    props.setIsEditing(false);
                    props.handleClearTitleAndContent();
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BlogDetails;
