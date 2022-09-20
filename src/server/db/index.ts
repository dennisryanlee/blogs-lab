import Blogs from "./BlogQueries";
import Authors from "./AuthorQueries";
import Tags from "./TagQueries";
import Login from "./LoginQueries";
import { DB_CONFIG } from "../config"; // import the database config object containing the connection info
import * as postgres from "pg";

export const Connection_postgres = new postgres.Pool(DB_CONFIG);

export const Query = <T = any>(query: string, values: unknown[] = []) => {
  console.log({ Connection_postgres });

  return new Promise<T>((resolve, reject) => {
    Connection_postgres.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        console.log({ results });
        resolve(results);
      }
    });
  });
};

export default {
  // this is where the tables from the database will be exported
  Blogs, // Blogs contains the query functions defined in BlogQueries.ts
  Authors, // Authors contains the query functions defined in AuthorQueries.ts
  Tags, // Tags contains the query functions defined in TagQueries.ts
  Login,
};
