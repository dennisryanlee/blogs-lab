import { Query } from ".";
import * as Type from "../../types";

//@ Creating an author is handled in LoginQueries

const readAllAuthors = () => Query<Type.Author[]>(`SELECT id, authorname, authorbio, email FROM Authors`);

const readOneAuthor = (id: number) =>
  Query<Type.Author[]>(`SELECT id, authorname, authorbio, email FROM Authors WHERE id = $1`, [id]);

const updateAuthor = ({ authorbio }: Type.updateAuthorInfo, id: number) =>
  Query(`UPDATE Authors SET authorbio = $1 WHERE id = $2`, [authorbio, id]);

const deleteAuthor = (id: number) => Query(`DELETE FROM Authors WHERE id = $1`, [id]);

export default {
  // export functions so that we may call them from another file
  readAllAuthors,
  readOneAuthor,
  updateAuthor,
  deleteAuthor,
};
