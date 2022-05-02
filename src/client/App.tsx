import * as React from "react";
import { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import * as Types from "../types";
import Navbar from "./Navbar";
import Loginpage from "./Login";
import NewAuthor from "./Author_Views/NewAuthor";
import NewBlog from "./Blog_Views/NewBlog";
import Blogs from "./Blog_Views/Blogs";
import Authors from "./Author_Views/Authors";
import AuthorDetails from "./Author_Views/AuthorDetails";
import BlogDetails from "./Blog_Views/BlogDetails";
import Donate from "./Payment_Views/Donate";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentReceiptPage from "./Payment_Views/PaymentReceiptPage";
import AuthorContact from "./Author_Views/AuthorContact";
import Validation from "./Utils/DataValidation";

const stripe = loadStripe("pk_test_51Kr0L7EnuysmmtJOkyeBUywjbunbFLeBsT9gwdTcYkSMGy27sGg0NG2VH8ZQi4D1fbK5xfO2N6vGmyhHJ2G7MxlF00SU1EuUkl");

const App = (props: Types.AppProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [tagsArray, setTagsArray] = useState<Types.Tag[]>([]);
  const [selectedTagId, setSelectedTagId] = useState<number>(0);

  const [email, setEmail] = useState<string>("");
  const [authorbio, setAuthorBio] = useState<string>("");
  const [authorid, setAuthorId] = useState<number>(25);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const [loggedIn, setloggedIn] = useState<boolean>(false);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [blogsArray, setBlogsArray] = useState<Types.Blog[]>([]);
  const [authorsArray, setAuthorsArray] = useState<Types.Author[]>([]);

  const [authorToContact, setAuthorToContact] = useState<string>("");

  const nav = useNavigate(); // lets us navigate the user around

  // Navs ***************************************************************************************************

  const navToAuthors = () => {
    getAllAuthors(); // get all authors
    setIsEditing(false); // prevent user from leaving author edit and going right into blog edit
    nav("/users"); // nav to authors view
  };

  const navToBlogs = () => {
    getAllBlogs(); // get all blogs
    setIsEditing(false); // prevent user from leaving author edit and going right into blog edit
    nav("/blogs"); // nav to blogs view
  };

  const navToNewBlog = () => {
    setIsEditing(false); // prevent user from leaving author edit and going right into blog edit
    nav("/newblog"); // nav to new blog view
  };

  const navToDonate = () => {
    getAllAuthors(); // get all authors
    setIsEditing(false); // prevent user from leaving author edit and going right into blog edit
    nav("/donate"); // nav to donate view
  };

  const navToPaymentReceiptPage = () => {
    nav("/receipt");
  };

  // Inputs ***************************************************************************************************

  const handleAuthorBioChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    return setAuthorBio(e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    return setContent(e.target.value);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setTitle(e.target.value);
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

  const handleClearTitleAndContent = () => {
    setTitle("");
    setContent("");
  };

  // New Blogs / Authors ***************************************************************************************************

  const handleNewAuthorLogin = () => {
    // Validation
    if (
      Validation.isValidStringClient([username, email, authorbio]) ||
      Validation.isValidStringLengthClient([
        [username, 45],
        [email, 45],
        [authorbio, 500],
      ]) ||
      Validation.isValidEmailClient(email)
    ) {
      alert("Please check your data");
      return;
    }

    fetch("/api/users/", {
      // use the route:  /api/chirps/ ...
      method: "POST", // ...send a POST request...
      headers: {
        // ...specifying the type of content...
        "content-type": "application/json",
      },
      body: JSON.stringify({ username, authorbio, email }), // ...and deliver the content
    })
      .then((res) => {
        // then with that response
        res.json().then((data) => {
          // parse as JSON data, then with that data
          if (res.ok) {
            // if there was an OK response
            setPassword("New Author Pass"); // set the password
            setAuthorId(42); // this should be dynamic, but thatd involve another fetch req and is a feature i can add later
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

  const handleNewBlog = () => {
    // Validation
    if (
      Validation.isValidStringClient([title, content]) ||
      Validation.isValidStringLengthClient([
        [content, 1500],
        [title, 45],
      ]) ||
      Validation.isValidIntegerClient(selectedTagId)
    ) {
      alert("Please check your data");
      return;
    }

    if (!selectedTagId) {
      alert("Hey don't forget your tag!");
    }

    fetch("/api/blogs/", {
      // use the route:  /api/chirps/ ...
      method: "POST", // ...send a POST request...
      headers: {
        // ...specifying the type of content...
        "content-type": "application/json",
      },
      body: JSON.stringify({ title, content, authorid, tagid: selectedTagId }), // ...and deliver the content
    })
      .then((res) => {
        // then with that response
        res.json().then((data) => {
          // parse as JSON data, then with that data
          if (res.ok) {
            // if there was an OK response
            getAllBlogs(); // get all blogs - now with the newly created blog
            handleClearTitleAndContent(); // clear the inputs
            return navToBlogs(); // navigate user to blogs
          } else {
            // if there was not an OK response
            throw new Error(data.message); // throw a new error
          }
        });
      })
      .catch((error) => console.log(error));
  };

  // Logging in and out ***************************************************************************************************

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
    setAuthorId(42); // this should be dynamic, but thatd involve another fetch req and is a feature i can add later

    navToBlogs();

    return setloggedIn(!loggedIn);
  };

  const handleLoggingOut = () => {
    setUsername("");
    setPassword("");
    setloggedIn(!loggedIn);
    const secretTrackz2 = new Audio(`../okbye.mp3`);
    secretTrackz2.play();

    nav("/");
  };

  // Thats SO Fetch! ***************************************************************************************************

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
    fetch("/api/users") // GET from "/api/users"
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

  const getAllTags = () => {
    fetch(`/api/tags`)
      .then((res) => {
        // then with that response
        res.json().then((data) => {
          // parse as JSON data, then with that data
          if (res.ok) {
            // if there was an OK response
            setTagsArray(data); // set the data to state
          } else {
            // if there was not an OK response
            throw new Error(data.message); // throw a new error
          }
        });
      })
      .catch((error) => console.log(error));
  };

  const chefskiss = () => {
    const secretTrackz3 = new Audio(`../wow.mp3`);
    secretTrackz3.play();
  };

  const stuckem = () => {
    const secretTrackz4 = new Audio(`../stuckem.mp3`);
    secretTrackz4.play();
  };

  useEffect(() => {
    getAllBlogs();
    getAllAuthors();
    getAllTags();
  }, []);

  return (
    <>
      <main className="container my-5">
        <h1 className="text-primary text-center">Blogs, duh.</h1>
      </main>
      {loggedIn && (
        <div className="d-flex justify-content-center">
          <Navbar></Navbar>
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
          path="/donate"
          element={
            <Elements stripe={stripe}>
              <Donate navToPaymentReceiptPage={navToPaymentReceiptPage} />
            </Elements>
          }
        />

        <Route path="/receipt" element={<PaymentReceiptPage />} />

        <Route path="/contact" element={<AuthorContact navToAuthors={navToAuthors} authorToContact={authorToContact} />} />

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
        <Route
          path="/newblog"
          element={
            <NewBlog
              title={title}
              content={content}
              tagsArray={tagsArray}
              selectedTagId={selectedTagId}
              setSelectedTagId={setSelectedTagId}
              handleNewBlog={handleNewBlog}
              handleContentChange={handleContentChange}
              handleTitleChange={handleTitleChange}
              handleClearTitleAndContent={handleClearTitleAndContent}
            />
          }
        />
        <Route path="/blogs" element={<Blogs username={username} setBlogsArray={setBlogsArray} blogsArray={blogsArray} />} />
        <Route
          path="/blogs/:id"
          element={
            <BlogDetails
              blogsArray={blogsArray}
              isEditing={isEditing}
              title={title}
              content={content}
              navToBlogs={navToBlogs}
              setTitle={setTitle}
              setContent={setContent}
              setIsEditing={setIsEditing}
              chefskiss={chefskiss}
              stuckem={stuckem}
              handleContentChange={handleContentChange}
              handleTitleChange={handleTitleChange}
              handleClearTitleAndContent={handleClearTitleAndContent}
            />
          }
        />
        <Route path="/users" element={<Authors setAuthorsArray={setAuthorsArray} authorsArray={authorsArray} />} />
        <Route
          path="/users/:id"
          element={
            <AuthorDetails
              email={email}
              setEmail={setEmail}
              handleEmailChange={handleEmailChange}
              authorbio={authorbio}
              setAuthorBio={setAuthorBio}
              chefskiss={chefskiss}
              handleAuthorBioChange={handleAuthorBioChange}
              navToAuthors={navToAuthors}
              navToAuthorContact={navToAuthorContact}
              setAuthorToContact={setAuthorToContact}
              authorsArray={authorsArray}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
