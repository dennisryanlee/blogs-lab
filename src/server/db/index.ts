import * as mysql from "mysql"; // import mysql so that we can make requests from the database
import Blogs from "./BlogQueries";
import Authors from "./AuthorQueries";
import Tags from "./TagQueries";
import Login from "./LoginQueries";
import * as dotenv from "dotenv";
import { DB_CONFIG } from "../config"; // import the database config object containing the connection info

dotenv.config();

// console.log(process.env);

// creates a database connection with the following properties
// make sure to enable 'chirper'@'localhost' in mysql

export const Connection = mysql.createPool(DB_CONFIG);

export const Query = <T = mysql.OkPacket>(query: string, values?: unknown[]) => {
  // this helper function allows us to abstract this part out from every query we want to make later
  // this query function will create a promise for us, enabling our requests to be non-blocking
  // values is optional because when querying all of something, we don't need to specify a specific something

  return new Promise<T>((resolve, reject) => {
    const formattedSQL = mysql.format(query, values); // formats the mysql requests
    console.log({ formattedSQL }); // logs the mysql requests for debugging

    Connection.query(query, values, (err, results) => {
      if (err) reject(err);
      return resolve(results);
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
