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
  navToDonate: Function;
  navToNewBlog: Function;
}

export interface BlogsProps {
  username: string;
  setBlogsArray: Function;
  blogsArray: Blog[];
}

export interface BlogDetailsProps {
  blogsArray: Blog[];
  isEditing: boolean;
  title: string;
  content: string;
  chefskiss: Function;
  stuckem: Function;
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
  chefskiss: Function;
  setAuthorBio: Function;
  handleAuthorBioChange: Function;
  handleEmailChange: Function;
  navToAuthors: Function;
  navToAuthorContact: Function;
  setAuthorToContact: Function;
  setIsEditing: Function;
}

export interface DonateProps {
  navToPaymentReceiptPage: Function;
}

export interface PaymentReceiptPage {}

export interface AuthorContactProps {
  authorToContact: string;
  navToAuthors: Function;
}
