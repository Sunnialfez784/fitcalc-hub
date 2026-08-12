/** Caching helpers / tag constants placeholders for Next.js `unstable_cache` / `revalidateTag`. */
export { cacheTags } from "@/config/features";

/**
 * Example pattern (implement when data layer is ready):
 *
 * import { unstable_cache } from "next/cache";
 * export const getCachedArticles = unstable_cache(async () => {...}, ["articles"], {
 *   tags: [cacheTags.articles],
 *   revalidate: 3600,
 * });
 */
