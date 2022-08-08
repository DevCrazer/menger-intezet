/* eslint-disable @next/next/no-img-element */
import React from "react";
import useParsePost from "../../../hooks/useParsePost";
import styles from "./PostListElement.module.scss";
import { PostListElementProps } from "./PostListElement.types";

export default function PostListElement({
  post,
  displayImage,
}: PostListElementProps) {
  const { author, title, excerpt } = useParsePost(post);
  return (
    <div className={styles.postListElementContainer}>
      {displayImage ? <img src={post.jetpack_featured_media_url} alt={title} /> : null}
      <h3 className={styles.author}>{author}</h3>
      <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: title}}></h1>
      <p className={styles.excerpt} dangerouslySetInnerHTML={{ __html: excerpt}}></p>
    </div>
  );
}
