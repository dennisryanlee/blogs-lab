import * as React from "react";
import * as Types from "../../types";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Fetcher from "../Client_Utils/Fetch_Service";
import decodeMyToken from "../Client_Utils/TokenDecode";

const BlogDetails = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isAuthor, setIsAuthor] = useState<boolean>(false);

  const { id } = useParams(); // we just need the id from the useParams object, so we destructure it

  const nav = useNavigate();
  const loc = useLocation();

  const BLOG = loc.state as Types.Blog;
  const authorid = decodeMyToken().userid;

  const updateBlog = () => {
    Fetcher.PUT(`/api/blogs/${id}`, { title, content })
      .then(() => {
        // console.log(`Update Blog Successful!`);
        nav("/blogs"); // nav to blogs view if no errors
      })
      .catch((error) => {
        console.log(`Update Blog Error...\n`);
        console.error(error);
      });
  };

  const deleteBlog = () => {
    Fetcher.DELETE(`/api/blogs/${id}`)
      .then(() => {
        // console.log(`Delete Blog Successful!`);
        nav("/blogs"); // nav to blogs view if no errors
      })
      .catch((error) => {
        console.log(`Delete Blog Error...\n`);
        console.error(error);
      });
  };

  const doneEditing = () => {
    setIsEditing(false);
    setTitle("");
    setContent("");
  };

  const showWhenEditing = () => {
    return (
      <>
        <input
          value={title.toLocaleUpperCase()}
          onChange={(e) => setTitle(e.target.value)}
          className="card-title form-control"
        />

        <hr></hr>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="card-text form-control"
        ></textarea>

        <hr></hr>
        <button
          color="success"
          className="btn my-2 ms-2 col-md-2 btn-success"
          type="button"
          onClick={() => {
            updateBlog();
            doneEditing();
          }}
        >
          Submit
        </button>
        <button
          color="info"
          className="btn my-2 ms-2 col-md-2 btn-warning"
          type="button"
          onClick={() => {
            doneEditing();
          }}
        >
          Cancel
        </button>
      </>
    );
  };

  const showWhenNotEditing = () => {
    return (
      <>
        <h5 className="card-title">{BLOG.title.toLocaleUpperCase()}</h5>
        <h6 className="card-subtitle">Writen by: {BLOG.authorname}</h6>

        <hr></hr>

        <div className="card-text">{BLOG.content}</div>

        <hr></hr>
        <span className="badge rounded-pill bg-secondary text-dark">{BLOG.tagname}</span>

        <hr></hr>

        {isAuthor && (
          <>
            {/* // Only Authors may edit */}
            <button
              className="btn my-2 ms-2 col-md-2 btn-info"
              type="button"
              onClick={() => {
                setIsEditing(true);
                setTitle(BLOG.title);
                setContent(BLOG.content);
              }}
            >
              Edit
            </button>
            <button
              className="btn my-2 ms-2 col-md-2 btn-danger"
              type="button"
              onClick={() => {
                deleteBlog();
              }}
            >
              Delete
            </button>
          </>
        )}
      </>
    );
  };

  useEffect(() => {
    if (authorid === Number(BLOG.authorid)) {
      // if userid from the token matches the id from the selected author, set isAuthor to true
      // even if a malicious user changes their token, it will be an invalid token
      // edit route is protected, so their request to edit will not go through
      setIsAuthor(true);
    }
    // console.log(`BLOG is next`);
    // console.log(BLOG);
  }, []);

  return (
    <>
      <div className="d-flex flex-wrap justify-content-around">
        <div className="card col-md-6 mx-2">
          <div className="card-body">
            {!isEditing && showWhenNotEditing()}
            {isEditing && showWhenEditing()}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
