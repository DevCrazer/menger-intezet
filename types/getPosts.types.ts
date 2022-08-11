import { Post } from "./PostResponse";
import { Tag } from "./TagsResponse";

export enum QueryTypes {
  Posts = "posts",
  Tags = "tags",
}

export enum QueryArguments {
  Page = "page",
  PerPage = "per_page",
  Search = "search",
  Exclude = "exclude",
  Include = "include",
  Offset = "offset",
  Order = "order",
  OrderBy = "orderby",
  Slug = "slug",
  Tags = "tags",
  Categories = "categories"
}

export interface GetDataFromAllPagesReturnType {
  [QueryTypes.Posts]: Array<Post>;
  [QueryTypes.Tags]: Array<Tag>;
}
