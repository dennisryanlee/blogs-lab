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
import Validation from "../server/Utils/DataValidation";

const App = (props: Types.AppProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [authorbio, setAuthorBio] = useState<string>("");
  const [loggedIn, setloggedIn] = useState<boolean>(false);
  const [blogsArray, setBlogsArray] = useState<Types.Blog[]>([]);
  const [authorsArray, setAuthorsArray] = useState<Types.Author[]>([]);

  const nav = useNavigate(); // lets us navigate the user around

  const navToAuthors = () => {
    nav("/authors");
  };

  const navToBlogs = () => {
    nav("/blogs");
  };

  const handleAuthorBioChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    return setAuthorBio(e.target.value);
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setPassword(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setEmail(e.target.value);
  };

  // Creates a new author, and logs them in
  const handleNewAuthorLogin = () => {
    // Validation
    if (
      !Validation.isValidStringClient([username, email, authorbio]) ||
      !Validation.isValidStringLengthClient([
        [username, 45],
        [email, 45],
        [authorbio, 500],
      ]) ||
      Validation.isValidEmailClient(email)
    ) {
      alert("Please check your data");
      return;
    }

    fetch("/api/authors/", {
      // use the route:  /api/chirps/ ...
      method: "POST", // ...send a POST request...
      headers: {
        // ...specifying the type of content...
        "content-type": "application/json",
      },
      body: JSON.stringify({ authorname: username, authorbio: authorbio, email: email }), // ...and deliver the content
    })
      .then((res) => {
        // then with that response
        res.json().then((data) => {
          // parse as JSON data, then with that data
          if (res.ok) {
            // if there was an OK response
            setPassword("New Author Pass"); // set the password

            setEmail(""); // clear input fields
            setAuthorBio(""); // clear input fields
            setloggedIn(!loggedIn); // update state to reflect a logged in status

            return navToBlogs(); // navigate user to blogs
          } else {
            // if there was not an OK response
            throw new Error(data.message); // throw a new error
          }
        });
      })
      .catch((error) => console.log(error));
  };

  const handleLoggingIn = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (Validation.isValidStringClient([username, password]) || password.length <= 8) {
      alert("Check your credentials");
      return;
    }
    if (username.includes("Ervin Howell")) {
      const secretTrackz = new Audio(`../secretTrack.mp3`);
      secretTrackz.play();
    }

    navToBlogs();

    return setloggedIn(!loggedIn);
  };

  const handleLoggingOut = () => {
    setUsername("");
    setPassword("");
    setloggedIn(!loggedIn);
    nav("/");
  };

  const getAllBlogs = () => {
    fetch("/api/blogs") // GET from "/api/blogs"
      .then((res) => {
        // then with that response
        res.json().then((data) => {
          // parse as JSON data, then with that data
          if (res.ok) {
            // if there was an OK response
            setBlogsArray(data); // set the data to state
          } else {
            // if there was not an OK response
            throw new Error(data.message); // throw a new error
          }
        });
      })
      .catch((error) => console.log(error));
  };

  const getAllAuthors = () => {
    fetch("/api/authors") // GET from "/api/authors"
      .then((res) => {
        // then with that response
        res.json().then((data) => {
          // parse as JSON data, then with that data
          if (res.ok) {
            // if there was an OK response
            setAuthorsArray(data); // set the data to state
          } else {
            // if there was not an OK response
            throw new Error(data.message); // throw a new error
          }
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllBlogs();
    getAllAuthors();
  }, []);

  return (
    <>
      <main className="container my-5">
        <h1 className="text-primary text-center">Blogs, duh.</h1>
      </main>
      {loggedIn && (
        <div className="d-flex justify-content-center">
          <Navbar navToAuthors={navToAuthors} navToBlogs={navToBlogs} handleLoggingOut={handleLoggingOut}></Navbar>
        </div>
      )}

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
              handleNewAuthorLogin={handleNewAuthorLogin}
            />
          }
        />
        <Route path="/blogs" element={<Blogs blogsArray={blogsArray} />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/authors" element={<Authors authorsArray={authorsArray} />} />
        <Route path="/authors/:id" element={<AuthorDetails />} />
      </Routes>
    </>
  );
};

export default App;
