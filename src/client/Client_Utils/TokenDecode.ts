import { TOKEN_KEY } from "./Fetch_Service";
import decode, { JwtPayload } from "jwt-decode";
import * as Types from "../../types";
//this import statement - import decodeMyToken from "../Client_Utils/TokenDecode";

// Returns a decoded JWT from local storage
export default function decodeMyToken() {
  let FakeTokenPayload = {
    username: "",
    userid: "",
    email: "",
    role: "",
  };

  const rawToken = localStorage.getItem(TOKEN_KEY); // grab the token from local storage
  if (rawToken) {
    const decodedToken = decode(rawToken) as Types.TokenPayload; // decode the token
    return decodedToken;
  } else {
    return FakeTokenPayload;
  }
}
