import { Query } from ".";
import * as Type from "../../types";
// mysql knows to evaluate each query parameter separately to prevent bad things from happening

//*************************  CREATE  *****************************/

// insert into chirps (id: number, userid: number, content: string, location: string) values (id, userid, content, location);
// const writeOne = (userid: number, content: string, location: string) => Query("INSERT INTO chirps (userid, content, location) VALUES (?, ?, ?)", [userid, content, location]); // id will be provided by the DB

//*************************  READ  *****************************/

// readAllBlogs will query the database and return an array of blogs of Type.Blog
// tested in workbench :D
const readAllBlogs = () => Query<Type.Blog[]>("SELECT a.authorname, a.email, b.authorid, b.id, b.title, b.content FROM Blogs b INNER JOIN Authors a ON a.id = b.authorid;");

// readOne will query the database and return an array containing a single blog specified by its id
const readOneBlog = (id: number) =>
  Query<Type.Blog[]>("SELECT a.authorname, a.email, b.authorid, b.id, b.title, b.content FROM Blogs b INNER JOIN Authors a ON a.id = b.authorid WHERE b.id = ?", [id]);

//*************************  UPDATE  *****************************/
// updateChirp will update the content of a chirp matching the id provided
// const updateChirp = (newChirpInfo: Type.INewChirpInfo, id: number) => Query(`UPDATE chirps SET ? WHERE id = ?`, [newChirpInfo, id]);

//*************************  DESTROY  *****************************/
//    DELETE FROM chirps WHERE id = 3
// a chirp may be located in more than one table, so delete from both starting with mentions since chirps is foreign keyed to mentions
// const deleteChirpFromMentions = (id: number) => Query(`DELETE FROM mentions WHERE chirpid = ?`, [id]);

// const deleteChirpFromChirps = (id: number) => {
// a chirp may be located in more than one table, so delete from both starting with mentions since chirps is foreign keyed to mentions
//   return Query(`DELETE FROM chirps WHERE id = ?`, [id]);};

export default {
  // export functions so that we may call them from another file
  readAllBlogs,
  readOneBlog,
};
