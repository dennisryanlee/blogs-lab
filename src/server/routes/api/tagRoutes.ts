import * as express from "express";
import db from "../../db/";
import Validation from "../../Server_Utils/DataValidation";

const tagRouter = express.Router();

// Current route is /api/tags
//! let admins add/edit/delete

//@ creating tags from the front end or server is not yet supported
// Create a Tag
// tagRouter.post("/", async (req, res) => {
//   req.body.parse;

//   const { tagname } = req.body;

//   const newTagInfo = { tagname }; // package the new info into an object
//   try {
//     // Validation
//     await Validation.isValidString([tagname]);
//     await Validation.isValidStringLength([[tagname, 45]]);
//     const results = await db.Tags.createNewTag(newTagInfo);

//     if (results.affectedRows) {
//       // if the tag was added
//       res.status(200).json({ message: `New Tag called ${tagname} was added, get out there and start tagging!` });
//     } else {
//       // if the tag was not added
//       res.status(400).json({ message: `Hey, your Tag called ${tagname} needs more work` });
//     }
//   } catch (error) {
//     if (error.sqlMessage) {
//       console.log(`\n${error.sqlMessage}\n`); // log the sql error if there is one
//     }

//     console.log(`Create Tag Error...\n`);
//     console.error(error); // if an error happens, log the error

//     res.status(500).json({ message: `We could not add '${tagname}', try again later...(I'm sure it was good!)` }); // send status of 500
//   }
// });

// Get all Tags
tagRouter.get("/", async (req, res) => {
  try {
    const data = await db.Tags.readAllTags(); // Read all Tags
    res.status(200).json(data); // send 200 and the data
  } catch (error) {
    if (error.sqlMessage) {
      console.log(`\n${error.sqlMessage}\n`); // log the sql error if there is one
    }

    console.log(`Get All Tags Error...\n`);
    console.error(error); // if an error happens, log the error

    res.status(500).json({ message: "Get All Tags failed, big R.I.P" }); // send status of 500
  }
});

// Get single Tag
tagRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id); // grab the id from req.params...

  try {
    // Validation
    await Validation.isValidID(id);
    const TagArray = await db.Tags.readOneTag(id); // ...and use it as a number later.

    if (TagArray.length) {
      // if the Tag exists in the database, send it as the response
      res.status(200).json(TagArray);
    } else {
      // if the Tag does not exist, send a 404 error
      res.status(404).json({ message: `This is a bit awkward, but the tag with ID:${id} does not exist` });
    }
  } catch (error) {
    if (error.sqlMessage) {
      console.log(`\n${error.sqlMessage}\n`); // log the sql error if there is one
    }

    console.log(`Get Single Tag Error...\n`);
    console.error(error); // if an error happens, log the error

    res.status(500).json({ message: `Get single Tag for ID:${id} failed.  Big oofs here` }); // send status of 500
  }
});

// Edit a Tag
// tagRouter.put("/:id", async (req, res) => {
//   const id = Number(req.params.id); // grab the id from req.params...
//   req.body.parse;

//   const { tagname } = req.body; // grab the updated info from the body...

//   try {
//     // Validation
//     await Validation.isValidID(id);
//     await Validation.isValidString([tagname]);
//     await Validation.isValidStringLength([[tagname, 45]]);
//     const newTagInfo = { tagname }; // package the updated info into an object
//     const [results] = await db.Tags.readOneTag(id); // ...and use the id as a number to get that particular tag.

//     if (results) {
//       // if the tag exists in the database, send it as the response

//       const updateResults = await db.Tags.updateTag(newTagInfo, Number(id)); // newTagInfo contains the updated info, id specifies the tag

//       if (updateResults.affectedRows) {
//         res.status(200).json({ message: `Tag ${id} was updated to show ${tagname}` });
//       } else {
//         res.status(400).json({ message: `Oh my stars, we could not update the tag with ID:${id}` });
//       }
//     } else {
//       // if the blog does not exist, send a 404 error
//       res.status(404).json({ message: "Whoopsie-daisy, that tag does not exist" });
//     }
//   } catch (error) {
//     if (error.sqlMessage) {
//       console.log(`\n${error.sqlMessage}\n`); // log the sql error if there is one
//     }

//     console.log(`Update Tag Error...\n`);
//     console.error(error); // if an error happens, log the error

//     res.status(500).json({ message: `Updating Tags is hard!  Something went wrong when we tried to update the tag with ID:${id}` }); // send status of 500
//   }
// });

// Delete a Tag
// tagRouter.delete("/:id", async (req, res) => {
//   const id = Number(req.params.id); // grab the id from req.params...

//   try {
//     // Validation
//     await Validation.isValidID(id);
//     const DeleteTagResponse = await db.Tags.deleteTag(id); // use the id to delete the author

//     if (DeleteTagResponse.affectedRows) {
//       // if it was deleted
//       res.status(200).json({ message: `You know you're not supposed to remove tags right?  Ugh ok fine, Tag ${id} was removed` });
//     } else {
//       // if it was never there to begin with
//       res.status(404).json({ message: `We don't carry that line of tags in this store` });
//     }
//   } catch (error) {
//     if (error.sqlMessage) {
//       console.log(`\n${error.sqlMessage}\n`); // log the sql error if there is one
//     }

//     console.log(`Delete Tag Error...\n`);
//     console.error(error); // if an error happens, log the error

//     res.status(500).json({ message: `We tried, we failed, Tag ${id} is too powerful` }); // send status of 500
//   }
// });

export default tagRouter;
