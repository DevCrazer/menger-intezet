/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./PostListElement.module.scss";
import { PostListElementProps } from "./PostListElement.types";

export default function PostListElement({
  post,
  displayImages,
}: PostListElementProps) {
  return (
    <div className={styles.postListElementContainer}>
      {displayImages ? <img src={post.image} alt={post.title} /> : null}
      <h3 className={styles.author}>{post.author}</h3>
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.excerpt}>{post.excerpt}...</p>
    </div>
  );
}
