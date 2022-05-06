import { Button } from "@mui/material";
import * as React from "react";
import * as Types from "../../types";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Fetcher from "../Client_Utils/Fetcher";

//@ts-ignore
const Blogs = (props: Types.BlogsProps) => {
  const [blogsArray, setBlogsArray] = useState<Types.Blog[]>([]);

  const nav = useNavigate();

  const getSingleBlog = (blog: Types.Blog) => {
    console.log(`Fetching blog: ${blog.blogid}`);

    Fetcher.GET(`/api/blogs/${blog.blogid}`)
      .then((data) => {
        setBlogsArray(data); // set the data to state if no errors
      })
      .catch((error) => {
        console.log(`Get Single Blog Error.  Blog ID: ${blog.blogid}...\n`);
        console.error(error);
      });
    nav(`/blogs/${blog.blogid}`, { state: { ...blog } });
  };

  const getAllBlogs = () => {
    Fetcher.GET("/api/blogs")
      .then((data) => {
        setBlogsArray(data); // set the data to state if no errors
      })
      .catch((error) => {
        console.log(`Get All Blogs Error...\n`);
        console.error(error);
      });

    // fetch("/api/blogs") // GET from "/api/blogs"
    //   .then((res) => {
    //     // then with that response
    //     res.json().then((data) => {
    //       // parse as JSON data, then with that data
    //       if (res.ok) {
    //         // if there was an OK response
    //         setBlogsArray(data); // set the data to state
    //       } else {
    //         // if there was not an OK response
    //         throw new Error(data.message); // throw a new error
    //       }
    //     });
    //   })
    //   .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  const ErvinIsUser = () => {
    return (
      <>
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

                <Button variant="contained" className="btn btn-warning btn-sm" onClick={() => getSingleBlog(blog)}>
                  View this Blog
                </Button>
              </div>
              {/*// @ts-ignore */}
            </marquee>
          ))}
        </div>
      </>
    );
  };

  const ErvinIsNotUser = () => {
    return (
      <>
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

                <Button variant="contained" className="btn btn-warning btn-sm" onClick={() => getSingleBlog(blog)}>
                  View this Blog
                </Button>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  //! get the username from token to check for Ervin
  return (
    <>
      {props.username === "Ervin Howell" && ErvinIsUser()}
      {props.username !== "Ervin Howell" && ErvinIsNotUser()}
    </>
  );
};

export default Blogs;
