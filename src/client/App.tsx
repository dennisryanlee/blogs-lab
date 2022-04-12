import * as React from "react";
import { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import * as Types from "../types";
import Navbar from "./Navbar";
import Loginpage from "./Login";
import NewAuthor from "./NewAuthor";
import Blogs from "./Blogs";
import Authors from "./Authors";
import AuthorDetails from "./AuthorDetails";
import BlogDetails from "./BlogDetails";

const App = (props: Types.AppProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [authorbio, setAuthorBio] = useState<string>("");
  const [loggedIn, setloggedIn] = useState<boolean>(false);

  const nav = useNavigate(); // lets us navigate the user around

  const handleAuthorBioChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    return setAuthorBio(e.target.value);
  };

  const navToAuthors = () => {
    nav("/authors");
  };

  const navToBlogs = () => {
    nav("/blogs");
  };

  //! work on this to add a new author
  //   const handleNewAuthor = () => {
  //     if (checkLocationBoxContent() && checkTextBoxContent()) {
  //       // if there is a location and content entered...
  //       fetch("/api/chirps/", {
  //         // use the route:  /api/chirps/ ...
  //         method: "POST", // ...send a POST request...
  //         headers: {
  //           // ...specifying the type of content...
  //           "content-type": "application/json",
  //         },
  //         body: JSON.stringify({ userid: 123, content: textBoxContent, location: locationBoxContent }), // ...and deliver the content
  //       })
  //         .then((res) => {
  //           // then with that response
  //           res.json().then((data) => {
  //             // parse as JSON data, then with that data
  //             if (res.ok) {
  //               // if there was an OK response
  //               getAllChirps(); // then get all chirps
  //             } else {
  //               // if there was not an OK response
  //               throw new Error(data.message); // throw a new error
  //             }
  //           });
  //         })
  //         .catch((error) => console.log(error));
  //     }

  //     setPassword("newAuthor");
  //     nav("/blogs");
  //     return setloggedIn(!loggedIn);
  //   };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setPassword(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setEmail(e.target.value);
  };

  const handleLoggingIn = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!username) {
      alert("Please enter your Username");
      return;
    }
    if (!password) {
      alert("Please enter your password");
      return;
    }
    if (password.length <= 8) {
      alert("Enter a stronger password");
      return;
    }
    if (username.includes("Ervin Howell")) {
      const secretTrackz = new Audio(`../secretTrack.mp3`);
      secretTrackz.play();
    }

    nav("/blogs");

    return setloggedIn(!loggedIn);
  };

  const handleLoggingOut = () => {
    setUsername("");
    setPassword("");
    setloggedIn(!loggedIn);
    nav("/");
  };

  useEffect(() => {}, []);

  return (
    <>
      <main className="container my-5">
        <h1 className="text-primary text-center">Blogs, duh.</h1>
      </main>

      <div className="d-flex justify-content-center">
        <Navbar navToAuthors={navToAuthors} navToBlogs={navToBlogs} handleLoggingOut={handleLoggingOut}></Navbar>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <Loginpage
              username={username}
              password={password}
              loggedIn={loggedIn}
              handleUsernameChange={handleUsernameChange}
              handlePasswordChange={handlePasswordChange}
              handleLoggingIn={handleLoggingIn}
            />
          }
        />
        <Route
          path="/newauthor"
          element={
            <NewAuthor
              username={username}
              email={email}
              authorbio={authorbio}
              handleUsernameChange={handleUsernameChange}
              handleEmailChange={handleEmailChange}
              handleAuthorBioChange={handleAuthorBioChange}
            />
          }
        />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/authors/:id" element={<AuthorDetails />} />
      </Routes>
    </>
  );
};

export default App;
