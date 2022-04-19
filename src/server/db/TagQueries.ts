import { Query } from ".";
import * as Type from "../../types";
// mysql knows to evaluate each query parameter separately to prevent bad things from happening

//*************************  CREATE  *****************************/

// insert into chirps (id: number, userid: number, content: string, location: string) values (id, userid, content, location);
// const writeOne = (userid: number, content: string, location: string) => Query("INSERT INTO chirps (userid, content, location) VALUES (?, ?, ?)", [userid, content, location]); // id will be provided by the DB

// using SET allows us to destructure an object whose keys match column names, so that we can add those values where they belong
const createNewTag = (newTagInfo: Type.newTagInfo) => Query(`INSERT INTO Tags SET ?`, [newTagInfo]);
const createNewBlogTag = (newBlogTagInfo: Type.newBlogTagInfo) => Query(`INSERT INTO Blogtags SET ?`, [newBlogTagInfo]);

// INSERT INTO Blogtags (blogid, tagid) VALUES (?,?) [blogid,tagid]

//*************************  READ  *****************************/
// readAll-x will query the database and return an array of x

const readAllTags = () => Query<Type.Tag[]>(`SELECT * FROM Tags`, []);

// readOne-x will query the database and return an array containing a single x specified by its id

const readOneTag = (id: number) => Query<Type.Tag[]>(`SELECT * FROM Tags WHERE id=?`, [id]);

//*************************  UPDATE  *****************************/
// update-x will update the content of x matching the id provided
// new-x-Info is an object as defined in types.ts

const updateTag = (newTagInfo: Type.newTagInfo, id: number) => Query(`UPDATE Tags SET ? WHERE id = ?`, [newTagInfo, id]);

//*************************  DESTROY  *****************************/
// delete-x will delete the row from the x table where the id matches

const deleteTag = (id: number) => Query(`DELETE FROM Tags WHERE id = ?`, [id]);

export default {
  // export functions so that we may call them from another file
  createNewTag,
  createNewBlogTag,
  readAllTags,
  readOneTag,
  updateTag,
  deleteTag,
};
