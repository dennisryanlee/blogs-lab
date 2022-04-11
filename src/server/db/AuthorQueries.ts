import { Query } from ".";
import * as Type from "../../types";
// mysql knows to evaluate each query parameter separately to prevent bad things from happening

//*************************  CREATE  *****************************/

// insert into chirps (id: number, userid: number, content: string, location: string) values (id, userid, content, location);
// const writeOne = (userid: number, content: string, location: string) => Query("INSERT INTO chirps (userid, content, location) VALUES (?, ?, ?)", [userid, content, location]); // id will be provided by the DB

// using SET allows us to destructure an object whose keys match column names, so that we can add those values where they belong
const createNewAuthor = (newAuthorInfo: Type.newAuthorInfo) => Query(`INSERT INTO Authors SET ?`, [newAuthorInfo]);

//*************************  READ  *****************************/
// readAll-x will query the database and return an array of x

const readAllAuthors = () => Query<Type.Author[]>(`SELECT * FROM Authors`);

// readOne-x will query the database and return an array containing a single x specified by its id

const readOneAuthor = (id: number) => Query<Type.Author[]>(`SELECT * FROM Authors WHERE id=?`, [id]);

//*************************  UPDATE  *****************************/
// update-x will update the content of x matching the id provided
// new-x-Info is an object as defined in types.ts

//! if i make it possible to update the author on a particular blog, i first need to check if that author exists since that is a foreign key
//! if the new author does not exist it will send an error, which i can send to the front end

const updateAuthor = (newAuthorInfo: Type.newAuthorInfo, id: number) => Query(`UPDATE Authors SET ? WHERE id = ?`, [newAuthorInfo, id]);

//*************************  DESTROY  *****************************/
// delete-x will delete the row from the x table where the id matches

const deleteAuthor = (id: number) => Query(`DELETE FROM Authors WHERE id = ?`, [id]);

//! if i want to be able to delete authors, i need to enable cascading deletions
//! or delete first from blogs where the authorid matches, then delete the author

export default {
  // export functions so that we may call them from another file
  createNewAuthor,
  readAllAuthors,
  readOneAuthor,
  updateAuthor,
  deleteAuthor,
};
