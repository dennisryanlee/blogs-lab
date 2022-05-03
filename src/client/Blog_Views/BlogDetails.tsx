import * as React from "react";
import { Button } from "@mui/material";
import * as Types from "../../types";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const BlogDetails = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  //! how to set isEditing back to false when user leaves this page?
  const { id } = useParams(); // we just need the id from the useParams object, so we destructure it

  const nav = useNavigate();
  const loc = useLocation();

  const BLOG = loc.state as Types.Blog;

  const updateBlog = () => {
    fetch(`/api/blogs/${id}`, {
      // use the route:  /api/chirps/ ...
      method: "PUT", // ...send a PUT request...
      headers: {
        // ...specifying the type of content...
        "content-type": "application/json",
      },
      //! grab the author id from jwt once i know how
      body: JSON.stringify({ title, content, authorid: 25 }), // ...and deliver the content}
    })
      .then((res) => {
        // then with that response
        res.json().then((data) => {
          // parse the response, then with the response
          if (res.ok) {
            // if it was a good response
            console.log(`Update Blog Successful!`);
            nav("/blogs"); // nav to blogs view
          } else {
            // if it was a bad response
            throw new Error(data.message);
          }
        });
      })
      .catch((error) => {
        console.log(`Update Blog Error...\n`);
        console.error(error);
      });
  };

  const deleteBlog = () => {
    // contact /api/blogs/:id with a DELETE request to delete the specified blog
    fetch(`/api/blogs/${id}`, { method: "DELETE" })
      .then((res) => {
        res.json().then((data) => {
          if (res.ok) {
            console.log(`Delete Blog Successful!`);
            nav("/blogs"); // nav to blogs view
          } else {
            throw new Error(data.message);
          }
        });
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

  return (
    <>
      <div className="d-flex flex-wrap justify-content-around">
        <div className="card col-md-6 mx-2">
          <div className="card-body">
            {/* Show this when Not Editing ************************************************/}
            {!isEditing && (
              <>
                <h5 className="card-title">{BLOG.title.toLocaleUpperCase()}</h5>
                <h6 className="card-subtitle">Writen by: {BLOG.authorname}</h6>

                <hr></hr>

                <div className="card-text">{BLOG.content}</div>

                <hr></hr>
                <span className="badge rounded-pill bg-secondary text-dark">{BLOG.tagname}</span>

                <hr></hr>
              </>
            )}

            {/* Show this when Not Editing ************************************************/}
            {!isEditing && (
              <>
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
              </>
            )}

            {/* Show this when Not Editing ************************************************/}
            {!isEditing && (
              <>
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
            )}

            {/* Show this when Editing ************************************************/}
            {isEditing && (
              <>
                <input value={title.toLocaleUpperCase()} onChange={(e) => setTitle(e.target.value)} className="card-title form-control" />

                <hr></hr>

                <textarea value={content} onChange={(e) => setContent(e.target.value)} className="card-text form-control"></textarea>

                <hr></hr>
              </>
            )}

            {/* Show this when Editing ************************************************/}
            {isEditing && (
              <>
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
              </>
            )}
            {/* Show this when Editing ************************************************/}
            {isEditing && (
              <Button
                variant="contained"
                color="info"
                className="btn my-2 ms-2 col-md-2"
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  handleClearTitleAndContent();
                  //not sure if i need set title or set content here
                  setTitle(BLOG.title);
                  setContent(BLOG.content);
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
