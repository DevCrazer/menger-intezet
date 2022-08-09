/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import React from "react";
import Layout from "../../components/Layout";
import useParsePost from "../../hooks/useParsePost";
import styles from "../../styles/Post.module.scss";
import parse from "html-react-parser";
import LoadingBackdrop from "../../components/LoadingBackdrop";
import { Post } from "../../types/PostResponse";
import { getAllPosts, getPost } from "../../helpers/getPosts";
import * as _ from "lodash";

export default function SinglePost({ postID, post }: { postID: string, post: Post }) {
  const { author, title, content, image, loading } = useParsePost(postID, post);
  const pageTitle = `${title} | ${author}`;
  
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

export async function getStaticProps({params} : { params: { postID: string } }) {
  const post = await getPost(params.postID);
  return { props: { post } }
}

export async function getStaticPaths() {
  const posts: Array<Post> = await getAllPosts().then(posts =>{ return posts });
  const postIDs = _.map(posts, 'id');
  const paths = _.map(postIDs, (id) => {
    return { params: { postID: id.toString() } }
  })

  return {
    paths: paths,
    fallback: false
  }
}