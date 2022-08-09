/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useState } from "react";
import useParsePost from "../../../hooks/useParsePost";
import styles from "./PostListElement.module.scss";
import { PostListElementProps } from "./PostListElement.types";
import parse from "html-react-parser";
import LoadingBackdrop from "../../LoadingBackdrop";

export default function PostListElement({
  postSlug,
  displayImage,
}: PostListElementProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { author, title, excerpt, image } = useParsePost(postSlug);
  const router = useRouter();

  function onClick() {
    setLoading(true);
    router.push(`/posts/${postSlug}`).then(() => setLoading(false));
  }

  return (
    <>
      <div className={styles.postListElementContainer}>
        {displayImage ? <img src={image} alt={title} /> : null}
        <h3 className={styles.author}>{author}</h3>
        <h1 className={styles.title} onClick={onClick}>
          {parse(title)}
        </h1>
        <span className={styles.excerpt}>{parse(excerpt)}</span>
        <div className={styles.readMoreContainer}>
          <div className={styles.readMore} onClick={onClick}>
            Tovább »
          </div>
        </div>
      </div>
      <LoadingBackdrop open={loading} />
    </>
  );
}
