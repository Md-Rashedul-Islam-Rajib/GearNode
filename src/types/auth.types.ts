export type User = {
  name: string;
  email: string;
  password: string;
  role: string;
  iat: number;
  exp: number;
};



export type TAuthState = {
  user: null | User;
  token: null | string;
};