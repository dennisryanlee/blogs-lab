import * as express from "express";
import db from "../db";
import { MysqlError } from "mysql";
import Validation from "../Utils/DataValidation";

const authorRouter = express.Router();

// Current route is /api/authors

// Create an Author
authorRouter.post("/", async (req, res) => {
  const { authorname, authorbio, email } = req.body;

  Validation.isValidString(res, [authorname, authorbio, email]);
  Validation.isValidEmail(res, email);
  Validation.isValidStringLength(res, [
    [authorname, 45],
    [authorbio, 500],
    [email, 45],
  ]);

  try {
    const newAuthorInfo = { authorname, authorbio, email }; // package the new info into an object
    const results = await db.Authors.createNewAuthor(newAuthorInfo);

    if (results.affectedRows) {
      // if the author was added
      res.status(200).json({ message: `Welcome ${authorname}!` });
    } else {
      // if the author was not added
      res.status(400).json({ message: `Sorry, ${authorname}, there isn't any room for you just yet` });
    }
  } catch (error) {
    const myError: MysqlError = error;
    console.log(`\n`);
    console.log(error); // if an error happens, log the error
    console.log(`\n${myError.sqlMessage}\n`); // log the sql error as well message
    res.status(500).json({ message: `Sorry ${authorname}, we're having a tough time.` }); // send status of 500
  }
});

// Get all Authors
authorRouter.get("/", async (req, res) => {
  try {
    const data = await db.Authors.readAllAuthors(); // Read all Authors
    res.status(200).json(data); // send 200 and the data
  } catch (error) {
    const myError: MysqlError = error;
    console.log(`\n`);
    console.log(error); // if an error happens, log the error
    console.log(`\n${myError.sqlMessage}\n`); // log the sql error as well message
    res.status(500).json({ message: "Get All Authors failed, big R.I.P" }); // send status of 500
  }
});

// Get single Author
authorRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id); // grab the id from req.params...

  Validation.isValidID(res, id);

  try {
    const AuthorArray = await db.Authors.readOneAuthor(id); // ...and use it as a number later.

    if (AuthorArray.length) {
      // if the Author exists in the database, send it as the response
      res.status(200).json(AuthorArray);
    } else {
      // if the Author does not exist, send a 404 error
      res.status(404).json({ message: `Missing Person Alert!  The Author with ID: ${id} does not exist` });
    }
  } catch (error) {
    const myError: MysqlError = error;
    console.log(`\n`);
    console.log(error); // if an error happens, log the error
    console.log(`\n${myError.sqlMessage}\n`); // log the sql error as well message
    res.status(500).json({ message: `Get single Author for ID:${id} failed.  Big oofs here` }); // send status of 500
  }
});

// Edit an Author
authorRouter.put("/:id", async (req, res) => {
  const id = Number(req.params.id); // grab the id from req.params...

  Validation.isValidID(res, id);

  try {
    const { authorname, authorbio, email } = req.body; // grab the updated info from the body...

    Validation.isValidString(res, [authorname, authorbio, email]);
    Validation.isValidEmail(res, email);
    Validation.isValidStringLength(res, [
      [authorname, 45],
      [authorbio, 500],
      [email, 45],
    ]);

    const newAuthorInfo = { authorname, authorbio, email }; // package the updated info into an object

    const [results] = await db.Authors.readOneAuthor(id); // ...and use the id as a number to get that particular author.

    if (results) {
      // if the author exists in the database, send it as the response

      const updateResults = await db.Authors.updateAuthor(newAuthorInfo, id); // newBlogInfo contains theupdated info, id specifies the blog

      if (updateResults.affectedRows) {
        res.status(200).json({ message: `Author ${id} was updated to show ${authorname}, and ${email}` });
      } else {
        res.status(400).json({ message: `Oh my stars, we could not update the Author with ID:${id}` });
      }
    } else {
      // if the blog does not exist, send a 404 error
      res.status(404).json({ message: "Whoopsie-daisy, that author does not exist" });
    }
  } catch (error) {
    const myError: MysqlError = error;
    console.log(`\n`);
    console.log(error); // if an error happens, log the error
    console.log(`\n${myError.sqlMessage}\n`); // log the sql error as well message
    res.status(500).json({ message: `Updating Authors is hard!  Something went wrong when we tried to update the author with ID:${id}` }); // send status of 500
  }
});

// Delete an Author
authorRouter.delete("/:id", async (req, res) => {
  const id = Number(req.params.id); // grab the id from req.params...

  Validation.isValidID(res, id);

  try {
    const DeleteAuthorResponse = await db.Authors.deleteAuthor(id); // use the id to delete the author

    if (DeleteAuthorResponse.affectedRows) {
      // if it was deleted
      res.status(200).json({ message: `Author ${id} was killed!  How could you?!?!` });
    } else {
      // if it was never there to begin with
      res.status(404).json({ message: `Who are you even talking about?` });
    }
  } catch (error) {
    const myError: MysqlError = error;
    console.log(`\n`);
    console.log(error); // if an error happens, log the error
    console.log(`\n${myError.sqlMessage}\n`); // log the sql error as well message
    res.status(500).json({ message: `We tried, we failed, Author ${id} is too powerful` }); // send status of 500
  }
});

export default authorRouter;
