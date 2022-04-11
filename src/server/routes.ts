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

export default router;
