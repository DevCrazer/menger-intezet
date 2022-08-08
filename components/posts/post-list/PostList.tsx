import React, { useContext } from "react";
import { PostsContext } from "../../../pages/_app";
import PostListElement from "../post-list-element/PostListElement";
import { Post } from "../../../types/PostResponse";
import { PostListProps } from "./PostList.types";

export default function PostList({ displayImages }: PostListProps) {
  const posts = useContext(PostsContext);

  return (
    <>
      {posts.map((post: Post, index: number) => {
        return (
          <PostListElement
            post={post}
            displayImage={displayImages}
            key={index}
          />
        );
      })}
    </>
  );
}
