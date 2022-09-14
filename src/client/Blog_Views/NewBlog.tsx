import * as React from "react";
import { useEffect, useState } from "react";
import * as Types from "../../types";
import Validation from "../Client_Utils/DataValidation";
import { useNavigate } from "react-router-dom";
import Fetcher from "../Client_Utils/Fetch_Service";
import decodeMyToken from "../Client_Utils/TokenDecode";

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

  const decodedToken = decodeMyToken();
  const authorid = decodedToken.userid;

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

    Fetcher.POST("/api/blogs/", { title, content, tagid: selectedTagId })
      .then(() => {
        handleClearTitleAndContent(); // clear the inputs
        nav("/blogs"); // nav to blogs view is no errors
      })
      .catch((error) => {
        console.log(`New Blog Error...\n`);
        console.error(error);
      });
  };

  const getAllTags = () => {
    Fetcher.GET(`/api/tags`)
      .then((data) => {
        setTagsArray(data); // set the data to state if no error
      })
      .catch((error) => {
        console.log(`Get All Tags Error...\n`);
        console.error(error);
      });
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

            <select
              onChange={(e) => setSelectedTagId(Number(e.target.value))}
              className="form-select my-1"
              value={Number(selectedTagId)}
            >
              <option value={0}>Pick a tag</option>
              {tagsArray.map((tag) => (
                <option key={`Tag-${tag.id}`} value={tag.id}>
                  {tag.tagname}
                </option>
              ))}
            </select>

            <button className="btn btn-primary my-2 ms-2 col-md-6" type="button" onClick={(e) => handleNewBlog(e)}>
              Submit
            </button>
            <button
              className="btn btn-primary my-2 ms-2 col-md-6"
              type="button"
              onClick={() => {
                handleClearTitleAndContent();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewBlog;
