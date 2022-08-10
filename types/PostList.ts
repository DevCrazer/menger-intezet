import { FilteredPost } from "./PostResponse";

export interface PostsProps {
  posts: Array<FilteredPost>;
  pageCount: number;
  page: number;
}
