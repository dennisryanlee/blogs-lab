import { Button } from "@mui/material";
import * as React from "react";
import * as Types from "../../types";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Fetcher from "../Client_Utils/Fetch_Service";
import decodeMyToken from "../Client_Utils/TokenDecode";

const Blogs = () => {
  const [blogsArray, setBlogsArray] = useState<Types.Blog[]>([]);

  const nav = useNavigate();

  const decodedToken = decodeMyToken();
  decodedToken.username;

  const getAllBlogs = () => {
    Fetcher.GET("/api/blogs")
      .then((data) => {
        setBlogsArray(data); // set the data to state if no errors
      })
      .catch((error) => {
        console.log(`Get All Blogs Error...\n`);
        console.error(error);
      });
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

                <Button
                  variant="contained"
                  className="btn btn-warning btn-sm"
                  onClick={() => nav(`/blogs/${blog.blogid}`, { state: { ...blog } })}
                >
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

                <Button
                  variant="contained"
                  className="btn btn-warning btn-sm"
                  onClick={() => nav(`/blogs/${blog.blogid}`, { state: { ...blog } })}
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

  return (
    <>
      {decodedToken.username === "Ervin Howell" && ErvinIsUser()}
      {decodedToken.username !== "Ervin Howell" && ErvinIsNotUser()}
    </>
  );
};

export default Blogs;
