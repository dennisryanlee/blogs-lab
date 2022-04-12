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
  const [loggedIn, setloggedIn] = useState<boolean>(false);

  const nav = useNavigate(); // lets us navigate the user around

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setPassword(e.target.value);
  };

  const handleloggedIn = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!username) {
      alert("Please enter your Username");
      return;
    }
    if (!password) {
      alert("Please enter your passwprd");
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

  useEffect(() => {}, []);

  return (
    <>
      <main className="container my-5">
        <h1 className="text-primary text-center">Blogs, duh.</h1>
      </main>
      <Routes>
        <Navbar></Navbar>
        <Route
          path="/"
          element={
            <Loginpage
              username={username}
              password={password}
              loggedIn={loggedIn}
              handleUsernameChange={handleUsernameChange}
              handlePasswordChange={handlePasswordChange}
              handleloggedIn={handleloggedIn}
            />
          }
        />
        <Route path="/newauthor" element={<NewAuthor />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/authors/:id" element={<AuthorDetails />} />
      </Routes>
    </>
  );
};

export default App;
