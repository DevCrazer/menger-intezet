/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import useParsePost from "../../hooks/useParsePost";
import styles from "../../styles/Post.module.scss";
import parse from "html-react-parser";
import LoadingBackdrop from "../../components/LoadingBackdrop";

export default function SinglePost() {
  const router = useRouter();
  const { postID } = router.query;
  const { author, title, content, image, loading } = useParsePost(
    Array.isArray(postID) ? postID![0] : postID!
  );
  const pageTitle = `${title} | ${author}`;
  
  useEffect(() => {
    //
  }, [postID]);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
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
