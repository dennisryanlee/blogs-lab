import * as React from "react";
import * as Types from "../../types";

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Authors = () => {
  const [authorsArray, setAuthorsArray] = useState<Types.Author[]>([]);

  const nav = useNavigate();

  const getAllAuthors = () => {
    fetch("/api/users") // GET from "/api/users"
      .then((res) => {
        // then with that response
        res.json().then((data) => {
          // parse as JSON data, then with that data
          if (res.ok) {
            // if there was an OK response
            setAuthorsArray(data); // set the data to state
          } else {
            // if there was not an OK response
            throw new Error(data.message); // throw a new error
          }
        });
      })
      .catch((error) => {
        console.log(`Get All Authors Error...\n`);
        console.error(error);
      });
  };

  const getSingleAuthor = (author: Types.Author) => {
    fetch(`/api/authors/${author.id}`) // GET from "/api/authors"
      .then((res) => {
        // then with that response
        res.json().then((data) => {
          // parse as JSON data, then with that data
          if (res.ok) {
            // if there was an OK response
            setAuthorsArray(data); // set the data to state
          } else {
            // if there was not an OK response
            throw new Error(data.message); // throw a new error
          }
        });
      })
      .catch((error) => {
        console.log(`Get Single Author Error...\n`);
        console.error(error);
      });
    nav(`/authors/${author.id}`, { state: { author: { ...author } } });
  };

  useEffect(() => {
    getAllAuthors();
  }, []);

  return (
    <>
      <div className="d-flex flex-wrap justify-content-around">
        {authorsArray.map((author) => (
          <div key={`author-${author.id}`} className="card col-md-2">
            <div className="card-body">
              <h5 className="card-title">{author.authorname.toLocaleUpperCase()}</h5>

              <hr></hr>

              {author.authorbio?.length < 50 && <div className="card-text">{author.authorbio}</div>}
              {author.authorbio?.length > 50 && <div className="card-text">{author.authorbio.slice(0, 50)}...</div>}

              <hr></hr>

              <Button variant="contained" className="btn btn-warning btn-sm" onClick={() => getSingleAuthor(author)}>
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
