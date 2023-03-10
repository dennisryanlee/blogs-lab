import * as React from "react";
import * as Types from "../../types";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Fetcher from "../Client_Utils/Fetch_Service";
import decodeMyToken from "../Client_Utils/TokenDecode";

const AuthorDetails = () => {
  const [authorbio, setAuthorBio] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isAuthor, setIsAuthor] = useState<boolean>(false);

  const { id } = useParams(); // we just need the id from the useParams object, so we destructure it

  const nav = useNavigate();
  const loc = useLocation();

  const AUTHOR = loc.state as Types.Author; // grab the author from state passed from loc

  const chefskiss = () => {
    const secretTrackz3 = new Audio(`https://github.com/emoran0403/Assets/blob/main/wow.mp3?raw=true`);
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
    return (
      <>
        <hr></hr>

        <textarea
          value={authorbio}
          onChange={(e) => setAuthorBio(e.target.value)}
          className="card-text form-control"
        ></textarea>

        <hr></hr>

        <button
          className="btn btn-success my-2 ms-2 col-md-2"
          type="button"
          onClick={() => {
            setIsEditing(false);
            chefskiss();
            updateAuthor();
          }}
        >
          Submit
        </button>
        <button
          className="btn btn-warning my-2 ms-2 col-md-2"
          type="button"
          onClick={() => {
            setIsEditing(false);
          }}
        >
          Cancel
        </button>
      </>
    );
  };

  const showWhenNotEditing = () => {
    return (
      <>
        <h5 className="card-title">{AUTHOR.authorname!.toLocaleUpperCase()}</h5>
        <h6 className="card-subtitle">Contact this author at {AUTHOR.email}</h6>

        <hr></hr>

        <div className="card-text">{AUTHOR.authorbio}</div>

        <hr></hr>
        {isAuthor && (
          // Only Authors may edit
          <button
            color="warning"
            className="btn btn-info my-2 ms-2 col-md-2"
            type="button"
            onClick={() => {
              setAuthorBio(AUTHOR.authorbio!);
              setIsEditing(true);
            }}
          >
            Edit
          </button>
        )}

        <button
          className="btn btn-primary my-2 ms-2 col-md-2"
          type="button"
          onClick={() => {
            nav("/contact", { state: { ...AUTHOR } });
          }}
        >
          Email
        </button>
      </>
    );
  };

  useEffect(() => {
    setAuthorBio(AUTHOR.authorbio!);
    if (decodeMyToken().userid === Number(AUTHOR.id)) {
      // if userid from the token matches the id from the selected author, set isAuthor to true
      // even if a malicious user changes their token, it will be an invalid token
      // edit route is protected, so their request to edit will not go through
      setIsAuthor(true);
    }
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
