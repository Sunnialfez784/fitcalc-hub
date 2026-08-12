import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
  }
}

export type ApiResponse<T> = {
  data: T;
  message?: string;
  success: boolean;
};

export type PaginatedResponse<T> = ApiResponse<T[]> & {
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};

export type NavItem = {
  href: string;
  label: string;
  icon?: string;
  disabled?: boolean;
};

export type BreadcrumbItem = {
  label: string;
  href?: string;
};
