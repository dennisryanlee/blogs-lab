import * as express from "express";
import db from "../../db";
import Validation from "../../Server_Utils/DataValidation";
import * as Types from "../../../types";

const usersRouter = express.Router();

// Current route is /api/users

//! Create an Author will be handled in auth routes

// Get all Authors
usersRouter.get("/", async (req, res) => {
  try {
    const data = await db.Authors.readAllAuthors(); // Read all Authors
    res.status(200).json(data); // send 200 and the data
  } catch (error) {
    if (error.sqlMessage) {
      console.log(`\n${error.sqlMessage}\n`); // log the sql error if there is one
    }

    console.log(`Get All Authors Error...\n`);
    console.error(error); // if an error happens, log the error

    res.status(500).json({ message: "Get All Authors failed, big R.I.P" }); // send status of 500
  }
});

// Get single Author
usersRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id); // grab the id from req.params...

  try {
    await Validation.isValidID(id);
    const AuthorArray = await db.Authors.readOneAuthor(id); // ...and use it as a number later.

    if (AuthorArray.length) {
      // if the Author exists in the database, send it as the response
      res.status(200).json(AuthorArray);
    } else {
      // if the Author does not exist, send a 404 error
      res.status(404).json({ message: `Missing Person Alert!  The Author with ID: ${id} does not exist` });
    }
  } catch (error) {
    if (error.sqlMessage) {
      console.log(`\n${error.sqlMessage}\n`); // log the sql error if there is one
    }

    console.log(`Get Single Author Error...\n`);
    console.error(error); // if an error happens, log the error

    res.status(500).json({ message: `Get single Author for ID:${id} failed.  Big oofs here` }); // send status of 500
  }
});

// Edit an Author
usersRouter.put("/:id", async (req: Types.ReqUser, res) => {
  const authorid = req!.user!.userid;

  try {
    const { authorbio } = req.body; // grab the updated info from the body...
    await Validation.isValidString([authorbio]);
    await Validation.isValidStringLength([[authorbio, 500]]);

    const updateAuthorInfo: Types.updateAuthorInfo = { authorbio }; // package the updated info into an object

    // if the author exists in the database, send it as the response

    const updateResults = await db.Authors.updateAuthor(updateAuthorInfo, authorid); // newBlogInfo contains the updated info, id specifies the blog

    if (updateResults.affectedRows) {
      res.status(200).json({ message: `Author ${authorid} updated their bio!` });
    } else {
      res.status(400).json({ message: `Oh my stars, we could not update the Author with ID:${authorid}` });
    }
  } catch (error) {
    if (error.sqlMessage) {
      console.log(`\n${error.sqlMessage}\n`); // log the sql error if there is one
    }

    console.log(`Update Author Error...\n`);
    console.error(error); // if an error happens, log the error

    res.status(500).json({
      message: `Updating Authors is hard!  Something went wrong when we tried to update the author with ID:${authorid}`,
    }); // send status of 500
  }
});

// Delete an Author
usersRouter.delete("/:id", async (req: Types.ReqUser, res) => {
  const authorid = req!.user!.userid;

  try {
    await Validation.isValidID(authorid);
    const DeleteAuthorResponse = await db.Authors.deleteAuthor(authorid); // use the authorid to delete the author

    if (DeleteAuthorResponse.affectedRows) {
      // if it was deleted
      res.status(200).json({ message: `Author ${authorid} was killed!  How could you?!?!` });
    } else {
      // if it was never there to begin with
      res.status(404).json({ message: `Who are you even talking about?` });
    }
  } catch (error) {
    if (error.sqlMessage) {
      console.log(`\n${error.sqlMessage}\n`); // log the sql error if there is one
    }

    console.log(`Delete Author Error...\n`);
    console.error(error); // if an error happens, log the error

    res.status(500).json({ message: `We tried, we failed, Author ${authorid} is too powerful` }); // send status of 500
  }
});

export default usersRouter;
