/** Protected route prefixes — used by root middleware.ts */
export const PROTECTED_PREFIXES = ["/dashboard", "/profile", "/admin"] as const;

export function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
