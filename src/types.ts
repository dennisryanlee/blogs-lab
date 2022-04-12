export interface Blog {
  title: string;
  content: string;
  blogid: string;
  authorname: string;
  authoremail: string;
  authorid: string;
}

export interface Author {
  id: string;
  authorname: string;
  email: string;
}

export interface Tag {
  tagname: string;
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

export interface newTagInfo {
  tagname: string;
}

export interface AppProps {}

export interface LoginPageProps {
  username: string;
  password: string;
  loggedIn: boolean;
  handleUsernameChange: Function;
  handlePasswordChange: Function;
  handleloggedIn: Function;
}
