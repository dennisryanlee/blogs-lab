import { TOKEN_KEY } from "./Fetch_Service";
import decode, { JwtPayload } from "jwt-decode";
import * as Types from "../../types";
//this import statement - import decodeMyToken from "../Client_Utils/TokenDecode";

// Returns a decoded JWT from local storage
export default function decodeMyToken() {
  const token: string | JwtPayload = localStorage.getItem(TOKEN_KEY); // grab the token from local storage
  const decodedToken = decode(token) as Types.TokenPayload; // decode the token

  return decodedToken;
}
