import { Post } from "./PostResponse";

export interface PostsProps {
  posts: Array<Post>;
  pageCount: number;
  page: number;
}
