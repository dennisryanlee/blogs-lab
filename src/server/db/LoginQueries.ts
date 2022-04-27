import { MysqlError } from "mysql";
import { Query } from ".";
import * as Type from "../../types";

const FindAuthor = () => Query<Type.Author[]>("", []);
const Insert = () => Query<Type.MySQLResponse>("");

export default {
  // export functions so that we may call them from another file
  FindAuthor,
  Insert,
};
