import * as React from "react";
import { Button } from "@mui/material";
import * as Types from "../../types";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const AuthorDetails = () => {
  const [authorbio, setAuthorBio] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  //! how to set isEditing back to false when user leaves this page?
  const { id } = useParams(); // we just need the id from the useParams object, so we destructure it

  const nav = useNavigate();
  const loc = useLocation();

  const AUTHOR = loc.state as Types.Author;

  const chefskiss = () => {
    const secretTrackz3 = new Audio(`../wow.mp3`);
    secretTrackz3.play();
  };

  const updateAuthor = () => {
    fetch(`/api/authors/${id}`, {
      // use the route:  /api/authors/ ...
      method: "PUT", // ...send a PUT request...
      headers: {
        // ...specifying the type of content...
        "content-type": "application/json",
      },
      body: JSON.stringify({ authorbio }), // ...and deliver the content}
    })
      .then((res) => {
        // then with that response
        res.json().then((data) => {
          // parse the response, then with the response
          if (res.ok) {
            // if it was a good response
            nav("/users"); // nav to authors view
          } else {
            // if it was a bad response
            throw new Error(data.message);
          }
        });
      })
      .catch((error) => {
        console.log(`Update Author Error...\n`);
        console.error(error);
      });
  };

  return (
    <>
      <div className="d-flex flex-wrap justify-content-around">
        <div className="card col-md-6">
          <div className="card-body">
            {/* Show this when Not Editing ************************************************/}
            {!isEditing && (
              <>
                <h5 className="card-title">{AUTHOR.authorname.toLocaleUpperCase()}</h5>
                <h6 className="card-subtitle">Contact this author at {AUTHOR.email}</h6>

                <hr></hr>

                <div className="card-text">{AUTHOR.authorbio}</div>

                <hr></hr>
              </>
            )}

            {/* Show this when Not Editing ************************************************/}
            {!isEditing && (
              <Button
                variant="contained"
                color="warning"
                className="btn my-2 ms-2 col-md-2"
                type="button"
                onClick={() => {
                  // I only want the Bio editable - removing old editable stuff may've led to layout shift
                  setAuthorBio(AUTHOR.authorbio);
                  setIsEditing(true);
                }}
              >
                Edit
              </Button>
            )}

            {/* Show this when Not Editing ************************************************/}
            {!isEditing && (
              <Button
                variant="contained"
                color="primary"
                className="btn my-2 ms-2 col-md-2"
                type="button"
                onClick={() => {
                  nav("/contact", { state: { ...AUTHOR } });
                }}
              >
                Email
              </Button>
            )}

            {/* Show this when Editing ************************************************/}
            {isEditing && (
              <>
                {/* I only want Bio Editable */}
                {/* <input value={authorname} onChange={(e) => handleSetAuthorName(e)} className="card-title form-control" />
                <input value={props.email} onChange={(e) => props.handleEmailChange(e)} className="card-title form-control" /> */}

                <hr></hr>

                <textarea value={authorbio} onChange={(e) => setAuthorBio(e.target.value)} className="card-text form-control"></textarea>

                <hr></hr>
              </>
            )}

            {/* Show this when Editing ************************************************/}
            {isEditing && (
              <Button
                variant="contained"
                color="success"
                className="btn my-2 ms-2 col-md-2"
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  chefskiss();
                  updateAuthor();
                }}
              >
                Submit
              </Button>
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

export default AuthorDetails;
