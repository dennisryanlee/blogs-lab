import { Button } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import * as Types from "../../types";

const NewAuthor = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [authorbio, setAuthorBio] = useState<string>("");
  const [authorid, setAuthorId] = useState<number>(25);

  const handleNewAuthorLogin = () => {
    //! do new author logic + auth logic here
  };

  // const handleNewAuthorLogin = () => {
  //   // Validation

  //   Validation.isValidString([username, email, authorbio])
  //     .then(() =>
  //       Validation.isValidStringLength([
  //         [username, 45],
  //         [email, 45],
  //         [authorbio, 500],
  //       ])
  //     )
  //     .then(() => Validation.isValidEmail(email))
  //     .then(() => console.log(`Validation complete.`))
  //     .catch((error) => {
  //       console.error(error);
  //       alert("Please check your data");
  //       return;
  //     });

  //   fetch("/api/users/", {
  //     // use the route:  /api/chirps/ ...
  //     method: "POST", // ...send a POST request...
  //     headers: {
  //       // ...specifying the type of content...
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({ username, authorbio, email }), // ...and deliver the content
  //   })
  //     .then((res) => {
  //       // then with that response
  //       res.json().then((data) => {
  //         // parse as JSON data, then with that data
  //         if (res.ok) {
  //           // if there was an OK response
  //           setPassword("New Author Pass"); // set the password
  //           setAuthorId(42); // this should be dynamic, but thatd involve another fetch req and is a feature i can add later
  //           setEmail(""); // clear input fields
  //           setAuthorBio(""); // clear input fields
  //           setloggedIn(!loggedIn); // update state to reflect a logged in status

  //           return navToBlogs(); // navigate user to blogs
  //         } else {
  //           // if there was not an OK response
  //           throw new Error(data.message); // throw a new error
  //         }
  //       });
  //     })
  //     .catch((error) => console.log(error));
  // };

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div className="card bg-light shadow col-md-4">
          <div className="card-body d-flex flex-wrap justify-content-center">
            <h5 className="card-title text-center col-md-7">Please enter your information below</h5>
            <input
              placeholder="Author Name (username)"
              type="text"
              value={username}
              className="form-control col-md-7 mb-1"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder="Email"
              type="email"
              value={email}
              className="form-control col-md-7 my-1"
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              placeholder="Tell us about yourself."
              value={authorbio}
              className="form-control col-md-7 mt-1"
              onChange={(e) => setAuthorBio(e.target.value)}
            ></textarea>
            <Button variant="contained" className="btn btn-primary my-2 ms-2 col-md-6" type="button" onClick={() => handleNewAuthorLogin()}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewAuthor;
