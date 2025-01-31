import { ReactNode } from "react";

export type User = {
  name?: string;
  email: string;
  password?: string;
  role: "customer" | "admin";
  iat: number;
  exp: number;
};

export type PrivateRoute = {
  allowedRoles: User["role"][];
  children: ReactNode;
};

export type TRoute = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TRoute[];
};

export type TAuthState = {
  user: null | User;
  token: null | string;
};