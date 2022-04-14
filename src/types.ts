export interface Blog {
  title: string;
  content: string;
  id: string;
  authorname: string;
  email: string;
  authorid: string;
}

export interface Author {
  id: string;
  authorname: string;
  authorbio: string;
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
  handleLoggingIn: Function;
  handleLoggingOut?: Function;
}

export interface NewAuthorProps {
  username: string;
  email: string;
  authorbio: string;
  handleUsernameChange: Function;
  handleEmailChange: Function;
  handleAuthorBioChange: Function;
  handleNewAuthorLogin: Function;
}

export interface NavbarProps {
  navToAuthors: Function;
  navToBlogs: Function;
  handleLoggingOut: Function;
}

export interface BlogsProps {
  blogsArray: Blog[];
}

export interface AuthorsProps {
  authorsArray: Author[];
}
