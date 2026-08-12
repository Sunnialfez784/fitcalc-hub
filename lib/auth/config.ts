import type { NextAuthConfig } from "next-auth";

/** Shared Auth.js edge-safe config fragment (middleware). */
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    authorized() {
      // Placeholder — protect routes when auth logic is implemented
      return true;
    },
  },
} satisfies NextAuthConfig;
