import { Button } from "@mui/material";
import * as React from "react";
import * as Types from "../../types";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Blogs = (props: Types.BlogsProps) => {
  const [blogsArray, setBlogsArray] = useState<Types.Blog[]>([]);

  const nav = useNavigate();

  const getSingleBlog = (blogid: number) => {
    console.log(blogid);
    fetch(`/api/blogs/${blogid}`) // GET from "/api/blogs"
      .then((res) => {
        // then with that response
        res.json().then((data) => {
          // parse as JSON data, then with that data
          if (res.ok) {
            // if there was an OK response
            setBlogsArray(data); // set the data to state
          } else {
            // if there was not an OK response
            throw new Error(data.message); // throw a new error
          }
        });
      })
      .catch((error) => console.log(error));
    nav(`/blogs/${blogid}`);
  };

  const getAllBlogs = () => {
    fetch("/api/blogs") // GET from "/api/blogs"
      .then((res) => {
        // then with that response
        res.json().then((data) => {
          // parse as JSON data, then with that data
          if (res.ok) {
            // if there was an OK response
            setBlogsArray(data); // set the data to state
          } else {
            // if there was not an OK response
            throw new Error(data.message); // throw a new error
          }
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  //! get the username from token to check for Ervin
  return (
    <>
      {props.username === "Ervin Howell" && (
        <div className="d-flex flex-wrap justify-content-around">
          {blogsArray.map((blog) => (
            // @ts-ignore
            <marquee key={`blog-${blog.blogid}`} className="card col-md-2">
              <div className="card-body">
                <h5 className="card-title">{blog.title.toLocaleUpperCase()}</h5>
                <h6 className="card-subtitle">Writen by: {blog.authorname}</h6>

                <hr></hr>

                {blog.content.length < 50 && <div className="card-text">{blog.content}</div>}
                {blog.content.length > 50 && <div className="card-text">{blog.content.slice(0, 50)}...</div>}

                <hr></hr>

                <span className="badge rounded-pill bg-secondary text-dark">{blog.tagname}</span>

                <hr></hr>

                <Button variant="contained" className="btn btn-warning btn-sm" onClick={() => getSingleBlog(Number(blog.blogid))}>
                  View this Blog
                </Button>
              </div>
              {/*// @ts-ignore */}
            </marquee>
          ))}
        </div>
      )}
      {props.username !== "Ervin Howell" && (
        <div className="d-flex flex-wrap justify-content-around">
          {blogsArray.map((blog) => (
            <div key={`blog-${blog.blogid}`} className="card col-md-2">
              <div className="card-body">
                <h5 className="card-title">{blog.title.toLocaleUpperCase()}</h5>
                <h6 className="card-subtitle">Writen by: {blog.authorname}</h6>

                <hr></hr>

                {blog.content.length < 50 && <div className="card-text">{blog.content}</div>}
                {blog.content.length > 50 && <div className="card-text">{blog.content.slice(0, 50)}...</div>}

                <hr></hr>

                <span className="badge rounded-pill bg-secondary text-dark">{blog.tagname}</span>

                <hr></hr>

                <Button variant="contained" className="btn btn-warning btn-sm" onClick={() => getSingleBlog(Number(blog.blogid))}>
                  View this Blog
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Blogs;
