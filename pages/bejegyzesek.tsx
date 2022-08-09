/* eslint-disable react-hooks/exhaustive-deps */
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
import { NextSeo } from "next-seo";
import { getAllPosts } from "../helpers/getPosts";
import * as _ from "lodash";

const POSTS_PER_PAGE = 9;

export default function Posts({ posts }: { posts: Array<Post> }) {
  const [page, setPage] = useState<number>(1);
  const [postsOfCurrentPage, setPostsOfCurrentPage] = useState<Array<Post>>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    findPostsOfCurrentPage(1);
  }, []);

  useEffect(() => {
    findPostsOfCurrentPage(page);
  }, [page]);

  function findPostsOfCurrentPage(page: number) {
    const postChunks = _.chunk(posts, POSTS_PER_PAGE);
    const currentPage = page - 1;
    setPostsOfCurrentPage(postChunks[currentPage]);
  }

  function navigateToPost(slug: string) {
    setLoading(true);
    router.push(`/posts/${slug}`).then(() => setLoading(false));
  }

  return (
    <>
      <NextSeo title={"Bejegyzések | Menger Intézet"} />
      <Layout>
        <div className={styles.postsContainer}>
          <div className={styles.postCardsContainer}>
            {postsOfCurrentPage?.map((post, index) => {
              return (
                <div className={styles.postCard} key={index}>
                  <img
                    src={post.jetpack_featured_media_url}
                    alt={post.title.rendered}
                    onClick={() => navigateToPost(post.slug)}
                  />
                  <div className={styles.postAuthor}>
                    {parse(sanitize(post.title.rendered.split(":", 1)[0]))}
                  </div>
                  <div
                    className={styles.postName}
                    onClick={() => navigateToPost(post.slug)}
                  >
                    {parse(sanitize(post.title.rendered.split(":", 2)[1]))}
                  </div>
                  <div className={styles.excerptContainer}>
                    <div className={styles.postExcerpt} lang="hu">
                      {parse(
                        sanitize(
                          post.excerpt.rendered.split(
                            '<a class="more-link"',
                            1
                          )[0] + "..."
                        )
                      )}
                    </div>
                    <div
                      className={styles.readMoreButton}
                      onClick={() => navigateToPost(post.slug)}
                    >
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
              count={Math.ceil(posts.length / 9)}
              shape="rounded"
            />
          </div>
        </div>
        <LoadingBackdrop open={loading} />
      </Layout>
    </>
  );
}

export async function getStaticProps({
  params,
}: {
  params: { postID: string };
}) {
  const posts: Array<Post> = await getAllPosts().then((posts) => {
    return posts;
  });
  return { props: { posts } };
}
