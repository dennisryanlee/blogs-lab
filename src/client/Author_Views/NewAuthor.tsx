import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Validation from "../Client_Utils/DataValidation";
import Fetcher, { TOKEN_KEY } from "../Client_Utils/Fetch_Service";

const NewAuthor = () => {
  const [authorname, setAuthorname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [authorbio, setAuthorBio] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const nav = useNavigate();

  const handleNewAuthorLogin = () => {
    Validation.isValidString([authorname, email, authorbio])
      .then(() =>
        Validation.isValidStringLength([
          [authorname, 45],
          [email, 45],
          [authorbio, 500],
        ])
      )
      .then(() => Validation.isValidEmail(email))
      .then(() => console.log(`Validation complete.`))
      .catch((error) => {
        console.log(`New Author Input Validation Error...\n`);
        console.error(error);
        alert("Please check your data");
        return;
      });

    Fetcher.POST("/auth/register/", { authorname, authorbio, email, password })
      .then((data) => {
        localStorage.setItem(TOKEN_KEY, data.token);
        // console.log(`New Author Added!`);
        nav(`/blogs`); // navigate user to blogs if no error
      })
      .catch((error) => {
        console.log(`New Author Error...\n`);
        console.error(error);
      });
  };

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div className="card bg-light shadow col-md-4">
          <div className="card-body d-flex flex-wrap justify-content-center">
            <h5 className="card-title text-center col-md-7">Please enter your information below</h5>

            <input
              placeholder="Author Name (username)"
              type="text"
              value={authorname}
              className="form-control col-md-7 mb-1"
              onChange={(e) => setAuthorname(e.target.value)}
            />

            <input placeholder="Email" type="email" value={email} className="form-control col-md-7 my-1" onChange={(e) => setEmail(e.target.value)} />

            <input
              placeholder="Password"
              type="password"
              value={password}
              className="form-control col-md-7 my-1"
              onChange={(e) => setPassword(e.target.value)}
            />

            <textarea
              placeholder="Tell us about yourself."
              value={authorbio}
              className="form-control col-md-7 mt-1"
              onChange={(e) => setAuthorBio(e.target.value)}
            ></textarea>

            <button className="btn btn-primary my-2 ms-2 col-md-6" type="button" onClick={() => handleNewAuthorLogin()}>
              Register!
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewAuthor;
