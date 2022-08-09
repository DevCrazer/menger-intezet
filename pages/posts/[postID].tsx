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
import PWAHead from "../../components/PWAHead";

export default function SinglePost({ post, metaTags }: { post: Post, metaTags: any }) {
  const { author, title, content, image, loading } = useParsePost(post.id, post);
  const pageTitle = `${title} | ${author}`;
  
  return (
    <>
      <PWAHead title={metaTags.title} image={metaTags.image} url={metaTags.url} />
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
  const post: void | Post = await getPost(params.postID).then(post => { return post });
  const metaTags = {
    title: `${post?.title.rendered}`,
    image: post?.jetpack_featured_media_url,
    url: `https://menger.vercel.app/posts/${post?.id}`
  }
  return { props: { post, metaTags } }
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