import * as express from "express";
import * as Types from "../../../types";
import db from "../../db";
import Validation from "../../Server_Utils/DataValidation";

const blogRouter = express.Router();

// Current route is /api/blogs

// Create a Blog
blogRouter.post("/", async (req: Types.ReqUser, res) => {
  try {
    let { title, content, tagid } = req.body;

    const authorid = Number(req!.user!.userid);

    // Validation
    await Validation.isValidString([title, content]);
    await Validation.isValidStringLength([
      [title, 45],
      [content, 1500],
    ]);
    await Validation.isValidID(authorid);
    await Validation.isValidInteger(tagid);

    const newBlogInfo = { title, content, authorid }; // package the new info into an object
    const results = await db.Blogs.createNewBlog(newBlogInfo);

    if (results.rowCount) {
      let blogid = results.rows[0].id; // insert Id is the Id of the blog we've just created

      tagid = Number(tagid); // cast to type number
      blogid = Number(blogid); // cast to type number

      // do database call here to insert into blogtags
      const newBlogTagInfo = { blogid, tagid }; // package the new Blogtag info into an object
      await db.Tags.createNewBlogTag(newBlogTagInfo); // make a new BlogTag

      // if the blog was added
      res.status(200).json({ message: `New blog titled ${title} from ${authorid} was made!` });
    } else {
      // if the blog was not added
      res.status(400).json({ message: `Sorry, we don't publish trash like ${title} on this app.` });
    }
  } catch (error) {
    if (error.sqlMessage) {
      console.log(`\n${error.sqlMessage}\n`); // log the sql error if there is one
    }
    console.log(`Create Blog error...\n`);
    console.error(error); // if an error happens, log the error
    res.status(500).json({ message: `Blogging is tough work and it is time for my break, try again later` }); // send status of 500
  }
});

// Get all Blogs
blogRouter.get("/", async (req, res) => {
  try {
    const data = await db.Blogs.readAllBlogs(); // Read all Blogs
    res.status(200).json(data); // send 200 and the data
  } catch (error) {
    if (error.sqlMessage) {
      console.log(`\n${error.sqlMessage}\n`); // log the sql error if there is one
    }
    console.log(`Get All Blogs error...\n`);
    console.error(error); // if an error happens, log the error

    res.status(500).json({ message: "Get All Blogs failed, big R.I.P" }); // send status of 500
  }
});

// Get single Blog
blogRouter.get("/:id", async (req, res) => {
  // if we destructure id from req.params here, we can reference it in both the try and catch blocks
  const id = Number(req.params.id); // grab the id from req.params...

  // Validation

  try {
    await Validation.isValidID(id);
    const BlogArray = await db.Blogs.readOneBlog(id); // ...and use it as a number later.

    if (BlogArray.length) {
      // if the Blog exists in the database, send it as the response
      res.status(200).json(BlogArray);
    } else {
      // if the Blog does not exist, send a 404 error
      res.status(404).json({ message: `The blog with ID:${id} does not exist` });
    }
  } catch (error) {
    if (error.sqlMessage) {
      console.log(`\n${error.sqlMessage}\n`); // log the sql error if there is one
    }
    console.log(`Get Single Blog error...\n`);
    console.error(error); // if an error happens, log the error

    res.status(500).json({ message: `Get single Blog for ID:${id} failed.  Big oofs here` }); // send status of 500
  }
});

// Edit a Blog
blogRouter.put("/:id", async (req: Types.ReqUser, res) => {
  const id = Number(req.params.id); // grab the id of the blog i want to delete from req.params...

  const { title, content } = req.body; // grab the updated info from the body...
  const authoridnum = Number(req!.user!?.userid); // get the author id from the request

  try {
    // Validation
    await Validation.isValidID(id);
    await Validation.isValidID(authoridnum);
    await Validation.isValidString([title, content]);
    await Validation.isValidStringLength([
      [content, 1500],
      [title, 45],
    ]);

    const newBlogInfo = { title, content, authorid: authoridnum }; // package the updated info into an object

    const [results] = await db.Blogs.readOneBlog(id); // ...and use the id as a number to get that particular blog.

    if (results) {
      // if the blog exists in the database, send it as the response

      const updateResults = await db.Blogs.updateBlog(newBlogInfo, Number(id), authoridnum); // newBlogInfo contains theupdated info, id specifies the blog

      if (updateResults.rowCount) {
        //! if insert works, now we can add the tag
        // updateResults.insertId gives the new blog id

        res.status(200).json({ message: `Blog ${id} was updated to show ${content}` });
      } else {
        res.status(400).json({ message: `Oh my stars, we could not update the blog with ID:${id}` });
      }
    } else {
      // if the blog does not exist, send a 404 error
      res.status(404).json({ message: "Whoopsie-daisy, that blog does not exist" });
    }
  } catch (error) {
    if (error.sqlMessage) {
      console.log(`\n${error.sqlMessage}\n`); // log the sql error if there is one
    }
    console.log(`Update Blog error...\n`);
    console.error(error); // if an error happens, log the error

    res.status(500).json({
      message: `Updating Blogs is hard!  Something went wrong when we tried to update the blog with ID:${id}`,
    }); // send status of 500
  }
});

// Delete a Blog
blogRouter.delete("/:id", async (req: Types.ReqUser, res) => {
  const id = Number(req.params.id); // grab the id of the blog we want to delete from req.params...
  const authoridnum = Number(req!.user!.userid); // get the author id from the request

  try {
    // ID Validation
    await Validation.isValidID(id);

    const DeleteBlogResponse = await db.Blogs.deleteBlog(id, authoridnum); // use the id to delete the blog

    if (DeleteBlogResponse.rowCount) {
      // if it was deleted
      res.status(200).json({ message: `Blog ${id} was deleted!` });
    } else {
      // if it was never there to begin with
      res.status(404).json({ message: `Zoinks!  That blog never existed` });
    }
  } catch (error) {
    if (error.sqlMessage) {
      console.log(`\n${error.sqlMessage}\n`); // log the sql error if there is one
    }
    console.log(`Delete Blog error...\n`);
    console.error(error); // if an error happens, log the error

    res.status(500).json({ message: `We tried, we failed, Blog ${id} is too powerful` }); // send status of 500
  }
});

export default blogRouter;
