/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import useParsePost, { ParsedPosts } from "../../../hooks/useParsePost";
import { PostsContext } from "../../../pages/_app";
import { Post } from "../../../types/PostResponse";
import styles from "./FeaturedPosts.module.scss";
import parse from "html-react-parser";
import LoadingBackdrop from "../../LoadingBackdrop";
import Link from "next/link";

export default function FeaturedPosts() {
  const [pauseAutoHighlight, setPauseAutoHighlight] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const recentPosts: Array<Post> = useContext(PostsContext).slice(0, 3);
  const parsedPostData = [
    useParsePost(recentPosts[0]),
    useParsePost(recentPosts[1]),
    useParsePost(recentPosts[2]),
  ];

  useEffect(() => {
    displayNextPost();
  }, []);

  useEffect(() => {
    const timeout = displayNextPost();
    return () => clearTimeout(timeout);
  }, [currentPost, pauseAutoHighlight]);

  const displayNextPost = () => {
    if (pauseAutoHighlight) {
      return;
    }
    const timeout = setTimeout(() => {
      if (parsedPostData.length > currentPost + 1) {
        setCurrentPost(currentPost + 1);
        return;
      }
      setCurrentPost(0);
    }, 5000);

    return timeout;
  };

  if (!recentPosts.length) return;

  return (
    <>
      <div className={styles.featuredPostsContainer}>
        <Link href={`/posts/${recentPosts[currentPost].slug}`}>
          <img src={parsedPostData[currentPost].image} alt={parsedPostData[currentPost].title} />
        </Link>
        <div className={styles.textContainer}>
          {parsedPostData.map((post: ParsedPosts, index: number) => {
            return (
              <Link href={`/posts/${recentPosts[index].slug}`} key={index}>
                <div
                  className={currentPost === index ? styles.highlightedText : styles.regularText}
                  onMouseOver={() => {
                    setPauseAutoHighlight(true);
                    setCurrentPost(index);
                  }}
                  onMouseLeave={() => setPauseAutoHighlight(false)}>
                  <h3 className={styles.author}>{post.author}</h3>
                  <h1 className={styles.title}>{parse(post.title)}</h1>
                  <span lang="hu" className={styles.excerpt}>
                    {parse(post.excerpt.substring(0, 400).concat("..."))}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <LoadingBackdrop open={loading} />
    </>
  );
}
