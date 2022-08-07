/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import styles from "./PostListElement.module.scss";
import { PostListElementProps } from "./PostListElement.types";
import sanitizeHtml from 'sanitize-html';

export default function PostListElement({
  post,
  displayImages,
}: PostListElementProps) {
  const [author, setAuthor] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [excerpt, setExcerpt] = useState<string>('');

  useEffect(() => {
    parsePost();
  }, []);

  function parsePost() {
    const author = post.title.rendered.split(':', 1)[0];
    const title = post.title.rendered.split(':', 2)[1];    
    const excerpt = post.excerpt.rendered.split('<a class=\"more-link\"', 1)[0] + '...';
    setAuthor(sanitizeHtml(author));
    setTitle(sanitizeHtml(title));
    setExcerpt(sanitizeHtml(excerpt));
  }

  return (
    <div className={styles.postListElementContainer}>
      {displayImages ? <img src={post.jetpack_featured_media_url} alt={title} /> : null}
      <h3 className={styles.author}>{author}</h3>
      <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: title}}></h1>
      <p className={styles.excerpt} dangerouslySetInnerHTML={{ __html: excerpt}}></p>
    </div>
  );
}
