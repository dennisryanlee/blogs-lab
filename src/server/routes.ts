import * as express from "express";
import db from "./db";
import { MysqlError } from "mysql";

const router = express.Router();

/**
 * Blogs: "id", "title", "content", "authorid", "_created"
 * New Blog requires "title", "content", "authorid"
 *
 * Authors: "id", "authorname", "email", "_created"
 * New Author requires "authorname", "email"
 *
 * Tags: "id", "tagname", "_created"
 * New Tag requires "tagname"
 */

// Get all Blogs
router.get("/api/blogs", async (req, res) => {
  try {
    const data = await db.Blogs.readAllBlogs(); // Read all Blogs
    res.status(200).json(data); // send 200 and the data
  } catch (error) {
    const myError: MysqlError = error;
    console.log(`\n`);
    console.log(error); // if an error happens, log the error
    console.log(`\n${myError.sqlMessage}\n`); // log the sql error as well message
    res.status(500).json({ message: "Get All Blogs failed, big R.I.P" }); // send status of 500
  }
});

// Get all Authors
router.get("/api/authors", async (req, res) => {
  try {
    const data = await db.Authors.readAllAuthors; // Read all Authors
    res.status(200).json(data); // send 200 and the data
  } catch (error) {
    const myError: MysqlError = error;
    console.log(`\n`);
    console.log(error); // if an error happens, log the error
    console.log(`\n${myError.sqlMessage}\n`); // log the sql error as well message
    res.status(500).json({ message: "Get All Authors failed, big R.I.P" }); // send status of 500
  }
});

// Get all Tags
router.get("/api/tags", async (req, res) => {
  try {
    const data = await db.Tags.readAllTags; // Read all Tags
    res.status(200).json(data); // send 200 and the data
  } catch (error) {
    const myError: MysqlError = error;
    console.log(`\n`);
    console.log(error); // if an error happens, log the error
    console.log(`\n${myError.sqlMessage}\n`); // log the sql error as well message
    res.status(500).json({ message: "Get All Tags failed, big R.I.P" }); // send status of 500
  }
});

// Get single Blog
router.get("/api/blogs/:id", async (req, res) => {
  try {
    const { id } = req.params; // grab the id from req.params...
    const BlogArray = await db.Blogs.readOneBlog(Number(id)); // ...and use it as a number later.

    if (BlogArray.length) {
      // if the Blog exists in the database, send it as the response
      res.status(200).json(BlogArray);
    } else {
      // if the Blog does not exist, send a 404 error
      res.status(404).json({ message: "does not exist" });
    }
  } catch (error) {
    const myError: MysqlError = error;
    console.log(`\n`);
    console.log(error); // if an error happens, log the error
    console.log(`\n${myError.sqlMessage}\n`); // log the sql error as well message
    res.status(500).json({ message: `Get single Blog for ID:${req.params.id} failed.  Big oofs here` }); // send status of 500
  }
});

// Get single Author
router.get("/api/authors/:id", async (req, res) => {
  try {
    const { id } = req.params; // grab the id from req.params...
    const AuthorArray = await db.Authors.readOneAuthor(Number(id)); // ...and use it as a number later.

    if (AuthorArray.length) {
      // if the Author exists in the database, send it as the response
      res.status(200).json(AuthorArray);
    } else {
      // if the Author does not exist, send a 404 error
      res.status(404).json({ message: "does not exist" });
    }
  } catch (error) {
    const myError: MysqlError = error;
    console.log(`\n`);
    console.log(error); // if an error happens, log the error
    console.log(`\n${myError.sqlMessage}\n`); // log the sql error as well message
    res.status(500).json({ message: `Get single Author for ID:${req.params.id} failed.  Big oofs here` }); // send status of 500
  }
});

// Get single Tag
router.get("/api/tags/:id", async (req, res) => {
  try {
    const { id } = req.params; // grab the id from req.params...
    const TagArray = await db.Tags.readOneTag(Number(id)); // ...and use it as a number later.

    if (TagArray.length) {
      // if the Tag exists in the database, send it as the response
      res.status(200).json(TagArray);
    } else {
      // if the Tag does not exist, send a 404 error
      res.status(404).json({ message: "does not exist" });
    }
  } catch (error) {
    const myError: MysqlError = error;
    console.log(`\n`);
    console.log(error); // if an error happens, log the error
    console.log(`\n${myError.sqlMessage}\n`); // log the sql error as well message
    res.status(500).json({ message: `Get single Tag for ID:${req.params.id} failed.  Big oofs here` }); // send status of 500
  }
});
export default router;
