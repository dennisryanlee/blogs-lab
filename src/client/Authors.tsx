import * as React from "react";
import * as Types from "../types";
import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

const Authors = (props: Types.AuthorsProps) => {
  const nav = useNavigate();
  return (
    <>
      <div className="d-flex flex-wrap justify-content-around">
        {props.authorsArray.map((author) => (
          <div key={`author-${author.id}`} className="card col-md-2">
            <div className="card-body">
              <h5 className="card-title">{author.authorname.toLocaleUpperCase()}</h5>
              <h6 className="card-subtitle">Contact the author at {author.email}</h6>

              <hr></hr>

              {author.authorbio?.length < 50 && <div className="card-text">{author.authorbio}</div>}
              {author.authorbio?.length > 50 && <div className="card-text">{author.authorbio.slice(0, 50)}...</div>}

              <hr></hr>

              <Button variant="contained" className="btn btn-warning btn-sm" onClick={() => nav(`/authors/${author.id}`)}>
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
