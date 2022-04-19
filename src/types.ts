export interface AppProps {}

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

export interface newTagInfo {
  tagname: string;
  id: number;
}

export interface newBlogTagInfo {
  blogid: number;
  tagid: number;
}

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
  tagsArray: Tag[];
  selectedTagId: Number;
  setSelectedTagId: Function;
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
  isEditing: boolean;
  title: string;
  content: string;
  navToBlogs: Function;
  setTitle: Function;
  setContent: Function;
  setIsEditing: Function;
  handleContentChange: Function;
  handleTitleChange: Function;
  handleClearTitleAndContent: Function;
}

export interface AuthorsProps {
  setAuthorsArray: Function;
  authorsArray: Author[];
}

export interface AuthorDetailsProps {
  authorsArray: Author[];
  email: string;
  authorbio: string;
  isEditing: boolean;
  setEmail: Function;
  setAuthorBio: Function;
  handleAuthorBioChange: Function;
  handleEmailChange: Function;
  navToAuthors: Function;
  setIsEditing: Function;
}
