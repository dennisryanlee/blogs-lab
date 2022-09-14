import * as React from "react";
import * as Types from "../../types";
import { useNavigate } from "react-router-dom";

interface blogcardcompprops {
  blog: Types.Blog;
}

export const BlogCardComponent = ({ blog }: blogcardcompprops) => {
  const nav = useNavigate();
  return (
    <div className="card-body">
      <h5 className="card-title">{blog.title.toLocaleUpperCase()}</h5>
      <h6 className="card-subtitle">Writen by: {blog.authorname}</h6>

      <hr></hr>

      {blog.content.length < 50 && <div className="card-text">{blog.content}</div>}
      {blog.content.length > 50 && <div className="card-text">{blog.content.slice(0, 50)}...</div>}

      <hr></hr>

      <span className="badge rounded-pill bg-secondary text-dark">{blog.tagname}</span>

      <hr></hr>

      <button className="btn btn-warning btn-sm" onClick={() => nav(`/blogs/${blog.blogid}`, { state: { ...blog } })}>
        View this Blog
      </button>
    </div>
  );
};
