import * as React from "react";
import { Button } from "@mui/material";
import * as Types from "../../types";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Fetcher, { TOKEN_KEY } from "../Client_Utils/Fetcher";

const AuthorDetails = () => {
  const [authorbio, setAuthorBio] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { id } = useParams(); // we just need the id from the useParams object, so we destructure it

  const nav = useNavigate();
  const loc = useLocation();

  const AUTHOR = loc.state as Types.Author; // grab the author from state passed from loc

  const chefskiss = () => {
    const secretTrackz3 = new Audio(`../wow.mp3`);
    secretTrackz3.play();
  };

  const updateAuthor = () => {
    Fetcher.PUT(`/api/authors/${id}`, { authorbio })
      .then(() => nav("/users")) // navigate to authors view if no errors
      .catch((error) => {
        console.log(`Update Author Error...\n`);
        console.error(error);
      });
  };

  const showWhenEditing = () => {
    <>
      <hr></hr>

      <textarea value={authorbio} onChange={(e) => setAuthorBio(e.target.value)} className="card-text form-control"></textarea>

      <hr></hr>

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
    </>;
  };

  const showWhenNotEditing = () => {
    return (
      <>
        <h5 className="card-title">{AUTHOR.authorname.toLocaleUpperCase()}</h5>
        <h6 className="card-subtitle">Contact this author at {AUTHOR.email}</h6>

        <hr></hr>

        <div className="card-text">{AUTHOR.authorbio}</div>

        <hr></hr>
        {true && (
          <>
            <Button
              variant="contained"
              color="warning"
              className="btn my-2 ms-2 col-md-2"
              type="button"
              onClick={() => {
                // I only want the Bio editable, and when it is the actual author
                setAuthorBio(AUTHOR.authorbio);
                setIsEditing(true);
              }}
            >
              Edit
            </Button>

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
          </>
        )}
      </>
    );
  };

  useEffect(() => {
    setAuthorBio(AUTHOR.authorbio);
  }, []);

  return (
    <>
      <div className="d-flex flex-wrap justify-content-around">
        <div className="card col-md-6">
          <div className="card-body">
            {!isEditing && showWhenNotEditing()}
            {isEditing && showWhenEditing()}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthorDetails;
