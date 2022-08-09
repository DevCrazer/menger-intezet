/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import useParsePost from "../../hooks/useParsePost";
import styles from "../../styles/Post.module.scss";
import parse from "html-react-parser";
import LoadingBackdrop from "../../components/LoadingBackdrop";
import { GetStaticPropsContext } from "next";
import { Post } from "../../types/PostResponse";

export default function SinglePost() {
  const router = useRouter();
  const { postID } = router.query;
  const { author, title, content, image, loading } = useParsePost(Array.isArray(postID) ? postID![0] : postID!);
  const pageTitle = `${title} | ${author}`;
  
  useEffect(() => {
    //
  }, [postID]);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta property="og:title" content={title}/>
        <meta property="og:type" content="article" />
        <meta property="og:description" content={title}/>
        <meta property="og:image" content={image}/>
        <meta property="og:url" content={`https://menger.vercel.app/pages/${postID}`}/>
        <meta name="twitter:card" content={image}/>
      </Head>
      <Layout>
        <div className={styles.singlePostContainer}>
          <div className={styles.metaInfoContainer}>
            <div className={styles.author}>{author}</div>
            <div className={styles.title}>{title}</div>
          </div>
          <img className={styles.featuredImage} src={image} alt={title} />
          <div className={`${styles.content} singlePostContent`} lang="hu">
            {parse(content)}
          </div>
        </div>
      </Layout>
      <LoadingBackdrop open={loading} />
    </>
  );
}

// export async function getStaticProps(context: GetStaticPropsContext) {
//   let numberOfApiPages = 0;
//   let page = 0;
//   let posts: Array<Post> = [];
//   fetch(`https://public-api.wordpress.com/wp/v2/sites/mengerblog.com/posts?per_page=$100&page=${page + 1}`)
//     .then((response) => {
//       for (let header of response.headers.entries()) {
//         if (header[0] === "x-wp-totalpages") {
//           numberOfApiPages = parseInt(header[1]);
//         }
//     }
//   });

//   for (let i = 0; i > page; i++) {
//     fetchPostsByPage(i)
//       .then((data: Array<Post>) => posts = [...posts, ...data]);
//   }

//   return {
//     props: {
//       posts
//     },
//   }
// }

// async function fetchPostsByPage(page: number) {
//   let fetchedPosts: Array<Post> = [];
//   await fetch(`https://public-api.wordpress.com/wp/v2/sites/mengerblog.com/posts?per_page=$100&page=${page + 1}`)
//     .then((response) => response.json())
//     .then(data => fetchedPosts = data);

//   return fetchedPosts;
// }