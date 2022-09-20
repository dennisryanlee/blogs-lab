import { Query } from ".";
import * as Type from "../../types";

const FindAuthor = (email: string) => Query<Type.Author[]>("SELECT * FROM Authors WHERE email = $1", [email]);

const registerNewAuthor = ({ authorname, email, password, authorbio }: Type.newAuthorInfo) =>
  Query(`INSERT INTO Authors SET authorname = $1, email = $2, password = $3, authorbio = $4`, [
    authorname,
    email,
    password,
    authorbio,
  ]);

export default {
  // export functions so that we may call them from another file
  FindAuthor,
  registerNewAuthor,
};
