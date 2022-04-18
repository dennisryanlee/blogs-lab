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

export interface NewBlogProps {
  title: string;
  content: string;
  handleNewBlog: Function;
  handleContentChange: Function;
  handleTitleChange: Function;
  handleClearTitleAndContent: Function;
}

export interface NavbarProps {
  navToAuthors: Function;
  navToBlogs: Function;
  handleLoggingOut: Function;
  navToNewBlog: Function;
}

export interface BlogsProps {
  setBlogsArray: Function;
  blogsArray: Blog[];
}

export interface BlogDetailsProps {
  blogsArray: Blog[];
}

export interface AuthorsProps {
  setAuthorsArray: Function;
  authorsArray: Author[];
}

export interface AuthorDetailsProps {
  authorsArray: Author[];
}
