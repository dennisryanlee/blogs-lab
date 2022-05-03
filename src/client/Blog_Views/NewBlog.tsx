import { Button } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import * as Types from "../../types";
import Validation from "../Client_Utils/DataValidation";
import { useNavigate } from "react-router-dom";

const NewBlog = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tagsArray, setTagsArray] = useState<Types.Tag[]>([]);
  const [selectedTagId, setSelectedTagId] = useState<number>(0);

  const nav = useNavigate();

  const handleClearTitleAndContent = () => {
    setTitle("");
    setContent("");
    setSelectedTagId(0);
  };

  const handleNewBlog = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Validation

    Validation.isValidString([title, content])
      .then(() =>
        Validation.isValidStringLength([
          [content, 1500],
          [title, 45],
        ])
      )
      .then(() => Validation.isValidInteger(selectedTagId))
      .then(() => console.log(`Validation complete.`))

      .catch((error) => {
        console.error(error);
        alert("Please check your inputs");
        return;
      });

    if (!selectedTagId) {
      alert("Hey don't forget your tag!");
    }

    fetch("/api/blogs/", {
      // use the route:  /api/chirps/ ...
      method: "POST", // ...send a POST request...
      headers: {
        // ...specifying the type of content...
        "content-type": "application/json",
      }, //! Get the authorid from the token - not fully implemented yet
      body: JSON.stringify({ title, content, authorid: localStorage.getItem, tagid: selectedTagId }), // ...and deliver the content
    })
      .then((res) => {
        // then with that response
        res.json().then((data) => {
          // parse as JSON data, then with that data
          if (res.ok) {
            // if there was an OK response
            handleClearTitleAndContent(); // clear the inputs
            nav("/blogs"); // nav to blogs view
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

  useEffect(() => {
    getAllTags();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div className="card bg-light shadow col-md-4">
          <div className="card-body d-flex flex-wrap justify-content-center">
            <h5 className="card-title text-center col-md-7">Blog Away!</h5>
            <input
              placeholder="Blog Title"
              type="text"
              value={title}
              className="form-control col-md-7 mb-1"
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Your content here"
              value={content}
              className="form-control col-md-7 my-1"
              onChange={(e) => setContent(e.target.value)}
            ></textarea>

            <select onChange={(e) => setSelectedTagId(Number(e.target.value))} className="form-select my-1" value={Number(selectedTagId)}>
              <option value={0}>Pick a tag</option>
              {tagsArray.map((tag) => (
                <option key={`Tag-${tag.id}`} value={tag.id}>
                  {tag.tagname}
                </option>
              ))}
            </select>

            <Button variant="contained" className="btn btn-primary my-2 ms-2 col-md-6" type="button" onClick={(e) => handleNewBlog(e)}>
              Submit
            </Button>
            <Button
              variant="contained"
              className="btn btn-primary my-2 ms-2 col-md-6"
              type="button"
              onClick={() => {
                handleClearTitleAndContent();
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewBlog;
