/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import useParsePost from "../../../hooks/useParsePost";
import styles from "./PostListElement.module.scss";
import { PostListElementProps } from "./PostListElement.types";
import parse from "html-react-parser";
import LoadingBackdrop from "../../LoadingBackdrop";
import Link from "next/link";

export default function PostListElement({ post, displayImage }: PostListElementProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { author, title, excerpt, image } = useParsePost(post);

  return (
    <>
      <div className={styles.postListElementContainer}>
        {displayImage ? <img src={image} alt={title} /> : null}
        <h3 className={styles.author}>{author}</h3>
        <Link href={`/posts/${post.slug}`}>
          <h1 className={styles.title}>
            {parse(title)}
          </h1>
        </Link>
        <span className={styles.excerpt}>{parse(excerpt)}</span>
        <div className={styles.readMoreContainer}>
          <Link href={`/posts/${post.slug}`}>
            <div className={styles.readMore}>
              Tovább »
            </div>
          </Link>
        </div>
      </div>
      <LoadingBackdrop open={loading} />
    </>
  );
}
