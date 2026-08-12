"use client";

import { SessionProvider } from "next-auth/react";

/**
 * Auth session provider — wraps client trees that need session state.
 * Authentication logic is not implemented yet.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
