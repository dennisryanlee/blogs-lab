import * as React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
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

const stripe = loadStripe("pk_test_51Kr0L7EnuysmmtJOkyeBUywjbunbFLeBsT9gwdTcYkSMGy27sGg0NG2VH8ZQi4D1fbK5xfO2N6vGmyhHJ2G7MxlF00SU1EuUkl");

const App = (props: Types.AppProps) => {
  return (
    <>
      <main className="container my-5">
        <h1 className="text-primary text-center">Blogs, duh.</h1>
      </main>
      {/* need to make sure navbar only shows up when logged in */}
      <div className="d-flex justify-content-center">
        <Navbar></Navbar>
      </div>

      <Routes>
        <Route path="/" element={<Loginpage />} />

        <Route
          path="/donate"
          element={
            <Elements stripe={stripe}>
              <Donate />
            </Elements>
          }
        />

        <Route path="/receipt" element={<PaymentReceiptPage />} />
        <Route path="/contact" element={<AuthorContact />} />
        <Route path="/newauthor" element={<NewAuthor />} />
        <Route path="/newblog" element={<NewBlog />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/users" element={<Authors />} />
        <Route path="/users/:id" element={<AuthorDetails />} />
      </Routes>
    </>
  );
};

export default App;
