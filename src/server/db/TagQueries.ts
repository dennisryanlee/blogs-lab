import { Query } from ".";
import * as Type from "../../types";
// mysql knows to evaluate each query parameter separately to prevent bad things from happening

const createNewTag = ({ tagname }: Type.newTagInfo) =>
  Query(`INSERT INTO Tags (tagname) VALUES ($1) RETURNING id`, [tagname]);

const createNewBlogTag = ({ blogid, tagid }: Type.newBlogTagInfo) =>
  Query(`INSERT INTO Blogtags (blogid, tagid) VALUES ($1, $2)`, [blogid, tagid]);

const readAllTags = () => Query<Type.Tag[]>(`SELECT * FROM Tags`, []);

const readOneTag = (id: number) => Query<Type.Tag[]>(`SELECT * FROM Tags WHERE id = $1`, [id]);

const updateTag = ({ tagname }: Type.newTagInfo, id: number) =>
  Query(`UPDATE Tags SET tagname = $1 WHERE id = $2`, [tagname, id]);

const deleteTag = (id: number) => Query(`DELETE FROM Tags WHERE id = $1`, [id]);

export default {
  // export functions so that we may call them from another file
  createNewTag,
  createNewBlogTag,
  readAllTags,
  readOneTag,
  updateTag,
  deleteTag,
};
