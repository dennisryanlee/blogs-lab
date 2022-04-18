import * as React from "react";
import * as Types from "../types";
import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

const Authors = (props: Types.AuthorsProps) => {
  const nav = useNavigate();

  const getSingleAuthor = (authorid: Number) => {
    fetch(`/api/authors/${authorid}`) // GET from "/api/authors"
      .then((res) => {
        // then with that response
        res.json().then((data) => {
          // parse as JSON data, then with that data
          if (res.ok) {
            // if there was an OK response
            props.setAuthorsArray(data); // set the data to state
          } else {
            // if there was not an OK response
            throw new Error(data.message); // throw a new error
          }
        });
      })
      .catch((error) => console.log(error));
    nav(`/authors/${authorid}`);
  };
  return (
    <>
      <div className="d-flex flex-wrap justify-content-around">
        {props.authorsArray.map((author) => (
          <div key={`author-${author.id}`} className="card col-md-2">
            <div className="card-body">
              <h5 className="card-title">{author.authorname.toLocaleUpperCase()}</h5>

              <hr></hr>

              {author.authorbio?.length < 50 && <div className="card-text">{author.authorbio}</div>}
              {author.authorbio?.length > 50 && <div className="card-text">{author.authorbio.slice(0, 50)}...</div>}

              <hr></hr>

              <Button variant="contained" className="btn btn-warning btn-sm" onClick={() => getSingleAuthor(Number(author.id))}>
                View this Author
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Authors;
