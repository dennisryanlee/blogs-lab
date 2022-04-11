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

// Create a Blog
router.post("/api/blogs", async (req, res) => {
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

// Create an Author
router.post("/api/authors", async (req, res) => {
  const { authorname, email } = req.body;
  try {
    const newAuthorInfo = { authorname: authorname, email: email }; // package the new info into an object
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

// Create a Tag
router.post("/api/tags", async (req, res) => {
  const { tagname } = req.body;
  try {
    const newTagInfo = { tagname: tagname }; // package the new info into an object
    const results = await db.Tags.createNewTag(newTagInfo);

    if (results.affectedRows) {
      // if the tag was added
      res.status(200).json({ message: `New Tag called ${tagname} was added, get out there and start tagging!` });
    } else {
      // if the tag was not added
      res.status(400).json({ message: `Hey, your Tag called ${tagname} needs more work` });
    }
  } catch (error) {
    const myError: MysqlError = error;
    console.log(`\n`);
    console.log(error); // if an error happens, log the error
    console.log(`\n${myError.sqlMessage}\n`); // log the sql error as well message
    res.status(500).json({ message: `We could not add '${tagname}', try again later, (I'm sure it was good!)` }); // send status of 500
  }
});

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

// Get all Tags
router.get("/api/tags", async (req, res) => {
  try {
    const data = await db.Tags.readAllTags(); // Read all Tags
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

// Get single Author
router.get("/api/authors/:id", async (req, res) => {
  const { id } = req.params; // grab the id from req.params...
  try {
    const AuthorArray = await db.Authors.readOneAuthor(Number(id)); // ...and use it as a number later.

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

// Get single Tag
router.get("/api/tags/:id", async (req, res) => {
  const { id } = req.params; // grab the id from req.params...
  try {
    const TagArray = await db.Tags.readOneTag(Number(id)); // ...and use it as a number later.

    if (TagArray.length) {
      // if the Tag exists in the database, send it as the response
      res.status(200).json(TagArray);
    } else {
      // if the Tag does not exist, send a 404 error
      res.status(404).json({ message: `This is a bit awkward, but the tag with ID:${id} does not exist` });
    }
  } catch (error) {
    const myError: MysqlError = error;
    console.log(`\n`);
    console.log(error); // if an error happens, log the error
    console.log(`\n${myError.sqlMessage}\n`); // log the sql error as well message
    res.status(500).json({ message: `Get single Tag for ID:${id} failed.  Big oofs here` }); // send status of 500
  }
});

// Edit a Blog
router.put("/api/blogs/:id", async (req, res) => {
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

// Edit an Author
router.put("/api/authors/:id", async (req, res) => {
  const { id } = req.params; // grab the id from req.params...
  try {
    const { authorname, email } = req.body; // grab the updated info from the body...
    const newAuthorInfo = { authorname: authorname, email: email }; // package the updated info into an object

    const [results] = await db.Authors.readOneAuthor(Number(id)); // ...and use the id as a number to get that particular author.

    if (results) {
      // if the author exists in the database, send it as the response

      const updateResults = await db.Authors.updateAuthor(newAuthorInfo, Number(id)); // newBlogInfo contains theupdated info, id specifies the blog

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

// Edit a Tag
router.put("/api/tags/:id", async (req, res) => {
  const { id } = req.params; // grab the id from req.params...
  try {
    const { tagname } = req.body; // grab the updated info from the body...
    const newTagInfo = { tagname: tagname }; // package the updated info into an object

    const [results] = await db.Tags.readOneTag(Number(id)); // ...and use the id as a number to get that particular tag.

    if (results) {
      // if the tag exists in the database, send it as the response

      const updateResults = await db.Tags.updateTag(newTagInfo, Number(id)); // newTagInfo contains the updated info, id specifies the tag

      if (updateResults.affectedRows) {
        res.status(200).json({ message: `Tag ${id} was updated to show ${tagname}` });
      } else {
        res.status(400).json({ message: `Oh my stars, we could not update the tag with ID:${id}` });
      }
    } else {
      // if the blog does not exist, send a 404 error
      res.status(404).json({ message: "Whoopsie-daisy, that tag does not exist" });
    }
  } catch (error) {
    const myError: MysqlError = error;
    console.log(`\n`);
    console.log(error); // if an error happens, log the error
    console.log(`\n${myError.sqlMessage}\n`); // log the sql error as well message
    res.status(500).json({ message: `Updating Tags is hard!  Something went wrong when we tried to update the tag with ID:${id}` }); // send status of 500
  }
});

// Delete a Blog
router.delete("/api/blogs/:id", async (req, res) => {
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

// Delete an Author
router.delete("/api/authors/:id", async (req, res) => {
  const { id } = req.params; // grab the id from req.params...
  try {
    const DeleteAuthorResponse = await db.Authors.deleteAuthor(Number(id)); // use the id to delete the author

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

// Delete a Tag
router.delete("/api/tags/:id", async (req, res) => {
  const { id } = req.params; // grab the id from req.params...
  try {
    const DeleteTagResponse = await db.Tags.deleteTag(Number(id)); // use the id to delete the author

    if (DeleteTagResponse.affectedRows) {
      // if it was deleted
      res.status(200).json({ message: `You know you're not supposed to remove tags right?  Ugh ok fine, Tag ${id} was removed` });
    } else {
      // if it was never there to begin with
      res.status(404).json({ message: `We don't carry that line of tags in this store` });
    }
  } catch (error) {
    const myError: MysqlError = error;
    console.log(`\n`);
    console.log(error); // if an error happens, log the error
    console.log(`\n${myError.sqlMessage}\n`); // log the sql error as well message
    res.status(500).json({ message: `We tried, we failed, Tag ${id} is too powerful` }); // send status of 500
  }
});

export default router;
