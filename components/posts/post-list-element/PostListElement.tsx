/* eslint-disable @next/next/no-img-element */
import React from "react";
import useParsePost from "../../../hooks/useParsePost";
import styles from "./PostListElement.module.scss";
import { PostListElementProps } from "./PostListElement.types";

export default function PostListElement({
  postID,
  displayImage,
}: PostListElementProps) {
  const { author, title, excerpt, image } = useParsePost(postID);
  return (
    <div className={styles.postListElementContainer}>
      {displayImage ? <img src={image} alt={title} /> : null}
      <h3 className={styles.author}>{author}</h3>
      <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: title}}></h1>
      <p className={styles.excerpt} dangerouslySetInnerHTML={{ __html: excerpt}}></p>
    </div>
  );
}
