import { Query } from ".";
import * as Type from "../../types";
// mysql knows to evaluate each query parameter separately to prevent bad things from happening

//*************************  CREATE  *****************************/

// insert into chirps (id: number, userid: number, content: string, location: string) values (id, userid, content, location);
// const writeOne = (userid: number, content: string, location: string) => Query("INSERT INTO chirps (userid, content, location) VALUES (?, ?, ?)", [userid, content, location]); // id will be provided by the DB

//! double check about the auto-destructuring mysql is going to do with the newBlogInfo object
const createNewBlog = (newBlogInfo: Type.newBlogInfo) => Query(`INSERT INTO Blogs (?) VALUES (?)`, [newBlogInfo]);
const createNewAuthor = (newAuthorInfo: Type.newAuthorInfo) => Query(`INSERT INTO Authors (?) VALUES (?)`, [newAuthorInfo]);
const createNewTag = (newTagInfo: Type.newTagInfo) => Query(`INSERT INTO Authors (?) VALUES (?)`, [newTagInfo]);

//*************************  READ  *****************************/
// readAll-x will query the database and return an array of x

const readAllBlogs = () => Query<Type.Blog[]>("SELECT a.authorname, a.email, b.authorid, b.id, b.title, b.content FROM Blogs b INNER JOIN Authors a ON a.id = b.authorid;");
const readAllAuthors = () => Query<Type.Author[]>(`SELECT * FROM Authors`);
const readAllTags = () => Query<Type.Tag[]>(`SELECT * FROM Tags`);

// readOne-x will query the database and return an array containing a single x specified by its id

const readOneBlog = (id: number) =>
  Query<Type.Blog[]>("SELECT a.authorname, a.email, b.authorid, b.id, b.title, b.content FROM Blogs b INNER JOIN Authors a ON a.id = b.authorid WHERE b.id = ?", [id]);

const readOneAuthor = (id: number) => Query<Type.Author[]>(`SELECT * FROM Authors WHERE id=?`, [id]);
const readOneTag = (id: number) => Query<Type.Tag[]>(`SELECT * FROM Tags WHERE id=?`, [id]);

//*************************  UPDATE  *****************************/
// update-x will update the content of x matching the id provided
// new-x-Info is an object as defined in types.ts

//! if i make it possible to update the author on a particular blog, i first need to check if that author exists since that is a foreign key
//! if the new author does not exist it will send an error, which i can send to the front end

const updateBlog = (newBlogInfo: Type.newBlogInfo, id: number) => Query(`UPDATE Blogs SET ? WHERE id = ?`, [newBlogInfo, id]);
const updateAuthor = (newAuthorInfo: Type.newAuthorInfo, id: number) => Query(`UPDATE Authors SET ? WHERE id = ?`, [newAuthorInfo, id]);
const updateTag = (newTagInfo: Type.newTagInfo, id: number) => Query(`UPDATE Tags SET ? WHERE id = ?`, [newTagInfo, id]);

//*************************  DESTROY  *****************************/
// delete-x will delete the row from the x table where the id matches

const deleteBlog = (id: number) => Query(`DELETE FROM Blogs WHERE id = ?`, [id]);
const deleteAuthor = (id: number) => Query(`DELETE FROM Authors WHERE id = ?`, [id]);
const deleteTag = (id: number) => Query(`DELETE FROM Tags WHERE id = ?`, [id]);

//! if i want to be able to delete authors, i need to enable cascading deletions
//! or delete first from blogs where the authorid matches, then delete the author

export default {
  // export functions so that we may call them from another file
  createNewBlog,
  readAllBlogs,
  readOneBlog,
  updateBlog,
  deleteBlog,

  createNewAuthor,
  readAllAuthors,
  readOneAuthor,
  updateAuthor,
  deleteAuthor,

  createNewTag,
  readAllTags,
  readOneTag,
  updateTag,
  deleteTag,
};
