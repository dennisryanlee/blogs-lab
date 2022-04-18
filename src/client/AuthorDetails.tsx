import * as React from "react";
import { Button } from "@mui/material";
import * as Types from "../types";

const AuthorDetails = (props: Types.AuthorDetailsProps) => {
  return (
    <>
      <div className="d-flex flex-wrap justify-content-around">
        {props.authorsArray.map((author) => (
          <div key={`author-${author.id}`} className="card col-md-6">
            <div className="card-body">
              <h5 className="card-title">{author.authorname.toLocaleUpperCase()}</h5>
              <h6 className="card-subtitle">Contact this author at {author.email}</h6>

              <hr></hr>

              <div className="card-text">{author.authorbio}</div>

              <hr></hr>
              {!props.isEditing && (
                <Button variant="contained" color="warning" className="btn my-2 ms-2 col-md-2" type="button" onClick={() => props.setIsEditing(true)}>
                  Edit
                </Button>
              )}
              {!props.isEditing && (
                <Button variant="contained" color="error" className="btn my-2 ms-2 col-md-2" type="button">
                  Delete
                </Button>
              )}
              {props.isEditing && (
                <Button variant="contained" color="success" className="btn my-2 ms-2 col-md-2" type="button">
                  Submit
                </Button>
              )}
              {props.isEditing && (
                <Button variant="contained" color="info" className="btn my-2 ms-2 col-md-2" type="button">
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

export default AuthorDetails;
