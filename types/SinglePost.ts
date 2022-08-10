import { FilteredPost, Post } from "./PostResponse";

export interface SinglePostProps {
    post: FilteredPost,
    metaTags: MetaTags
}

export interface MetaTags {
    title: string,
    image: string,
    url: string,
    excerpt: string,
    site_name: string
}

export interface SinglePostParams {
    params: {
        postSlug: string
    }
}