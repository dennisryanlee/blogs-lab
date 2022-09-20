import { Query } from ".";
import * as Type from "../../types";

const FindAuthor = (email: string) => Query<Type.Author[]>("SELECT * FROM Authors WHERE email = $1", [email]);

const registerNewAuthor = ({ authorname, email, password, authorbio }: Type.newAuthorInfo) =>
  Query(
    `INSERT INTO Authors (authorname,
    email,
    password,
    authorbio) VALUES ($1, $2, $3, $4) RETURNING id`,
    [authorname, email, password, authorbio]
  );

export default {
  // export functions so that we may call them from another file
  FindAuthor,
  registerNewAuthor,
};
