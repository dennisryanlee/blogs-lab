import { Button } from "@mui/material";
import * as React from "react";
import * as Types from "../types";
import { useNavigate } from "react-router-dom";

const Blogs = (props: Types.BlogsProps) => {
  const nav = useNavigate();

  return (
    <>
      <div className="d-flex flex-wrap justify-content-around">
        {props.blogsArray.map((blog) => (
          <div key={`blog-${blog.id}`} className="card col-md-2">
            <div className="card-body">
              <h5 className="card-title">{blog.title.toLocaleUpperCase()}</h5>
              <h6 className="card-subtitle">Writen by: {blog.authorname}</h6>

              <hr></hr>

              {blog.content.length < 50 && <div className="card-text">{blog.content}</div>}
              {blog.content.length > 50 && <div className="card-text">{blog.content.slice(0, 50)}...</div>}

              <hr></hr>

              <Button
                variant="contained"
                className="btn btn-warning btn-sm"
                onClick={() => {
                  fetch(`/api/blogs/${blog.id}`) // GET from "/api/blogs"
                    .then((res) => {
                      // then with that response
                      res.json().then((data) => {
                        // parse as JSON data, then with that data
                        if (res.ok) {
                          // if there was an OK response
                          props.setBlogsArray(data); // set the data to state
                        } else {
                          // if there was not an OK response
                          throw new Error(data.message); // throw a new error
                        }
                      });
                    })
                    .catch((error) => console.log(error));
                  nav(`/blogs/${blog.id}`);
                }}
              >
                View this Blog
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Blogs;
