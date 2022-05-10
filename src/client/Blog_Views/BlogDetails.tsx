import * as React from "react";
import { Button } from "@mui/material";
import * as Types from "../../types";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Fetcher from "../Client_Utils/Fetcher";
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
    Fetcher.PUT(`/api/blogs/${id}`, { title, content, authorid })
      .then(() => {
        console.log(`Update Blog Successful!`);
        const secretTrackz3 = new Audio(`../wow.mp3`);
        secretTrackz3.play();
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
        console.log(`Delete Blog Successful!`);
        const secretTrackz4 = new Audio(`../stuckem.mp3`);
        secretTrackz4.play();
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
        <input value={title.toLocaleUpperCase()} onChange={(e) => setTitle(e.target.value)} className="card-title form-control" />

        <hr></hr>

        <textarea value={content} onChange={(e) => setContent(e.target.value)} className="card-text form-control"></textarea>

        <hr></hr>
        <Button
          variant="contained"
          color="success"
          className="btn my-2 ms-2 col-md-2"
          type="button"
          onClick={() => {
            updateBlog();
            doneEditing();
          }}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="info"
          className="btn my-2 ms-2 col-md-2"
          type="button"
          onClick={() => {
            doneEditing();
          }}
        >
          Cancel
        </Button>
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
            <Button
              variant="contained"
              color="warning"
              className="btn my-2 ms-2 col-md-2"
              type="button"
              onClick={() => {
                setIsEditing(true);
                setTitle(BLOG.title);
                setContent(BLOG.content);
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              className="btn my-2 ms-2 col-md-2"
              type="button"
              onClick={() => {
                deleteBlog();
              }}
            >
              Delete
            </Button>
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
    console.log(`BLOG is next`);
    console.log(BLOG);
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
