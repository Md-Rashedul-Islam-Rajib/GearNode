import { BaseQueryApi } from "@reduxjs/toolkit/query";

import { ReactNode } from "react";

export type TSidebarItem = {
  title: string;
  label: ReactNode;
  icon?: string;
};

export type TRoutePaths = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TRoutePaths[];
};

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;
