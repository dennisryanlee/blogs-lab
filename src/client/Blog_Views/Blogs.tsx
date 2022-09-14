import * as React from "react";
import * as Types from "../../types";
import { useState, useEffect } from "react";
import Fetcher from "../Client_Utils/Fetch_Service";
import decodeMyToken from "../Client_Utils/TokenDecode";
import { BlogCardComponent } from "./BlogCardComponent";

const Blogs = () => {
  const [blogsArray, setBlogsArray] = useState<Types.Blog[]>([]);

  const decodedToken = decodeMyToken();

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

  return (
    <div className="d-flex flex-wrap justify-content-around">
      {blogsArray.map((blog) => (
        <div key={`blog-${blog.blogid}`} className="card col-md-2">
          {decodedToken.username === "Ervin Howell" ? ( // @ts-ignore
            <marquee>
              <BlogCardComponent blog={blog}></BlogCardComponent>
              {/*// @ts-ignore */}
            </marquee>
          ) : (
            <BlogCardComponent blog={blog}></BlogCardComponent>
          )}
        </div>
      ))}
    </div>
  );
};

export default Blogs;
