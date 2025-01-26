import { jwtDecode } from "jwt-decode";

export const tokenDecoder = (token: string) => {
  console.log(token);
  return jwtDecode(token);
};
