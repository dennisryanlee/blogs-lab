import * as React from "react";
import * as Types from "../../types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Fetcher from "../Client_Utils/Fetch_Service";

const Authors = () => {
  const [authorsArray, setAuthorsArray] = useState<Types.Author[]>([]);

  const nav = useNavigate();

  const getAllAuthors = () => {
    Fetcher.GET("/api/users")
      .then((data) => {
        setAuthorsArray(data); // set the data to state if no errors
      })
      .catch((error) => {
        console.log(`Get All Authors Error...\n`);
        console.error(error);
      });
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

              <button
                className="btn btn-warning btn-sm"
                onClick={() => nav(`/users/${author.id}`, { state: { ...author } })}
              >
                View this Author
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Authors;
