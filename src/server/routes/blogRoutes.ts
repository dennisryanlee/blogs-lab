import * as express from "express";
import db from "../db";
import { MysqlError } from "mysql";

const blogRouter = express.Router();

// Create a Blog
blogRouter.post("/api/blogs", async (req, res) => {
  try {
    const { title, content, authorid } = req.body;
    const newBlogInfo = { title: title, content: content, authorid: authorid }; // package the new info into an object
    const results = await db.Blogs.createNewBlog(newBlogInfo);

    if (results.affectedRows) {
      // if the blog was added
      res.status(200).json({ message: `New blog titled ${title} from ${authorid} was made!` });
    } else {
      // if the blog was not added
      res.status(400).json({ message: `Sorry, we don't publish trash like ${title} on this app.` });
    }
  } catch (error) {
    const myError: MysqlError = error;
    console.log(`\n`);
    console.log(error); // if an error happens, log the error
    console.log(`\n${myError.sqlMessage}\n`); // log the sql error as well message
    res.status(500).json({ message: `Blogging is tough work and it is time for my break, try again later` }); // send status of 500
  }
});

// Get all Blogs
blogRouter.get("/api/blogs", async (req, res) => {
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

// Get single Blog
blogRouter.get("/api/blogs/:id", async (req, res) => {
  // if we destructure id from req.params here, we can reference it in both the try and catch blocks
  const { id } = req.params; // grab the id from req.params...
  try {
    const BlogArray = await db.Blogs.readOneBlog(Number(id)); // ...and use it as a number later.

    if (BlogArray.length) {
      // if the Blog exists in the database, send it as the response
      res.status(200).json(BlogArray);
    } else {
      // if the Blog does not exist, send a 404 error
      res.status(404).json({ message: `The blog with ID:${id} does not exist` });
    }
  } catch (error) {
    const myError: MysqlError = error;
    console.log(`\n`);
    console.log(error); // if an error happens, log the error
    console.log(`\n${myError.sqlMessage}\n`); // log the sql error as well message
    res.status(500).json({ message: `Get single Blog for ID:${id} failed.  Big oofs here` }); // send status of 500
  }
});

// Edit a Blog
blogRouter.put("/api/blogs/:id", async (req, res) => {
  const { id } = req.params; // grab the id from req.params...
  try {
    const { title, content, authorid } = req.body; // grab the updated info from the body...
    const newBlogInfo = { title: title, content: content, authorid: authorid }; // package the updated info into an object

    const [results] = await db.Blogs.readOneBlog(Number(id)); // ...and use the id as a number to get that particular blog.

    if (results) {
      // if the blog exists in the database, send it as the response

      const updateResults = await db.Blogs.updateBlog(newBlogInfo, Number(id)); // newBlogInfo contains theupdated info, id specifies the blog

      if (updateResults.affectedRows) {
        res.status(200).json({ message: `Blog ${id} was updated to show ${content}` });
      } else {
        res.status(400).json({ message: `Oh my stars, we could not update the blog with ID:${id}` });
      }
    } else {
      // if the blog does not exist, send a 404 error
      res.status(404).json({ message: "Whoopsie-daisy, that blog does not exist" });
    }
  } catch (error) {
    const myError: MysqlError = error;
    console.log(`\n`);
    console.log(error); // if an error happens, log the error
    console.log(`\n${myError.sqlMessage}\n`); // log the sql error as well message
    res.status(500).json({ message: `Updating Blogs is hard!  Something went wrong when we tried to update the blog with ID:${id}` }); // send status of 500
  }
});

// Delete a Blog
blogRouter.delete("/api/blogs/:id", async (req, res) => {
  const { id } = req.params; // grab the id from req.params...
  try {
    const DeleteBlogResponse = await db.Blogs.deleteBlog(Number(id)); // use the id to delete the blog

    if (DeleteBlogResponse.affectedRows) {
      // if it was deleted
      res.status(200).json({ message: `Blog ${id} was deleted!` });
    } else {
      // if it was never there to begin with
      res.status(404).json({ message: `Zoinks!  That blog never existed` });
    }
  } catch (error) {
    const myError: MysqlError = error;
    console.log(`\n`);
    console.log(error); // if an error happens, log the error
    console.log(`\n${myError.sqlMessage}\n`); // log the sql error as well message
    res.status(500).json({ message: `We tried, we failed, Blog ${id} is too powerful` }); // send status of 500
  }
});

export default blogRouter;