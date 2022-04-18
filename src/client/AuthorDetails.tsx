import * as React from "react";
import { Button } from "@mui/material";
import * as Types from "../types";

const AuthorDetails = (props: Types.AuthorDetailsProps) => {
  return (
    <>
      <div className="d-flex flex-wrap justify-content-around">
        {props.authorsArray.map((author) => (
          <div key={`author-${author.id}`} className="card col-md-2">
            <div className="card-body">
              <h5 className="card-title">{author.authorname.toLocaleUpperCase()}</h5>
              <h6 className="card-subtitle">Contact this author at {author.email}</h6>

              <hr></hr>

              <div className="card-text">{author.authorbio}</div>

              <hr></hr>
              <Button variant="contained" className="btn btn-warning my-2 ms-2 col-md-6" type="button">
                Edit Author
              </Button>
              <Button variant="contained" className="btn btn-danger my-2 ms-2 col-md-6" type="button">
                Delete Author
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AuthorDetails;
