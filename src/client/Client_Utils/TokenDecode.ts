import { TOKEN_KEY } from "../Client_Utils/Fetcher";
import { decode, JwtPayload } from "jsonwebtoken";
import * as Types from "../../types";
//! import decodeMyToken from "../Client_Utils/TokenDecode";

// Returns a decoded JWT from local storage
export default function decodeMyToken() {
  const token: string | JwtPayload = localStorage.getItem(TOKEN_KEY); // grab the token from local storage
  const decodedToken = decode(token) as Types.TokenPayload; // decode the token

  return decodedToken;
}
