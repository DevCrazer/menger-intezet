import { FilteredPost } from "./PostResponse";

export interface CollectionsParams {
  collections: Array<Collection>;
}

export interface Collection {
  name: string;
  articles: Array<Article>;
}

export interface Article {
  title: string;
  data: FilteredPost;
}

export interface CollectionWithoutData {
  name: string;
  articles: Array<string>;
}
