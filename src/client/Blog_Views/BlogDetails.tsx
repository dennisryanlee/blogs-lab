import * as React from "react";
import { Button } from "@mui/material";
import * as Types from "../../types";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Fetcher, { TOKEN_KEY } from "../Client_Utils/Fetcher";

const BlogDetails = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { id } = useParams(); // we just need the id from the useParams object, so we destructure it

  const nav = useNavigate();
  const loc = useLocation();

  const BLOG = loc.state as Types.Blog;

  //! this needs to grab the author id from the token
  const updateBlog = () => {
    Fetcher.PUT(`/api/blogs/${id}`, { title, content, authorid: BLOG.authorid })
      .then(() => {
        console.log(`Update Blog Successful!`);
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
        nav("/blogs"); // nav to blogs view if no errors
      })
      .catch((error) => {
        console.log(`Delete Blog Error...\n`);
        console.error(error);
      });
  };

  const stuckem = () => {
    const secretTrackz4 = new Audio(`../stuckem.mp3`);
    secretTrackz4.play();
  };

  const chefskiss = () => {
    const secretTrackz3 = new Audio(`../wow.mp3`);
    secretTrackz3.play();
  };

  const handleClearTitleAndContent = () => {
    setTitle("");
    setContent("");
  };

  const showWhenEditing = () => {
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
          chefskiss();
          setIsEditing(false);
          handleClearTitleAndContent();
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
          setIsEditing(false);
          handleClearTitleAndContent();
        }}
      >
        Cancel
      </Button>
    </>;
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
            stuckem();
            deleteBlog();
          }}
        >
          Delete
        </Button>
      </>
    );
  };

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
