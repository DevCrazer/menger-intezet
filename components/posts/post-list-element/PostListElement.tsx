/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React from "react";
import useParsePost from "../../../hooks/useParsePost";
import styles from "./PostListElement.module.scss";
import { PostListElementProps } from "./PostListElement.types";
import parse from "html-react-parser";

export default function PostListElement({ postID, displayImage }: PostListElementProps) {
  const { author, title, excerpt, image } = useParsePost(postID);
  const router = useRouter();

  function onClick() {
    router.push(`/posts/${postID}`);
  }

  return (
    <div className={styles.postListElementContainer}>
      {displayImage ? <img src={image} alt={title} /> : null}
      <h3 className={styles.author}>{author}</h3>
      <h1 className={styles.title} onClick={onClick}>
        {parse(title)}
      </h1>
      <p className={styles.excerpt}>{parse(excerpt)}</p>
      <div className={styles.readMoreContainer}>
        <div className={styles.readMore} onClick={onClick}>
          Tovább »
        </div>
      </div>
    </div>
  );
}
