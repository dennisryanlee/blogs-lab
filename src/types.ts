export interface AppProps {}

export interface Blog {
  title: string;
  content: string;
  blogid: string;
  authorname: string;
  email: string;
  authorid: string;
  tagname: string;
}

export interface Author {
  id?: string;
  email?: string;
  password?: string;
  authorname?: string;
  authorbio?: string;
}

export interface Tag {
  tagname: string;
  id: number;
}

export interface newBlogInfo {
  title: string;
  content: string;
  authorid: number;
}

export interface newAuthorInfo {
  authorname: string;
  email: string;
}

export interface updateAuthorInfo {
  authorbio: string;
}

export interface newTagInfo {
  tagname: string;
}

export interface newBlogTagInfo {
  blogid: number;
  tagid: number;
}

export interface MySQLResponse {
  affectedRows?: number;
  insertID?: number;
}
