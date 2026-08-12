"use client";

import { useEffect, useState } from "react";

/** Detect client mount — useful for theme-dependent UI. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
