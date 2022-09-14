import { PaymentMethod } from "@stripe/stripe-js";
import * as Express from "express";
import { JwtPayload } from "jwt-decode";

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

export interface TokenPayload {
  username: string;
  userid: number;
  email: string;
  role: string;
}

export interface ReqUser extends Express.Request {
  user?: TokenPayload;
}

// we type FetchData as an object, with many keys of type string, whose values can be string, number, or boolean
// PaymentMethod type added to enable Fetcher to work on Donate Component
export interface FetchData {
  [key: string]: string | number | boolean | PaymentMethod;
}

export interface fetchOptions {
  headers: {
    "Content-Type"?: string;
    Authorization?: string;
  };
  body?: string;
}
