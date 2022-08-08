/* eslint-disable @next/next/no-img-element */
import { Pagination } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import styles from "../styles/Posts.module.scss";
import { Post } from "../types/PostResponse";
import sanitize from "sanitize-html";
import parse from "html-react-parser";
import LoadingBackdrop from "../components/LoadingBackdrop";

const POSTS_PER_PAGE = 9;

export default function Posts() {
  const [page, setPage] = useState<number>(1);
  const [posts, setPosts] = useState<Array<Post>>();
  const [pageCount, setPageCount] = useState<number>(8);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    fetchPostsByOffset(0);
  }, []);

  useEffect(() => {
    fetchPostsByOffset((page - 1) * POSTS_PER_PAGE);
  }, [page]);

  async function fetchPostsByOffset(offset: number) {
    setLoading(true);
    fetch(
      `https://public-api.wordpress.com/wp/v2/sites/mengerblog.com/posts?per_page=${POSTS_PER_PAGE}&offset=${offset}`
    )
      .then((response) => {
        for (let header of response.headers.entries()) {
          if (header[0] === 'x-wp-totalpages') {
            setPageCount(parseInt(header[1]))
          }
        }
        response.json()
        .then((data) => {
          setPosts(data);
          setLoading(false);
      })
      
      });
  }

  function navigateToPost(postID: number) {
    router.push(`/posts/${postID}`);
  }

  return (
    <Layout>
      <div className={styles.postsContainer}>
        <div className={styles.postCardsContainer}>
          {posts?.map((post, index) => {
            return (
              <div
                className={styles.postCard}
                onClick={() => navigateToPost(post.id)}
                key={index}
              >
                <img
                  src={post.jetpack_featured_media_url}
                  alt={post.title.rendered}
                />
                <div className={styles.postName}>
                  {parse(sanitize(post.title.rendered))}
                </div>
                <div className={styles.excerptContainer}>
                  <div className={styles.postExcerpt} lang="hu">
                    {parse(sanitize(post.excerpt.rendered))}
                  </div>
                  <div className={styles.readMoreButton}>
                    Tovább »
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.paginationContainer}>
          <Pagination
            onChange={(event, page) => setPage(page)}
            count={pageCount}
            shape="rounded"
          />
        </div>
      </div>
      <LoadingBackdrop open={loading} />
    </Layout>
  );
}
