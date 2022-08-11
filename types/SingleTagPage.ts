import { FilteredPost } from "./PostResponse";

export interface TagProps {
    tag: string,
    posts: Array<FilteredPost>
}