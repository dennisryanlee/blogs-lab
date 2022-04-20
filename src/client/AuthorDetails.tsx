import * as React from "react";
import { Button } from "@mui/material";
import * as Types from "../types";
import { useParams } from "react-router-dom";
import { useState, ChangeEvent } from "react";

const AuthorDetails = (props: Types.AuthorDetailsProps) => {
  const { id } = useParams(); // we just need the id from the useParams object, so we destructure it
  const [authorname, setAuthorName] = useState<string>("");

  const handleSetAuthorName = (e: ChangeEvent<HTMLInputElement>) => {
    return setAuthorName(e.target.value);
  };

  const updateAuthor = () => {
    fetch(`/api/authors/${id}`, {
      // use the route:  /api/authors/ ...
      method: "PUT", // ...send a PUT request...
      headers: {
        // ...specifying the type of content...
        "content-type": "application/json",
      },
      body: JSON.stringify({ authorname, authorbio: props.authorbio, email: props.email }), // ...and deliver the content}
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
              {!props.isEditing && (
                <>
                  <h5 className="card-title">{author.authorname.toLocaleUpperCase()}</h5>
                  <h6 className="card-subtitle">Contact this author at {author.email}</h6>

                  <hr></hr>

                  <div className="card-text">{author.authorbio}</div>

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
                    setAuthorName(author.authorname);
                    props.setEmail(author.email);
                    props.setAuthorBio(author.authorbio);
                    props.setIsEditing(true);
                  }}
                >
                  Edit
                </Button>
              )}

              {props.isEditing && (
                <>
                  <input value={authorname} onChange={(e) => handleSetAuthorName(e)} className="card-title form-control" />
                  <input value={props.email} onChange={(e) => props.handleEmailChange(e)} className="card-title form-control" />

                  <hr></hr>

                  <textarea value={props.authorbio} onChange={(e) => props.handleAuthorBioChange(e)} className="card-text form-control"></textarea>

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
                    props.setIsEditing(false);
                    props.chefskiss();
                    updateAuthor();
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

export default AuthorDetails;
