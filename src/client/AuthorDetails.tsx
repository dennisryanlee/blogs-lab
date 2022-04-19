import * as React from "react";
import { Button } from "@mui/material";
import * as Types from "../types";
import { useParams } from "react-router-dom";

const AuthorDetails = (props: Types.AuthorDetailsProps) => {
  const { id } = useParams(); // we just need the id from the useParams object, so we destructure it

  const updateAuthor = () => {
    fetch(`/api/authors/${id}`, {
      // use the route:  /api/authors/ ...
      method: "PUT", // ...send a PUT request...
      headers: {
        // ...specifying the type of content...
        "content-type": "application/json",
      },
      body: JSON.stringify({ authorname: "something", authorbio: "changeme", email: "changemetoo" }), // ...and deliver the content}
    })
      .then((res) => {
        // then with that response
        res.json().then((data) => {
          // parse the response, then with the response
          if (res.ok) {
            // if it was a good response
            props.navToAuthors();
          } else {
            // if it was a bad response
            throw new Error(data.message);
          }
        });
      })
      .catch((error) => console.log(error));
  };

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
