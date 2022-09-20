import { Query } from ".";
import * as Types from "../../types";

const createNewBlog = ({ title, content, authorid }: Types.newBlogInfo) =>
  Query(`INSERT INTO Blogs (title, content, authorid) VALUES ($1, $2, $3) RETURNING id`, [title, content, authorid]);

const readAllBlogs = () =>
  Query<Types.Blog[]>(
    `SELECT a.authorname, a.email, b.authorid, b.id AS blogid, b.title, b.content, t.tagname FROM Blogs b 
    INNER JOIN Authors a ON a.id = b.authorid 
    INNER JOIN Blogtags bt ON bt.blogid = b.id 
    INNER JOIN Tags t ON bt.tagid = t.id;`
  );

const readOneBlog = (id: number) =>
  Query<Types.Blog[]>(
    `
  SELECT a.authorname, a.email, b.authorid, b.id AS blogid, b.title, b.content, t.tagname FROM Blogs b 
  INNER JOIN Authors a ON a.id = b.authorid
  INNER JOIN Blogtags bt ON bt.blogid = b.id
  INNER JOIN Tags t ON bt.tagid = t.id
  WHERE b.id = $1;
  `,
    [id]
  );

const updateBlog = ({ title, content }: Types.updateBlogInfo, id: number, authorid: number) =>
  Query(`UPDATE Blogs SET title = $1, content = $2 WHERE id = $3 AND authorid = $4`, [title, content, id, authorid]);
const deleteBlog = (id: number, authorid: number) =>
  Query(`DELETE FROM Blogs WHERE id = $1 AND authorid = $2`, [id, authorid]);

const deleteBlogTag = (id: number) =>
  Query(
    `DELETE FROM BlogTags WHERE Blogid = $1;
`,
    [id]
  );

export default {
  // export functions so that we may call them from another file
  createNewBlog,
  readAllBlogs,
  readOneBlog,
  updateBlog,
  deleteBlog,
  deleteBlogTag,
};
