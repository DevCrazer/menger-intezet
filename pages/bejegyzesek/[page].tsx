/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { Pagination } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/Posts.module.scss";
import { Post } from "../../types/PostResponse";
import LoadingBackdrop from "../../components/LoadingBackdrop";
import { NextSeo } from "next-seo";
import { getAllPosts } from "../../helpers/getPosts";
import * as _ from "lodash";
import { PostsProps } from "../../types/PostList";
import PostGrid from "../../components/posts/post-grid/PostGrid";

const POSTS_PER_PAGE = 9;

export default function Posts({ posts, pageCount, page }: PostsProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  function changePage(newPage: number) {
    setLoading(true);
    router.push(`/bejegyzesek/${newPage}`).then(() => {
      window.scrollTo(0, 0);
      setLoading(false);
    });
  }

  return (
    <>
      <NextSeo title={"Bejegyzések | Menger Intézet"} />
      <Layout>
        <div className={styles.postsContainer}>
          <PostGrid posts={posts} />
          <div className={styles.paginationContainer}>
            <Pagination
              defaultPage={page}
              defaultValue={page}
              onChange={(event, page) => changePage(page)}
              count={pageCount}
              shape="rounded"
            />
          </div>
        </div>
        <LoadingBackdrop open={loading} />
      </Layout>
    </>
  );
}

export async function getStaticProps({ params }: { params: { page: string } }) {
  const posts: Array<Post> = await getAllPosts().then((posts) => {
    return posts;
  });
  const filteredPosts = _.map(posts, (post) => {
    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      jetpack_featured_media_url: post.jetpack_featured_media_url,
    };
  });
  const postChunks = _.chunk(filteredPosts, POSTS_PER_PAGE);
  const props: PostsProps = {
    posts: postChunks[parseInt(params.page) - 1],
    pageCount: Math.ceil(posts.length / 9),
    page: parseInt(params.page),
  };

  return { props: props };
}

export async function getStaticPaths() {
  const posts: Array<Post> = await getAllPosts().then((posts) => {
    return posts;
  });
  const postChunks = _.chunk(posts, POSTS_PER_PAGE);
  const paths = _.map(postChunks, (chunk, index) => {
    return { params: { page: (index + 1).toString() } };
  });

  return {
    paths: paths,
    fallback: false,
  };
}
