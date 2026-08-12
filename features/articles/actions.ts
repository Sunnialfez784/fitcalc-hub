"use server";

import {
  incrementLikes as bumpLikes,
  incrementShares as bumpShares,
  incrementViews as bumpViews,
} from "./services/articles";

export async function incrementArticleLikes(slug: string) {
  return bumpLikes(slug);
}

export async function incrementArticleShares(slug: string) {
  return bumpShares(slug);
}

export async function incrementArticleViews(slug: string) {
  return bumpViews(slug);
}
