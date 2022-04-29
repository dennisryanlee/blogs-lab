import { Query } from ".";
import * as Type from "../../types";
// mysql knows to evaluate each query parameter separately to prevent bad things from happening

//*************************  CREATE  *****************************/
// Creating an author is handled in LoginQueries

//*************************  READ  *****************************/
const readAllAuthors = () => Query<Type.Author[]>(`SELECT * FROM Authors`);
const readOneAuthor = (id: number) => Query<Type.Author[]>(`SELECT * FROM Authors WHERE id=?`, [id]);

//*************************  UPDATE  *****************************/
const updateAuthor = (newAuthorInfo: Type.newAuthorInfo, id: number) => Query(`UPDATE Authors SET ? WHERE id = ?`, [newAuthorInfo, id]);

//*************************  DESTROY  *****************************/
const deleteAuthor = (id: number) => Query(`DELETE FROM Authors WHERE id = ?`, [id]);

export default {
  // export functions so that we may call them from another file
  readAllAuthors,
  readOneAuthor,
  updateAuthor,
  deleteAuthor,
};
