/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import useParsePost, { ParsedPosts } from "../../../hooks/useParsePost";
import { PostsContext } from "../../../pages/_app";
import { Post } from "../../../types/PostResponse";
import styles from "./FeaturedPosts.module.scss";

export default function FeaturedPosts() {
  const [pauseAutoHighlight, setPauseAutoHighlight] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<number>(0); 
  const recentPosts = useContext(PostsContext).slice(0, 3);
  const post1 = useParsePost(recentPosts[0]);
  const post2 = useParsePost(recentPosts[1]);
  const post3 = useParsePost(recentPosts[2]);
  const posts = [post1, post2, post3];

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
      if (posts.length > currentPost + 1) {
        setCurrentPost(currentPost + 1);
        return;
      }
      setCurrentPost(0);
    }, 5000);

    return timeout;
  };

  return (
    <div className={styles.featuredPostsContainer}>
      <img src={posts[currentPost].image} alt={posts[currentPost].title} />
      <div className={styles.textContainer}>
        {posts.map((post: ParsedPosts, index: number) => {
          return (
            <div
              key={index}
              className={
                currentPost === index
                  ? styles.highlightedText
                  : styles.regularText
              }
              onMouseOver={() => {
                setPauseAutoHighlight(true);
                setCurrentPost(index);
              }}
              onMouseLeave={() => setPauseAutoHighlight(false)}
            >
              <h3 className={styles.author}>{post.author}</h3>
              <h1 className={styles.title} dangerouslySetInnerHTML={{__html: post.title}}></h1>
              <p lang="hu" className={styles.excerpt} dangerouslySetInnerHTML={{__html: post.excerpt.substring(0, 400) + '...'}}></p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
