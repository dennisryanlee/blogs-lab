import * as React from "react";
import { Button } from "@mui/material";
import * as Types from "../types";
import { useParams } from "react-router-dom";

const BlogDetails = (props: Types.BlogDetailsProps) => {
  const { id } = useParams(); // we just need the id from the useParams object, so we destructure it

  const updateBlog = () => {
    fetch(`/api/blogs/${id}`, {
      // use the route:  /api/chirps/ ...
      method: "PUT", // ...send a PUT request...
      headers: {
        // ...specifying the type of content...
        "content-type": "application/json",
      },
      body: JSON.stringify({ title: props.title, content: props.content, authorid: 25 }), // ...and deliver the content}
    })
      .then((res) => {
        // then with that response
        res.json().then((data) => {
          // parse the response, then with the response
          if (res.ok) {
            // if it was a good response
            props.navToBlogs();
          } else {
            // if it was a bad response
            throw new Error(data.message);
          }
        });
      })
      .catch((error) => console.log(error));
  };

  const deleteBlog = () => {
    // contact /api/blogs/:id with a DELETE request to delete the specified blog
    fetch(`/api/blogs/${id}`, { method: "DELETE" })
      .then((res) => {
        res.json().then((data) => {
          if (res.ok) {
            props.navToBlogs();
          } else {
            throw new Error(data.message);
          }
        });
      })
      .catch((error) => console.log(error));
  };

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
                  <span className="badge rounded-pill bg-secondary text-dark">{blog.tagname}</span>

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
                <Button variant="contained" color="error" className="btn my-2 ms-2 col-md-2" type="button" onClick={() => deleteBlog()}>
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
                    updateBlog();
                    props.setIsEditing(false);
                    props.handleClearTitleAndContent();
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
